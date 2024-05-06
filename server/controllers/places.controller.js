const mongoose = require('mongoose');
const { validationResult } = require("express-validator");

const HttpError = require('../models/http-error');
const getCoordinatesForAddress = require('../util/location');
const Place = require('../models/place.model');
const User = require('../models/user.model');

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

    let userWithPlaces;

    try {
        userWithPlaces = await User.findById(userId).populate("places");
    } catch (error) {
        return next(new HttpError("Couldn't find places!", 404));
    }

    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(new HttpError("User not found with the given ID.", 404));
    }

    res.json({ success: true, places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
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

    let user;
    try {
        user = await User.findById(creator);
    } catch (error) {
        return next(new HttpError("Creating place failed, please try again!", 500));
    }

    if (!user) {
        return next(new HttpError("Could not find user with a provided ID!", 404));
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdPlace.save({ session });
        user.places.push(createdPlace);
        await user.save();
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
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
        foundPlace = await Place.findById(placeId).populate("creator");
    } catch (error) {
        return next(new HttpError("Couldn't find a place to delete!", 404));
    }

    if (!foundPlace) {
        return next(new HttpError("Couldn't find a place to delete!", 404));
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await foundPlace.deleteOne({ session });
        foundPlace.creator.places.pull(foundPlace);
        await foundPlace.creator.save({ session });
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return next(new HttpError("Something went wrong, couldn't remove place!", 500));
    }

    res.status(200).json({ success: true, message: "Place deleted successfully." });
};