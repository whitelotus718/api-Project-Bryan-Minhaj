const express = require(`express`);
const router = express.Router();
// const app = express();

router.get("/", (req, res) => {
    res.json({ message: "test root index" });
});

module.exports = router;
