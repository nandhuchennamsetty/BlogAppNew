import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

// Use express's built-in body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router configuration
app.use('/', Router);

// Start the server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

// Database connection
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);