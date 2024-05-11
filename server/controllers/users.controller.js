const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require('../models/http-error');
const User = require("../models/user.model");

exports.getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, "-password");
    } catch (error) {
        return next(new HttpError("Error fetching users, please try again later!", 500));
    }

    res.json({ success: true, users: users.map(user => user.toObject({ getters: true })) });
};

exports.signUpUser = async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return next(new HttpError("Invalid inputs, please provide a valid inputs!", 403));
    }

    const { name, email, password, image } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return next(new HttpError("Sign up failed, please try again later!", 500));
    }

    if (existingUser) {
        return next(new HttpError("Email already exists! Please user another email.", 422));
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        return next(new HttpError("Could not create a user, please try again later!", 500));
    }

    const createdUser = new User({
        name,
        email,
        image,
        password: hashedPassword,
        places: []
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError("Sign up failed, please try again later!", 500));
    }

    let token;
    try {
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
    } catch (error) {
        return next(new HttpError("Sign up failed, please try again later!", 500));
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token });
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return next(new HttpError("Sign up failed, please try again later!", 500));
    }

    if (!existingUser) {
        return next(new HttpError("Invalid credentials, couldn't find the user!", 404));
    }

    let isValidPassword = false;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
        return next(new HttpError("Invalid CredentialsContainer, please check and try again!", 500));
    }

    if (!isValidPassword) {
        return next(new HttpError("Invalid CredentialsContainer, please check and try again!", 500));
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
    } catch (error) {
        return next(new HttpError("Sign up failed, please try again later!", 500));
    }

    res.status(200).json({ userId: existingUser.id, email: existingUser.email, token });
};
