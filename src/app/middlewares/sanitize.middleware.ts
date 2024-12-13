/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import sanitize from "sanitize-html";


export const sanitizeRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Before sanitization:", JSON.stringify(req.body, null, 2)); // Log input before sanitization

    // sanitize the body
    if (req.body && typeof req.body === "object") {
        req.body = sanitizeInput(req.body);
    }

    console.log("After sanitization:", JSON.stringify(req.body, null, 2)); // Log input after sanitization

    // sanitize the query parameters
    if (req.query && typeof req.query === "object") {
        req.query = sanitizeInput(req.query);
    }

    if (req.params && typeof req.params === "object") {
        req.params = sanitizeInput(req.params);
    }
    next();
}


const sanitizeInput = (input: any) => {
    if (input && typeof input === "object") {
        Object.keys(input).forEach((key) => {
            // sanitize string fields
            if (typeof input[key] === "string") {
                input[key] = sanitize(input[key], {
                    allowedTags: ["b", "i", "em", "strong", "a"],
                    allowedAttributes: {
                        "*": ["href"],
                    },
                })
            } else if (Array.isArray(input[key])) {
                // Recursively sanitize array items
                input[key] = input[key].map((item) => typeof item === "object" ? sanitizeInput(item) : sanitize(item))
            } else if (typeof input[key] === "object" && input[key] !== null) {
                // Recursively sanitize nested objects
                input[key] = sanitize(input[key])
            }
        })
    }
    return input;
}

