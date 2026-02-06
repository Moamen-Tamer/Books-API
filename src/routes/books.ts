import express from 'express';
import {
    getBooks,
    getBook,
    createBook,
    updateBook,
    patchBook,
    deleteBook
} from '../controllers/booksController.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { requireAdmin } from '../middlewares/authorization.js';

const books = express.Router();

books.use(authenticateToken);

// routes accessible to any logged-in user
books.get('/', getBooks);
books.get('/:id', getBook);

// routes only for admins
books.post('/', requireAdmin, createBook);
books.put('/:id', requireAdmin, updateBook);
books.patch('/:id', requireAdmin, patchBook);
books.delete('/:id', requireAdmin, deleteBook);

export default books;