const router = require("express").Router();
const controller = require("./auth.controller");

router.route("/").post(controller.validateUser);

module.exports = router;