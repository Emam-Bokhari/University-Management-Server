/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';

const globalErrorHandler = ((
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: '',
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });

    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources: errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
}) as unknown as express.ErrorRequestHandler;

export default globalErrorHandler;

/* 
error pattern:

success:false,
message:"",
errorSource:[
  path:"",
  message:""
],
stack:""

*/
