import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Client, CustomError, Employee } from '../types.js';
import { body, validationResult } from 'express-validator';
import { clients, employees, refreshTokens } from '../database/db.js';

export const jwtAccessKey = process.env.jwtAccessKey || "897379b2d614c1c885520553441ebcd0422f9d4b5ef8cb8a0620f372d8b12a7aaaad941a11d2c63c765336ae98bf4a11bb994b181ebb053e448d6a21ffa46af0";
export const jwtRefreshKey = process.env.jwtRefreshKey || "e1e40401b970e41ab8826a8d73e18087c542ef6ac18053ca3c3b5770ce6ac9f2a26ae98da0340279c282a180e13ee9b409750d58b9058eca1f8338df3165b6cb";

const accessTokenExpiry = '15m';
const refreshTokenExpiry = '1h';

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'strict' as const,
    maxAge: 1000 * 60 * 10
}

const refreshCookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'strict' as const,
    maxAge: 1000 * 60 * 60
}

const generateAccessToken = (user: Client | Employee) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email
    }

    return jwt.sign(payload, jwtAccessKey, { expiresIn: accessTokenExpiry });
}

const generateRefreshToken = (user: Client | Employee) => {
    const payload = {
        id: user.id,
        name: user.name
    }

    return jwt.sign(payload, jwtRefreshKey, { expiresIn: refreshTokenExpiry });
}

export const validateRegister = [
    body('name').trim()
                .escape()
                .isLength({ min: 3, max: 20 })
                .withMessage('username must be 3-20 characters')
                .matches(/^[a-zA-Z0-9_]+$/)
                .withMessage('username can only contain letters, numbers, and underscores'),

    body('gender').notEmpty()
                  .withMessage('gender is required'),

    body('age').isInt({ min: 13, max: 101 })
               .withMessage('age must be a number between 13 and 101'),

    body('email').isEmail()
                 .withMessage('invalid email address')
                 .normalizeEmail(),

    body('password').isLength({ min: 8 })
                    .withMessage('password must be at least 8 characters')
                    .matches(/\d/)
                    .withMessage('password must contain a number')
];

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        
    }

    const { name, gender, age, email, password } = req.body;

    if (!name || !gender || !age || !email || !password) {
        const error =  new Error(`missing required fields`) as CustomError;
        error.status = 400
        return next(error);
    }
    
    const isUserExist = clients.find((user) => user.email === email);

    if (isUserExist) {
        const error = new Error(`email already exists`) as CustomError;
        error.status = 409;
        return next(error);
    }

    const hasedPass = await bcrypt.hash(password, 10);
    const newClient: Client = {
        id: clients.length > 0 ? clients.at(-1)!.id + 1 : 1,
        name,
        gender,
        age,
        email,
        password: hasedPass
    }

    clients.push(newClient);

    const { password: _, ...clientWithoutPassword } = newClient;

    res.status(201).json({
        message: "user registered successfully",
        user: clientWithoutPassword
    });
}

export const validateLogin = [
    body('email').isEmail()
                 .normalizeEmail()
                 .withMessage('invalid email address'),

    body('password').isLength({ min: 8 })
                    .withMessage('password must be at least 8 characters')
                    .matches(/\d/)
                    .withMessage('password must contain a number')
]

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        
    }

    const { email, password } = req.body;
    
    if (email.match(/@company.com$/i)) {
        const employee = employees.find((employee) => employee.email === email);

        if (!employee) {
            const error = new Error(`An employee with this email "${email}" does not exist`) as CustomError;
            error.status = 404;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, employee.password);

        if (!isMatch) {
            const error = new Error('invalid credentials') as CustomError;
            error.status = 401;
            return next(error);
        }

        const accessToken = generateAccessToken(employee);
        const refreshToken = generateRefreshToken(employee);

        refreshTokens.add(refreshToken);

        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, refreshCookieOptions);

        res.json({
            message: "login successful",
            user: {
                id: employee.id,
                name: employee.name,
                email: employee.email
            }
        });
    } else {
        const client = clients.find((client) => client.email === email);

        if (!client) {
            const error = new Error(`A client with this email "${email}" does not exist`) as CustomError;
            error.status = 404;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, client.password);

        if (!isMatch) {
            const error = new Error('invalid credentials') as CustomError;
            error.status = 401;
            return next(error);
        }

        const accessToken = generateAccessToken(client);
        const refreshToken = generateRefreshToken(client);

        refreshTokens.add(refreshToken);

        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, refreshCookieOptions);

        res.json({
            message: "login successful",
            user: {
                id: client.id,
                name: client.name,
                email: client.email
            }
        });
    }
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        refreshTokens.delete(refreshToken);
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({ 
        msg: 'logged out successfully.'
    });
}

export const authStatus = (req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: "Authenticated",
        user: req.user
    })
}

export const refresh = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken || !refreshTokens.has(refreshToken)) {
        const error = new Error(`invalid refresh token`) as CustomError;
        error.status = 401;
        return next(error);
    }

    jwt.verify(refreshToken, jwtRefreshKey, (err: any, user: any) => {
        if (err) {
            const error = new Error(`invalid or expired refresh token`) as CustomError;
            error.status = 403;
            return next(error);
        }

        const accessToken = generateAccessToken(user);
        res.cookie('accessToken', accessToken, cookieOptions);

        res.json({ message: "token refreshed successfully" });
    })
}