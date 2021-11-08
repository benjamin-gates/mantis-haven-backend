const router = require("express").Router();
const controller = require("./users.controller");

router.route("/").post(controller.createUser);

router.route("/:userId").delete(controller.delete);

module.exports = router;