export interface CustomError extends Error {
    status?: Number;
}

export type Book = {
    id: number,
    title: string,
    author: string,
    year: number
}

interface User {
    id: number,
    name: string,
    gender: string,
    email: string,
    password: string
}

export interface Client extends User {
    age: number
}

export interface Employee {
    id: number,
    name: string,
    gender: string,
    email: string,
    password: string
}