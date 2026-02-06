import type { Request, Response, NextFunction } from 'express';
import type { CustomError } from '../types.js';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found`) as CustomError;
    error.status = 404;
    return next(error);
}