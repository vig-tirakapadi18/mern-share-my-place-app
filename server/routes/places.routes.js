const express = require('express');
const { check } = require("express-validator");
const {
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace,
    getPlaceById
} = require("../controllers/places.controller");
const fileUpload = require("../middlewares/file-upload");
const auth = require('../middlewares/auth');

const router = express.Router();

router.get("/:placeId", getPlaceById);

router.get("/user/:userId", getPlacesByUserId);

router.use(auth);

router.post("/",
    fileUpload.single("image"),
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("address").not().isEmpty()
    ], createPlace);

router.patch("/:placeId", [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
], updatePlace);

router.delete("/:placeId", deletePlace);

module.exports = router;