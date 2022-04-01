const express = require('express');
const router = express.Router();

router.get("/users", (req, res) => {
    res.send("Get all user!");
})

router.get("/:id", (req, res) => {
    res.send(`Get user ${req.params.id}`);
})

module.exports = router;