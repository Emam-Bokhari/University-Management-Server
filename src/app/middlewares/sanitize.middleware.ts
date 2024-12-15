/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import sanitize from 'sanitize-html';
import config from '../config';

// Middleware to sanitize request
export const sanitizeRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log('Before sanitization:', JSON.stringify(req.body, null, 2)); // Log input before sanitization

  try {
    // sanitize the body
    if (req.body && typeof req.body === 'object') {
      req.body = sanitizeInput(req.body);
    }

    console.log('After sanitization:', JSON.stringify(req.body, null, 2)); // Log input after sanitization

    // sanitize the query parameters
    if (req.query && typeof req.query === 'object') {
      req.query = sanitizeInput(req.query);
    }

    if (req.params && typeof req.params === 'object') {
      req.params = sanitizeInput(req.params);
    }

    next(); // Call next to proceed to the next middleware or route handler
  } catch (err: any) {
    console.log(err); // Log the error
    res.status(400).json({
      success: false,
      message: 'Sanitization failed. Invalid input',
      errorSources: [
        {
          path: '',
          message: err.message,
        },
      ],
      stack: config.node_env === 'development' ? err.stack : null,
    });
  }
};

// Helper function to sanitize input recursively
const sanitizeInput = (input: Record<string, any>): any => {
  if (input && typeof input === 'object') {
    Object.keys(input).forEach((key) => {
      // sanitize string fields
      if (typeof input[key] === 'string') {
        input[key] = sanitize(input[key], {
          allowedTags: ['b', 'i', 'em', 'strong', 'a'],
          allowedAttributes: {
            '*': ['href'],
          },
        });
      } else if (Array.isArray(input[key])) {
        // Recursively sanitize array items
        input[key] = input[key].map((item) =>
          typeof item === 'object' ? sanitizeInput(item) : sanitize(item),
        );
      } else if (typeof input[key] === 'object' && input[key] !== null) {
        // Recursively sanitize nested objects
        input[key] = sanitize(input[key]);
      }
    });
  }
  return input;
};
