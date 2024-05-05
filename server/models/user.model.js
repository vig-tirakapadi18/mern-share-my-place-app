const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    image: { type: String, default: "https://i.pinimg.com/236x/83/75/59/837559d3a670cdd887e58de85c4a73e1.jpg" },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

userSchema.plugin(uniqueValidator);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;