import type { Request, Response, NextFunction } from 'express';
import type { CustomError } from '../types.js';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        const error = new Error(`employees only required`) as CustomError;
        error.status = 403;
        return next(error);
    }

    if (!req.user.email.match(/@company.com$/i)) {
        const error = new Error(`employees only required`) as CustomError;
        error.status = 403;
        return next(error);
    }

    next();
}