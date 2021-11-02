const express = require('express');
const router = express.Router();
// localhost:3000/api
const BASEURL = "http://localhost:3000/api/get";

// Generates a new id and saves it in the database
router.post("/", (req, res) => {
    const longUrl = req.body.longUrl;
    const id = '_' + Math.random().toString(36).substr(2, 9);
    const shortUrl = `${BASEURL}/${id}`;
    const data = {"longUrl": longUrl, "shortUrl": shortUrl};
    res.send(shortUrl);
})

//
router.get("/get/:id", (req, res) => { 
    res.send("yes");
})

module.exports = router;
