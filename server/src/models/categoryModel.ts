import mongoose, { Document, Schema, Types } from "mongoose";
import slugify from "slugify";

// Interface for Category document
interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  products: Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Category Schema
const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    image: {
      type: String,
      default: "https://i.imgur.com/category-default.png",
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: "Product",
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  }
);

// Generate slug before saving
categorySchema.pre<ICategory>("save", function(next) {
  if (!this.isModified("name")) return next();
  
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
  next();
});

// Virtual for product count
categorySchema.virtual("productCount").get(function(this: ICategory) {
  return this.products?.length || 0;
});

// Query helpers
categorySchema.statics = {
  async findActive() {
    return this.find({ isActive: true });
  },
  
  async findByName(name: string) {
    return this.findOne({ name: new RegExp(name, "i") });
  }
};

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;