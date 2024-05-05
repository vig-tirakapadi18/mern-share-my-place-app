const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const placesRoutes = require("./routes/places.routes");
const usersRoutes = require("./routes/users.routes");
const HttpError = require("./models/http-error");

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
    return next(new HttpError("404: Page Not Found!", 404));
});

app.use((error, req, res, next) => {
    if (res.headerSent) return next(error);

    res.status(error.statusCode || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log("Connection established with MongoDB!")
        app.listen(5000, () => {
            console.log("Server listening on port 5000!");
        })
    })
    .catch(err => console.log(err));
