import Category from "../models/categoryModel";
import { successResponse } from "./responsControllers";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

export const handelGetAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            throw createError(404, "No categories found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Categories were returned successfully",
            payload: {
                categories,
                count: categories.length
            }
        });
        
    } catch (error) {
        next(error);
    }
};

