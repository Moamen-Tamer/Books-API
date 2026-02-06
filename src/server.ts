import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import books from './routes/books.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/error.js';
import { notFound } from './middlewares/notFound.js';
import auth from './routes/auth.js';
import { limiter, authLimiter } from './middlewares/rateLimiters.js';

const app = express();
const port = process.env.PORT || 8000;

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// general middleware
app.use(helmet());
app.use(logger);

// rate limiters
app.use(limiter);
app.use('/api/auth', authLimiter);

// books middleware
app.use('/api/books', books);
app.use('/api/auth', auth);

// error handlers
app.use(notFound);
app.use(errorHandler);

// server
app.listen(port, () => {
    console.log(`server is currently running port ${port}`);
})