const express = require(`express`);
const router = express.Router();
// const app = express();

router.get("/", (req, res) => {
    res.json({ message: "test tweets index" });
});

module.exports = router;
