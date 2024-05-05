const { v4 } = require("uuid");
const { validationResult } = require('express-validator');
const User = require("../models/user.model");

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Vig",
        email: "test@test.com",
        password: "test123456"

    },
    {
        id: "u2",
        name: "Vis",
        email: "hello@test.com",
        password: "hello123456"
    }
];

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
        return next(new HttpError("Invalid inputs, please provide a valid inputs!", 422));
    }

    const { name, email, password, places } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return next(new HttpError("Sign up failed, please try again later!", 500));
    }

    if (existingUser) {
        return next(new HttpError("Email already exists! Please user another email.", 422));
    }

    const createdUser = new User({
        name,
        email,
        password,
        image: "https://i.pinimg.com/236x/83/75/59/837559d3a670cdd887e58de85c4a73e1.jpg",
        places: []
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError("Sign up failed, please try again later!", 500));
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return next(new HttpError("Sign up failed, please try again later!", 500));
    }

    if (!existingUser || existingUser.email !== email || existingUser.password !== password) {
        return next(new HttpError("Invalid credentials, couldn't find the user!", 404));
    }

    res.status(200).json({ success: true, user: existingUser });
};
