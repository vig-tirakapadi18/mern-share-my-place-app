const { v4 } = require("uuid");
const { validationResult } = require('express-validator');

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

exports.getAllUsers = (req, res, next) => {
    res.json({ success: true, users: DUMMY_USERS });
};

exports.signUpUser = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        throw new HttpError("Invalid inputs, please provide a valid inputs!", 422);
    }

    const { name, email, password } = req.body;

    const isUserExist = DUMMY_USERS.find(user => user.email === email);

    if (!isUserExist) {
        throw new HttpError("Email already exists! Please user another email.", 422);
    }

    const createdUser = {
        id: v4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser });
};

exports.loginUser = (req, res, next) => {
    const { email, password } = req.body;

    const foundUser = DUMMY_USERS.find(user => user.email === email);

    if (foundUser.email !== email || foundUser.password !== password) {
        return new HttpError("Invalid credentials, couldn't find the user!", 404);
    }

    res.status(200).json({ success: true, user: foundUser });
};
