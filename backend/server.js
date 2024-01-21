import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import { emailRegex, passwordRegex } from "./regexPatterns.js";

const server = express()
const PORT = process.env.PORT || 3000

server.use(express.json())

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_LOCATION);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB()


server.post("/signup", (req, res) => {
    let { fullname, email, password } = req.body;

    if (!fullname || fullname.length < 3) {
        return res.status(403).json({ error: "Fullname must be at least 3 characters long" });
    }

    if (!email || !email.length) {
        return res.status(403).json({ error: "Email is required" });
    }

    if (!emailRegex.test(email)) {
        return res.status(403).json({ error: "Invalid email address. Please provide a valid email." });
    }

    if (!passwordRegex.test(password)) {
        return res.status(403).json({ error: "Invalid password. Password must be 6 to 20 characters long and include at least one digit, one lowercase letter, and one uppercase letter." });
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})