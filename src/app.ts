import express, { Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app = express();

// parser
app.use(express.json());
app.use(cors());

// const test = async (req, res) => {
//   Promise.reject()
// }

// app.get("/", test)

// application routes
app.use('/api/v1/', router);

app.get('/health', (req: Request, res: Response) => {
  res.send('Server is running...');
});

// global error handling
app.use(globalErrorHandler);

// not found route error handling
app.use(notFound);

export default app;
