/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = ((
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err,
  });
}) as unknown as express.ErrorRequestHandler;

export default globalErrorHandler;
