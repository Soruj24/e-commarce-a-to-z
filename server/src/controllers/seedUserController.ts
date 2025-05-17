import { Request, Response, NextFunction } from 'express';
import { users } from '../config/data';
import User from '../models/userModel';

const seedUserAdd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Delete all existing users
        await User.deleteMany({});

        // 2. Insert new seed users
        const createdUsers = await User.insertMany(users);

        res.status(201).json({
            success: true,
            message: 'Seed user data added successfully',
            count: createdUsers.length,
            users: createdUsers
        });

    } catch (error: any) {
        next(error);
    }
};

export default seedUserAdd;