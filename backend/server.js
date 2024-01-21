import express from "express"
import mongoose from "mongoose"
import "dotenv/config"

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

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})