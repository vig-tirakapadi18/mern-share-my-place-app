const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "https://ionicframework.com/docs/demos/api/thumbnail/thumbnail.svg" },
    location: {
        lat: { type: Number, required: true },
        lat: { type: Number, required: true },
    },
    address: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const placeModel = mongoose.model("Place", placeSchema);

module.exports = placeModel;