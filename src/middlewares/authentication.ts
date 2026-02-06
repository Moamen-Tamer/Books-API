import type { Request, Response, NextFunction } from 'express';
import type { CustomError } from '../types.js';
import jwt from 'jsonwebtoken';
import { jwtAccessKey } from '../controllers/authControllers.js';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
        const error = new Error(`access denied, plase log in first.`) as CustomError;
        error.status = 401;
        return next(error);
    }

    jwt.verify(token, jwtAccessKey, (err: any, user: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                const error = new Error(`token expired, please log in again`) as CustomError;
                error.status = 401;
                return next(error);
            }

            const error = new Error(`invalid token`) as CustomError;
            error.status = 403;
            return next(error);
        }

        req.user = user;
        next();
    });
}