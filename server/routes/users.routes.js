const express = require('express');

const router = express.Router();

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Vig",
        places: 7
    },
    {
        id: "u2",
        name: "Vis",
        places: 13
    }
];

module.exports = router;