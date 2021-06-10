import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exists!" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials!" });

        const token = jwt.sign({ username: existingUser.username, _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

        const user = {
            username: existingUser.username,
            token
        }

        res.status(200).json({ user });

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: "Something went wrong!"});
    }
}

export const signUp = async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if(existingUser) return res.status(400).json({ message: "User already exists!" });

        if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match!" });

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await User.create({ username, password: passwordHash });

        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

        res.status(200).json({ user: { username: user.username,  token }});
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: "Something went wrong!"});
    }
}