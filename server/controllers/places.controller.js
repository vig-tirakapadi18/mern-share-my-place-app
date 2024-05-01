const { v4 } = require('uuid');
const HttpError = require('../models/http-error');

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

exports.getPlacebyId = (req, res, next) => {
    const placeId = req.params.placeId; // { placeId: "p1" }

    const foundPlace = DUMMY_PLACES.find(place => place.id === placeId);

    if (!foundPlace) {
        // const error = new Error("Could't find a place with a given ID.");
        // error.statusCode = 404;
        // return next(error);

        return next(new HttpError("Could't find a place with a given ID.", 404));
    }

    res.json({ success: true, place: foundPlace });
};

exports.getPlaceByUserId = (req, res, next) => {
    const userId = req.params.userId;

    const foundPlace = DUMMY_PLACES.find(user => user.creator === userId);

    if (!foundUser) {
        // const error = new Error("User not found with the given ID.");
        // error.statusCode = 404;
        // throw error;

        throw new HttpError("User not found with the given ID.", 404);
    }

    res.json({ success: true, user: foundPlace });
};

exports.createPlace = (req, res) => {
    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = {
        id: v4(),   // Unique ID
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({ success: true, place: createdPlace });
};

exports.updatePlace = (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.placeId;

    const foundPlace = DUMMY_PLACES.find(place => place.id === placeId);

    if (!foundPlace) {
        return next(new HttpError("Place does not exist!", 404));
    }

    // foundPlace.title = title;
    // foundPlace.description = description;

    // res.json({ success: true, place: { ...foundPlace, title, description } });

    const updatedPlace = { ...DUMMY_PLACES.find(place => place.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ success: true, place: updatedPlace });
};

exports.deletePlace = (req, res, next) => {
    const placeId = req.params.placeId;

    DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId);

    res.status(200).json({ success: true, message: "Place deleted successfully." });
};