const router = require("express").Router();
const controller = require("./users.controller");

router.route("/").post(controller.createUser);

module.exports = router;