import express, { Request, Response } from 'express';
const notFound = ((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'Route Not Found',
    error: `The request endpoint ${req.originalUrl} does not exists.`,
  });
}) as unknown as express.ErrorRequestHandler;

export default notFound;
