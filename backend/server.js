import express, { json } from "express"
import mongoose from "mongoose"
import "dotenv/config"
import bcrypt from "bcrypt"
import { emailRegex, passwordRegex } from "./regexPatterns.js";
import jwt from "jsonwebtoken"

import User from "./Schema/User.js"
import { nanoid } from "nanoid";

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

const formatDataToSend = function (user) {

    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)

    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname
    }
}

const generateUsername = async function (email) {
    const username = email.split("@")[0]
    const usernameExists = await User.exists({ "personal_info.username": username }).then((result) => result)

    if (usernameExists) {
        return username + nanoid()
    }


    return username
}

server.post("/signup", (req, res) => {
    const { fullname, email, password } = req.body;

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

    bcrypt.hash(password, 10, async (error, hashed_password) => {
        if (error) {
            return res.status(500).json({ "error": error.message });
        }

        const username = await generateUsername(email);

        const user = new User({
            "personal_info": { fullname, email, password: hashed_password, username }
        });

        user.save().then((u) => {
            return res.status(200).json(formatDataToSend(u))
        }).catch((error) => {
            if (error.code === 11000) {
                return res.status(500).json({ "error": "Email already exists" })
            }

            return res.status(500).json({ "error": error.message })
        })

        console.log(hashed_password);
    })
})

server.post("/signin", (req, res) => {
    const { email, password } = req.body

    User.findOne({ "personal_info.email": email }).then((user) => {
        if (!user) {
            return res.status(403).json({ "error": "Email not found" })
        }

        bcrypt.compare(password, user.personal_info.password, (error, result) => {
            if (error) {
                return res.status(403).json({ "error": "Error occured while logging, please try again" })
            }

            if (!result) {
                return res.status(403).json({ "error": "Incorrect password" })
            } else {
                return res.status(200), json(formatDataToSend(user))
            }
        })

        console.log(user);
    }).catch((error) => {
        console.log(error.message);
        return res.status(500).json({ "error": error.message })
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})