const express = require('express');
const {
    getPlacebyId,
    getPlaceByUserId,
    createPlace,
    updatePlace,
    deletePlace
} = require("../controllers/places.controller");

const router = express.Router();

router.get("/:placeId", getPlacebyId);

router.get("/user/:userId", getPlaceByUserId);

router.post("/", createPlace);

router.patch("/:placeId", updatePlace);

router.delete("/:placeId", deletePlace);

module.exports = router;