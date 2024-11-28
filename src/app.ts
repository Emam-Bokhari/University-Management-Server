import express, { Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use("/api/v1/users", UserRoutes)

app.get('/health', (req: Request, res: Response) => {
  res.send('Server is running...');
});

export default app;
