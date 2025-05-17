import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/e-commerce';


export { PORT,  MONGO_URI };