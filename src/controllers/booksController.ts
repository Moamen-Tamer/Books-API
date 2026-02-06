import type { Request, Response, NextFunction } from 'express';
import { books } from "../database/db.js";
import type{ CustomError, Book } from '../types.js';

// GET /api/books
export const getBooks = (req: Request, res: Response, next: NextFunction) => {
    const limitstr: string | undefined = req.query.limit as string | undefined;

    if (!limitstr) {
        return res.status(200).json(books);
    }

    const limit: number = parseInt(limitstr);

    if (limit > 0) {
        return res.status(200).json(books.slice(0, limit));
    }

    res.status(200).json(books);
};

// GET /api/books/:id
export const getBook = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id as string);
    const book = books.find((book) => book.id === id);

    if (!book) {
        const error = new Error(`A book with the id of ${id} is not found`) as CustomError;
        error.status = 404;
        return next(error);
    }

    res.status(200).json(book);
};

// POST /api/books
export const createBook = (req: Request, res: Response, next: NextFunction) => {
    const newBook: Book = {
        id: books.length > 0 ? books.at(-1)!.id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    }

    if (!newBook.title) {
        const error = new Error(`Please include a title`) as CustomError;
        error.status = 400;
        return next(error);
    }

    if (!newBook.author) {
        const error = new Error(`Please include a author`) as CustomError;
        error.status = 400;
        return next(error);
    }

    if (!newBook.year) {
        const error = new Error(`Please include a year`) as CustomError;
        error.status = 400;
        return next(error);
    }

    books.push(newBook);
    res.status(201).json(newBook);
};

// PUT /api/books/:id
export const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id as string);
    const index = books.findIndex ((book) => book.id === id);

    if (index === -1) {
        const error = new Error(`A book with the id of ${id} is not found`) as CustomError;
        error.status = 404;
        return next(error);
    }

    if (!req.body.title || !req.body.author || !req.body.year) {
        const error = new Error(`Please include a title, author and a year`) as CustomError;
        error.status = 400;
        return next(error);
    }

    const updatedBook: Book = {
        id,
        ...books[index],
        ...req.body
    }
    
    books[index] = updatedBook;
    res.status(200).json(updatedBook);
};

// PATCH /api/books/:id
export const patchBook = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id as string);
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
        const error = new Error(`A book with the id of ${id} is not found`) as CustomError;
        error.status = 404;
        return next(error);
    }

    if (!req.body.title && !req.body.author && !req.body.year) {
        const error = new Error(`Please include at least one field to update`) as CustomError;
        error.status = 400;
        return next(error);
    }

    const updatedBook: Book = {
        id,
        ...books[index],
        ...req.body
    }

    books[index] = updatedBook;
    res.status(200).json(updatedBook);
};

// DELETE /api/books/:id
export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id as string);
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
        const error = new Error(`A book with the id of ${id} is not found`) as CustomError;
        error.status = 404;
        return next(error);
    }

    books.splice(index, 1);
    res.status(200).json(books);
};