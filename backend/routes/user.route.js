module.exports = (app) => {
  const ctrlUser = require("./../controller/user.controller");
  const jwtHelper = require("./../config/jwt.helper");
  const express = require("express");
  const router = express.Router();

  router.get("/me", jwtHelper.verifyJwt, ctrlUser.userProfile);
  router.get("/", ctrlUser.userLists);
  router.get("/:id", ctrlUser.getUser);
  router.post("/", ctrlUser.create);
  router.put("/:id", ctrlUser.updateUser);
  router.delete("/:id", ctrlUser.deleteUser);

  router.post("/authenticate", ctrlUser.authenticate);

  app.use("/api/user", router);
};
