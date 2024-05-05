const { v4 } = require('uuid');
const { validationResult } = require("express-validator");

const HttpError = require('../models/http-error');
const getCoordinatesForAddress = require('../util/location');
const Place = require('../models/place.model');

let DUMMY_PLACES = [
    {
        id: "p1",
        title: "Eiffel Tower",
        description: "Eiffel Tower is in Paris, France!",
        location: {
            lat: 65.9876,
            lng: -32.8765
        },
        address: "Somewhere in Paris, France!",
        creator: "u1"
    }
];

exports.getPlaceById = async (req, res, next) => {
    const placeId = req.params.placeId; // { placeId: "p1" }

    let foundPlace;
    try {
        foundPlace = await Place.findById(placeId);
    } catch (error) {
        return next(new HttpError("Could not find a place!", 404));
    }

    if (!foundPlace) {
        return next(new HttpError("Could't find a place with a given ID.", 404));
    }

    res.json({ success: true, place: foundPlace.toObject({ getters: true }) });
};

exports.getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    let foundPlaces;

    try {
        foundPlaces = await Place.find({ creator: userId }).toArray();
    } catch (error) {
        return next(new HttpError("Couldn't find places!", 404));
    }

    if (!foundPlaces || foundPlaces.length === 0) {
        return next(new HttpError("User not found with the given ID.", 404));
    }

    res.json({ success: true, user: foundPlaces.map(place => place.toObject({ getters: true })) });
};

exports.createPlace = async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return next(new HttpError("Invalid inputs, please provide a valid inputs!", 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;

    try {
        coordinates = await getCoordinatesForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: "https://ionicframework.com/docs/demos/api/thumbnail/thumbnail.svg",
        creator
    });

    try {
        await createdPlace.save();
    } catch (error) {
        return next(new HttpError("Creating new place failed, please try again later!", 500));
    }

    res.status(201).json({ success: true, place: createdPlace });
};

exports.updatePlace = async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return next(new HttpError("Invalid inputs, please provide a valid inputs!", 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.placeId;

    let foundPlace;
    try {
        foundPlace = await Place.findById(placeId);
    } catch (error) {
        return next(new HttpError("Couldn't find a place to update!", 500));
    }

    if (!foundPlace) {
        return next(new HttpError("Place does not exist!", 404));
    }

    foundPlace.title = title;
    foundPlace.description = description;

    try {
        await foundPlace.save();
    } catch (error) {
        return next(new HttpError("Couldn't find a place to update!", 500));
    }

    res.status(200).json({ success: true, place: foundPlace.toObject({ getters: true }) });
};

exports.deletePlace = async (req, res, next) => {
    const placeId = req.params.placeId;

    let foundPlace;
    try {
        foundPlace = await Place.findByIdAndDelete(placeId);
    } catch (error) {
        return next(new HttpError("Couldn't find a place to delete!", 404))
    }

    if (!foundPlace) {
        return next(new HttpError("Couldn't find a place to delete!", 404));
    }

    res.status(200).json({ success: true, message: "Place deleted successfully." });
};