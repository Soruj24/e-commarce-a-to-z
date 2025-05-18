import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { IUser } from '../types';
import User from '../models/userModel';
import { successResponse } from './responsControllers';

interface GetUsersQuery {
    search?: string;
    page?: string;
    limit?: string;
}

interface Pagination {
    totalPage: number;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
}

const handelGetUsers = async (req: Request<{}, {}, {}, GetUsersQuery>, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");

        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
            ],
        };

        const option = { password: false };

        const users = await User.find(filter, option)
            .limit(limit)
            .skip((page - 1) * limit);

        const count = await User.find(filter).countDocuments();

        if (!users || users.length === 0) {
            throw createError(404, "No users found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Users were returned successfully",
            payload: {
                users,
                pagination: {
                    totalPage: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export { handelGetUsers };