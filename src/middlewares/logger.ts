import type { Request, Response, NextFunction } from 'express';
import colors from 'colors';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const methodColors: Record<string, string> = {
        GET: "green",
        POST: "blue",
        PUT: "yellow",
        PATCH: "magenta",
        DELETE: "red"
    }

    const color: any = methodColors[req.method] || "white";

    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[
            color
        ]
    )

    next();
}