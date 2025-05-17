import app from "./app";
import { PORT } from "./secret";
import dotenv from "dotenv";
dotenv.config();

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});