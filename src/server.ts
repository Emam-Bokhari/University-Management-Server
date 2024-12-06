import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Server is running on port: ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// asynchronous
process.on('unhandledRejection', () => {
  console.log(`👿 unhandledRejection is detected, shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// synchornous
process.on('uncaughtException', () => {
  console.log(`👿 uncaughtExecption is detected, shutting down...`);
  process.exit(1);
});
