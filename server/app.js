const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const placesRoutes = require("./routes/places.routes");
const usersRoutes = require("./routes/users.routes");
const HttpError = require("./models/http-error");

const app = express();

dotenv.config();

app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

// ALLOWING CORS OPTIONS 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});


app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

app.use((req, res, next) => {
    return next(new HttpError("404: Page Not Found!", 404));
});

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        })
    }

    if (res.headerSent) return next(error);

    res.status(error.statusCode || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log("Connection established with MongoDB!")
        app.listen(process.env.PORT, () => {
            console.log("Server listening on port 5000!");
        })
    })
    .catch(err => console.log(err));
