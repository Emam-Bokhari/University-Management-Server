import { model, Schema } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TStatusChange, TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: TStatusChange,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// document middleware
userSchema.pre('save', async function (next) {
  const user = this as typeof this & { password: string }; // Explicitly assert the type
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id: id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedTimeStamp: Date | null | undefined,
  jwtIssuedTimeStamp: number,
) {
  if (!passwordChangedTimeStamp) {
    return false;
  }
  const passwordChangedTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimeStamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
