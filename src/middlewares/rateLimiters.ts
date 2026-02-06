import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: "too many requests from this IP, please try again later"
});

export const authLimiter = rateLimit({
    windowMs: 1000 * 60 * 5,
    max: 15,
    message: "too many login attempts, please try again later"
});