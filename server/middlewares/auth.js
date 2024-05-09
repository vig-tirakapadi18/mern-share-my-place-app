const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") { return next(); }

    try {
        const token = req.headers.authorization.split(" ")[1];  // Authorization: "Bearer TOKEN"
        if (!token) {
            throw new Error("Authorization failed!");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        return next(new HttpError("Authorization failed!", 403));
    }
};