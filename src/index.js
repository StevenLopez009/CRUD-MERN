import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();
app.listen(3100);
console.log("Server on port", 3100);
