import config from "../config"
import { USER_ROLE } from "../modules/user/user.constant"
import { User } from "../modules/user/user.model"

const superUser = {
    id: '0001',
    email: 'studentemam@gmail.com',
    password: config.super_admin_password,
    role: USER_ROLE.superAdmin,
    status: 'in-progress',
    isDeleted: false,
}

const seedSuperAdmin = async () => {
    const isSupderAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });

    if (!isSupderAdminExists) {
        await User.create(superUser)
    }
}

export default seedSuperAdmin;