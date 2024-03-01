const express = require("express");
const { createlisting } = require("../controller/listing_controller");
const router = express.Router();

router.post("/create", createlisting);

module.exports = router;
