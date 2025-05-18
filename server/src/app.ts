const express = require('express');
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import seedUserRouter from './routes/seedRouter';
import userRouter from './routes/userRouter';
import { errorResponse } from './controllers/responsControllers';
import { HttpError } from './types';
import categoriesRouter from './routes/CategoriesRouter';
import productRouter from './routes/productRouter';
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 50, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again after 1 minute',
});

app.use(limiter);
app.use(helmet());
app.use(morgan("dev"));


app.use('/api/seed', seedUserRouter);
app.use('/api/users', userRouter);
app.use('/api/Categories',categoriesRouter)
app.use('/api/product',productRouter)

// Route error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404, "route not found"));
});


// Server error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    return errorResponse(res, {
        statusCode: err.status || err.statusCode || 500,
        message: err.message
    });
});



export default app;
