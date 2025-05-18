import { Response } from 'express';

interface ResponseOptions {
    statusCode?: number;
    message?: string;
    payload?: any; // Consider using a generic type for stronger typing
}

const errorResponse = (
    res: Response,
    { statusCode = 500, message = "Internal Error" }: ResponseOptions
) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
    });
};

const successResponse = (
    res: Response,
    { statusCode = 200, message = "Success", payload = {} }: ResponseOptions
) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        payload,
    });
};

export { errorResponse, successResponse };