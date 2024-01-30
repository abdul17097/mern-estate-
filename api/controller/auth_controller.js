const User = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashPassword});
    try {
        await newUser.save();
        res.status(201).json('User created successfully')
    } catch (error) {
        next(error);
    }
    
}

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found!"));

        const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
        if (!isPasswordValid) return next(errorHandler(401, "Wrong Credentials!"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRETE_KEY);

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(validUser);
    } catch (error) {
        next(error);
    }
};


module.exports = {signup, signin};