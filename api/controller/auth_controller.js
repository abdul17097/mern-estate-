const User = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
    if (!isPasswordValid) return next(errorHandler(401, "Wrong Credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRETE_KEY);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(validUser);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const { password: pass, ...rest } = user._doc;
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE_KEY);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        "-" +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatePassword, 10);

      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      const { password, ...rest } = newUser._doc;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETE_KEY);

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "you can only update your own account!"));
  }
  try {
    const validUser = await User.findById({ _id: id });
    if (validUser) {
      const { avatar, username, email, password } = req.body;

      // Check if any fields are provided for update
      if (!avatar && !username && !email && !password) {
        // If no fields are provided, return current user data
        const { password: userPassword, ...rest } = validUser._doc;
        return res.status(200).json(rest);
      }

      // Create an object with only the provided fields
      const updateFields = {};
      if (avatar) updateFields.avatar = avatar;
      if (username) updateFields.username = username;
      if (email) updateFields.email = email;
      if (password) updateFields.password = bcryptjs.hashSync(password, 10);

      const user = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, google, updateUser };
