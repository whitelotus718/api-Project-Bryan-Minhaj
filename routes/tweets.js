const express = require(`express`);
const check = require(`express-validator`);
const validationRes = require(`express-validator`);
const router = express.Router();
// const app = express();
const db = require("../db/models/");
const { Tweet } = db;
console.log(Tweet)

// const { asyncHandler } = require('../app.js');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const tweetNotFoundError = (tweetId) => {
    console.log(`efuisefijeijifwWIJHFIWJDWEIFJ`)
    const err = new Error(`Tweet of ${tweetId} could not be found.`)
    err.title = `Tweet not found.`
    err.status = 404
    return err;
}


router.get("/", asyncHandler(async (req, res, next) => {
    const tweets = await Tweet.findAll();
    res.json({ tweets });
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    console.log(`req.params is`, req.params)
    const tweetId = req.params.id
    const tweet = await Tweet.findByPk(tweetId);
    if (tweet) {
        res.json({ tweet }); //Why is it throwing an error in the console?
        next()
    }
    else {
        const newErr = tweetNotFoundError(tweetId);
        next(newErr);
    }
}));

const handleValidationErrors = (req, res, next) => {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        return next(err);
    }
    next();
};

router.post("/", (req, res, next) => {

});

module.exports = router;
