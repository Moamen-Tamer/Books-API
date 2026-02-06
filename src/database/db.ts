import type { Book, Client, Employee } from "../types.js";

export let books: Book[] = [
    {id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925},
    {id: 2, title: "Pride and Prejudice", author: "Jane Austen", year: 1813},
    {id: 3, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951},
    {id: 4, title: "1984", author: "George Orwell", year: 1949 },
    {id: 5, title: "Moby-Dick", author: "Herman Melville", year: 1851 },
    {id: 6, title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866 },
    {id: 7, title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953 },
    {id: 8, title: "Brave New World", author: "Aldous Huxley", year: 1932 },
    {id: 9, title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
    {id: 10, title: "A Brief History of Time", author: "Stephen Hawking", year: 1988 },
    {id: 11, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", year: 2011 }
];

export let clients: Client[] = [
    {
        id: 1,
        name: "Ahmed Hassan",
        gender: "male",
        age: 25,
        email: "ahmed.hassan@client.com",
        password: "$2b$10$7wqJv2D8H4c9JXUZ5oD6Be9cTt0Gk8sQfYpH9n9lG1XqB0G7Y1k0C"
    },
    {
        id: 2,
        name: "Sara Mohamed",
        gender: "female",
        age: 22,
        email: "sara.mohamed@client.com",
        password: "$2b$10$T7bJf0RzS8d3KXUQ5nH2Ae6vM7yLk4pPqYbO8n7hF3VxR1D9Z0kW"
    },
    {
        id: 3,
        name: "Omar Ali",
        gender: "male",
        age: 30,
        email: "omar.ali@client.com",
        password: "$2b$10$K6nP1WjT9s5VfHXY8mL3Be4rZt2Qh9xGjRkD8pVwL1YzN0B3O7qE"
    },
    {
        id: 4,
        name: "Mona Adel",
        gender: "female",
        age: 27,
        email: "mona.adel@client.com",
        password: "$2b$10$F8vH2TqP7s4XcGUY9nJ6Ae5kVt1Qd7xHjRkB9oXwP2ZyQ0C1L6mK"
    },
    {
        id: 5,
        name: "Youssef Ibrahim",
        gender: "male",
        age: 35,
        email: "youssef.ibrahim@client.com",
        password: "$2b$10$D5kQ1WzT8s7VfHXY4mL9Be2rZt6Qh9xGjRkM8pVwL1YzN0B3O9qE"
    },
    {
        id: 6,
        name: "Nour El-Din",
        gender: "male",
        age: 21,
        email: "nour.eldin@client.com",
        password: "$2b$10$L7mJ2TqP6s3XcGUY8nJ4Ae9kVt2Qd7xHjRkB7oXwP2ZyQ0C1L8mK"
    },
    {
        id: 7,
        name: "Laila Fathy",
        gender: "female",
        age: 29,
        email: "laila.fathy@client.com",
        password: "$2b$10$A9vH3TqP7s6XcGUY1nJ8Ae5kVt4Qd7xHjRkC6oXwP2ZyQ0C1L2mK"
    },
    {
        id: 8,
        name: "Hany Samir",
        gender: "male",
        age: 40,
        email: "hany.samir@client.com",
        password: "$2b$10$G8kQ1WjT9s5VfHXY3mL6Be4rZt7Qh9xGjRkM5pVwL1YzN0B3O4qE"
    },
    {
        id: 9,
        name: "Dina Saeed",
        gender: "female",
        age: 24,
        email: "dina.saeed@client.com",
        password: "$2b$10$M6nP2TqP8s3XcGUY5nJ7Ae2kVt1Qd7xHjRkD4oXwP2ZyQ0C1L5mK"
    },
    {
        id: 10,
        name: "Karim Mostafa",
        gender: "male",
        age: 33,
        email: "karim.mostafa@client.com",
        password: "$2b$10$E7vH1TqP6s4XcGUY9nJ3Ae8kVt2Qd7xHjRkB3oXwP2ZyQ0C1L9mK"
    }
];

export let employees: Employee[] = [
    {
        id: 1,
        name: "Mohamed Adel",
        gender: "male",
        email: "mohamed.adel@company.com",
        password: "$2b$10$Q5kQ1WzT8s7VfHXY4mL2Be6rZt5Qh9xGjRkM2pVwL1YzN0B3O1qE"
    },
    {
        id: 2,
        name: "Aya Mahmoud",
        gender: "female",
        email: "aya.mahmoud@company.com",
        password: "$2b$10$J7mJ2TqP5s3XcGUY8nJ1Ae9kVt6Qd7xHjRkB1oXwP2ZyQ0C1L4mK"
    },
    {
        id: 3,
        name: "Khaled Samy",
        gender: "male",
        email: "khaled.samy@company.com",
        password: "$2b$10$B9vH3TqP6s6XcGUY2nJ5Ae4kVt3Qd7xHjRkC0oXwP2ZyQ0C1L7mK"
    },
    {
        id: 4,
        name: "Nada Youssef",
        gender: "female",
        email: "nada.youssef@company.com",
        password: "$2b$10$H8kQ1WjT9s5VfHXY1mL3Be2rZt8Qh9xGjRkM9pVwL1YzN0B3O6qE"
    },
    {
        id: 5,
        name: "Hossam Tarek",
        gender: "male",
        email: "hossam.tarek@company.com",
        password: "$2b$10$w9Zf7b/AN5BAhbPBmyYx5.kM7uiPMPT53nrB8GoaQw6gHWzrgxU1i"
    },
    {
        id: 6,
        name: "Reem Ahmed",
        gender: "female",
        email: "reem.ahmed@company.com",
        password: "$2b$10$F7vH1TqP6s4XcGUY2nJ9Ae1kVt5Qd7xHjRkB7oXwP2ZyQ0C1L0mK"
    },
    {
        id: 7,
        name: "Mostafa Nabil",
        gender: "male",
        email: "mostafa.nabil@company.com",
        password: "$2b$10$P5kQ1WzT8s7VfHXY9mL6Be3rZt4Qh9xGjRkM6pVwL1YzN0B3O2qE"
    },
    {
        id: 8,
        name: "Salma Farouk",
        gender: "female",
        email: "salma.farouk@company.com",
        password: "$2b$10$K7mJ2TqP5s3XcGUY0nJ8Ae6kVt9Qd7xHjRkB5oXwP2ZyQ0C1L1mK"
    },
    {
        id: 9,
        name: "Amr Hassan",
        gender: "male",
        email: "amr.hassan@company.com",
        password: "$2b$10$C9vH3TqP6s6XcGUY3nJ2Ae7kVt8Qd7xHjRkC4oXwP2ZyQ0C1L6mK"
    },
    {
        id: 10,
        name: "Yara Saeed",
        gender: "female",
        email: "yara.saeed@company.com",
        password: "$2b$10$L8kQ1WjT9s5VfHXY2mL4Be1rZt9Qh9xGjRkM3pVwL1YzN0B3O5qE"
    }
];

export const refreshTokens = new Set();