const express = require('express');
const { check } = require("express-validator");

const { getAllUsers, signUpUser, loginUser } = require('../controllers/users.controller');
const fileUpload = require("../middlewares/file-upload");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/sign-up",
    fileUpload.single("image"),
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 })
    ],
    signUpUser);
router.post("/login", loginUser);

module.exports = router;