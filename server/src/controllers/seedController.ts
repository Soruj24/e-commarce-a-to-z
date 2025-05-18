import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { generateMockData } from '../config/data';
import Product from '../models/productsModel';
import slugify from 'slugify';
import Category from '../models/categoryModel';

export const seedUserAdd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { users } = await generateMockData();
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

export const seedProductsAdd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { products } = await generateMockData();
        // 1. Delete all existing products
        await Product.deleteMany({});

        // 2. Insert new seed products
        const createdProducts = await Product.insertMany(products);

        res.status(201).json({
            success: true,
            message: 'Seed product data added successfully',
            count: createdProducts.length,
            products: createdProducts
        });

    } catch (error: any) {
        next(error);
    }
};

export const seedCategoriesAdd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ProductCategory } = await generateMockData();

        // Clear existing categories
        await Category.deleteMany({});

        // Insert new categories
        const createdCategories = await Category.insertMany(ProductCategory);

        res.status(201).json({
            success: true,
            message: 'Seed category data added successfully',
            count: createdCategories.length,
            categories: createdCategories
        });

    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate category detected'
            });
        }
        next(error);
    }
};