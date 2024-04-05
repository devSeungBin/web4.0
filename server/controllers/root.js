const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(201).send('WEB 4.0');   
});


module.exports = router;
