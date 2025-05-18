import Category from "../models/categoryModel";
import { successResponse } from "./responsControllers";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { categoryFinder } from "../services/categoryServices";
import slugify from 'slugify';

export const handelGetAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search as string, $options: 'i' } },
                    { description: { $regex: search as string, $options: 'i' } }
                ]
            };
        }

        const categories = await Category.find(query);

        if (!categories || categories.length === 0) {
            throw createError(404, "No categories found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Categories were returned successfully",
            payload: {
                categories,

            }
        });

    } catch (error) {
        next(error);
    }
};

export const handelGetCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;

        const category = await categoryFinder(slug);


        return successResponse(res, {
            statusCode: 200,
            message: "Categories were returned successfully",
            payload: {
                category,
            }
        });

    } catch (error) {
        next(error);
    }
};

export const handelDeleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const deletedCategory = await Category.findOneAndDelete({ slug });

        if (!deletedCategory) {
            throw createError(404, "Category not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Category deleted successfully",
            payload: {
                category: deletedCategory
            }
        });
    } catch (error) {
        next(error);
    }
};

export const handelUpdateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const updateData = req.body;

        if (updateData.name) {
            updateData.slug = slugify(updateData.name, { lower: true, strict: true });
        }

        const updatedCategory = await Category.findOneAndUpdate(
            { slug },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            throw createError(404, "Category not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Category updated successfully",
            payload: {
                category: updatedCategory
            }
        });

    } catch (error) {
        next(error);
    }
};

export const handelCreateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, image } = req.body;

        if (!name) {
            throw createError(400, "Category name is required");
        }
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            throw createError(400, "Category with this name already exists");
        }

        const newCategory = new Category({
            name,
            slug: slugify(name, { lower: true, strict: true }),
            description: description || '',
            image: image || '',
            isActive: true
        });

        const savedCategory = await newCategory.save();

        return successResponse(res, {
            statusCode: 201,
            message: "Category created successfully",
            payload: {
                category: savedCategory
            }
        });
    } catch (error) {
        next(error);
    }
};
