const Listing = require("../models/listing_model");

const createlisting = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {}
};

module.exports = { createlisting };
