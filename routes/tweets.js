const express = require(`express`);
const router = express.Router();
// const app = express();
const db = require("../db/models/");
const { Tweet } = db;
console.log(Tweet)

// const { asyncHandler } = require('../app.js');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


router.get("/", asyncHandler( async(req, res) => {
    const tweets = await Tweet.findAll();
    res.json({ tweets });
}));

module.exports = router;
