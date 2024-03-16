const User = require("../model/User");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({ users });
}

const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    });

    try {
        await user.save();
        return res.status(201).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const logIn = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    return res.status(200).json({ user: existingUser });
}

module.exports = { getAllUser, signUp, logIn };
