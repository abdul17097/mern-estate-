const express = require("express");
const {
  signup,
  signin,
  google,
  updateUser,
  deleteUser,
  signOut,
} = require("../controller/auth_controller");
const { verifytoken } = require("../utils/verifyuser");
const routes = express.Router();

routes.post("/signup", signup);
routes.post("/signin", signin);
routes.post("/google", google);
routes.post("/update/:id", verifytoken, updateUser);
routes.delete("/deleteuser/:id", verifytoken, deleteUser);
routes.get("/signOut", signOut);
module.exports = routes;
