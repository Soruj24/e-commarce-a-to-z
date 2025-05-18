import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { CreateUserBody, GetUsersQuery, IUser, PasswordChangeBody, UpdateUserBody, UserParams } from '../types';
import User from '../models/userModel';
import { successResponse } from './responsControllers';
import bcrypt from 'bcryptjs';
import { createUser, deleteUser, findUser, updateUser } from '../services/userServices';


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
                totalUsers: count,
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

const handelGetUser = async (req: Request<UserParams>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await findUser(id);

        return successResponse(res, {
            statusCode: 200,
            message: "User returned successfully",
            payload: { user },
        });
    } catch (error) {
        next(error);
    }
};

const handelCreateUser = async (req: Request<{}, {}, CreateUserBody>, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = await createUser(username, email, password);

        return successResponse(res, {
            statusCode: 201, // 201 for resource creation
            message: "User created successfully",
            payload: { user },
        });
    } catch (error) {
        next(error);
    }
};

const handelDeleteUser = async (req: Request<UserParams>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await findUser(id); 
        const deletedUser = await deleteUser(id);

        return successResponse(res, {
            statusCode: 200,
            message: "User deleted successfully",
            payload: { user: deletedUser },
        });
    } catch (error) {
        next(error);
    }
};

const handelUpdateUser = async (req: Request<UserParams, {}, UpdateUserBody>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await findUser(id); // Verify user exists

        const updateOptions = {
            new: true,
            runValidators: true,
            context: 'query'
        };

        const updates: Partial<IUser> = {};

        for (const key in req.body) {
            if (key === "firstName") {
                updates.firstName = req.body.firstName;
            } else if (key === "lastName") {
                updates.lastName = req.body.lastName;
            } else if (key === "email") {
                throw createError(400, "You can't update email");
            }
        }

        const updatedUser = await updateUser(id, updates, updateOptions);

        return successResponse(res, {
            statusCode: 200,
            message: "User updated successfully",
            payload: { user: updatedUser },
        });
    } catch (error) {
        next(error);
    }
};

const handlePasswordChange = async (
    req: Request<UserParams, {}, PasswordChangeBody>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { id } = req.params;

        if (!oldPassword || !newPassword) {
            throw createError(400, "Old password and new password are required");
        }

        const user = await findUser(id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            throw createError(401, "Old password is incorrect");
        }

        // Hash new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

        return successResponse(res, {
            statusCode: 200,
            message: "Password changed successfully",
        });
    } catch (error) {
        next(error);
    }
};

export { handelGetUsers, handelGetUser, handelCreateUser, handelDeleteUser, handelUpdateUser, handlePasswordChange };