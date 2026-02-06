import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (!err.status) {
        return res.status(500).json({ msg: err.message });
    }

    res.status(err.status).json({ msg: err.message });
}