import { successResponse } from "./responsControllers";
import { Request, Response, NextFunction } from "express";
import Product from "../models/productsModel";
import createError from "http-errors";

export const handelGetProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            throw createError(404, "Product not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Product retrieved successfully",
            payload: {
                product
            }
        });
    } catch (error) {
        next(error);
    }
};

export const handelDeleteProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw createError(404, "Product not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Product deleted successfully",
            payload: {
                product: deletedProduct
            }
        });
    } catch (error) {
        next(error);
    }
};

export const handelUpdateProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            throw createError(404, "Product not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Product updated successfully",
            payload: {
                product: updatedProduct
            }
        });
    } catch (error) {
        next(error);
    }
};
export const handelGetProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");

        const filter = {
            $or: [
                { name: { $regex: searchRegExp } },
                { description: { $regex: searchRegExp } },
            ],
        };

        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "asc";

        const products = await Product.find(filter)
            .sort({
                [sort as string]: order === "asc" ? 1 : -1
            })
            .skip((page - 1) * limit)
            .limit(limit);
            
        const count = await Product.countDocuments(filter);

        return successResponse(res, {
            statusCode: 200,
            message: "Products were returned successfully",
            payload: {
                products,
                totalProducts: count,
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

export const handelCreateProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, price, category, stock, images } = req.body;

        // Validate required fields
        if (!name || !price || !category) {
            throw createError(400, "Name, price and category are required");
        }

        // Create new product
        const newProduct = new Product({
            name,
            description: description || '',
            price,
            category,
            stock: stock || 0,
            images: images || [],
            isActive: true
        });

        // Save product to database
        const savedProduct = await newProduct.save();

        return successResponse(res, {
            statusCode: 201,
            message: "Product created successfully",
            payload: {
                product: savedProduct
            }
        });
    } catch (error) {
        next(error);
    }
};