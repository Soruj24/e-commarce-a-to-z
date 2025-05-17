import app from "./app";
import { connectDB } from "./config/db";
import { PORT } from "./secret";
import dotenv from "dotenv";
dotenv.config();

// Start the server
app.listen(PORT, async() => {
    // Connect to the database 
    await connectDB(); 
    console.log("Server is running on http://localhost:" + PORT);
});