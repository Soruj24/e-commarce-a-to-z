import app from "./app";
import { connectDB } from "./config/db";
import { PORT } from "./secret";

// Start the server
app.listen(PORT, async() => {
    // Connect to the database 
    await connectDB(); 
    console.log("Server is running on http://localhost:" + PORT);
});