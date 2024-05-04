const express = require('express');
const { check } = require("express-validator");
const {
    getPlacebyId,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
} = require("../controllers/places.controller");

const router = express.Router();

router.get("/:placeId", getPlacebyId);

router.get("/user/:userId", getPlacesByUserId);

router.post("/", [
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