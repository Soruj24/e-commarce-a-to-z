import { Types, Document } from "mongoose";
import createError from 'http-errors';
import { IUser } from "../types";
import User from "../models/userModel";

// Interface for User document
interface IUserDocument extends IUser, Document { }

// Interface for update options
interface UpdateOptions {
    new?: boolean;
    runValidators?: boolean;
    context?: string;
}

const findUser = async (id: string): Promise<IUserDocument> => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            throw createError(400, "Invalid user ID");
        }

        const user = await User.findById(id);
        if (!user) {
            throw createError(404, "User not found");
        }
        return user;

    } catch (error: any) {
        if (error instanceof createError.HttpError) {
            throw error;
        }
        throw createError(500, "Error finding user");
    }
};

const deleteUser = async (id: string): Promise<IUserDocument> => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            throw createError(400, "Invalid user ID");
        }

        const userDelete = await User.findByIdAndDelete(id);
        if (!userDelete) {
            throw createError(404, "User not found for deletion");
        }
        return userDelete;

    } catch (error: any) {
        if (error instanceof createError.HttpError) {
            throw error;
        }
        throw createError(500, "Error deleting user");
    }
};

const updateUser = async (
    id: string,
    updates: Partial<IUser>,
    updateOptions: UpdateOptions
): Promise<IUserDocument> => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            throw createError(400, "Invalid user ID");
        }

        const userUpdate = await User.findByIdAndUpdate(id, updates, updateOptions);
        if (!userUpdate) {
            throw createError(404, "User not found for update");
        }
        return userUpdate;

    } catch (error: any) {
        if (error instanceof createError.HttpError) {
            throw error;
        }
        throw createError(500, "Error updating user");
    }
};

const createUser = async (
    name: string,
    email: string,
    password: string
): Promise<IUserDocument> => {
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw createError(400, "User already exists");
        }

        const user = await User.create({
            name,
            email,
            password
        });

        return user;

    } catch (error: any) {
        if (error instanceof createError.HttpError) {
            throw error;
        }
        if (error.name === 'ValidationError') {
            throw createError(400, error.message);
        }
        throw createError(500, "Error creating user");
    }
};

export {
    findUser,
    deleteUser,
    updateUser,
    createUser,
};