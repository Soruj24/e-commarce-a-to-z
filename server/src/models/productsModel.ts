import mongoose from "mongoose";
import { IProduct } from "../types";


const productSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: "https://img.icons8.com/dusk/64/user.png",
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;