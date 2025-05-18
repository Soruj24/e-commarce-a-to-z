const express = require('express');
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import seedUserRouter from './routes/seedUserRouter';
import userRouter from './routes/userRouter';
import { errorResponse } from './controllers/responsControllers';
import { HttpError } from './types';

const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedUserRouter);
app.use('/api/users', userRouter);

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
