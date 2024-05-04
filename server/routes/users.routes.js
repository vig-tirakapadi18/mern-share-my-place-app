const express = require('express');
const { check } = require("express-validator");

const { getAllUsers, signUpUser, loginUser } = require('../controllers/users.controller');

const router = express.Router();

router.get("/", getAllUsers);
router.post("/sign-up", [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 })
], signUpUser);
router.post("/login", loginUser);

module.exports = router;