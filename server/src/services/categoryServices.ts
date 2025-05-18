import Category from "../models/categoryModel";
import createError from "http-errors";

export const categoryFinder = async (slug: string) => {

    const category = await Category.findOne({ slug });

    if (!category) {
        throw createError(404, "Category not found");
    }
    return category;

}