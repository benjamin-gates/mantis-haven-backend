const router = require("express").Router();
const controller = require("./images.controller");

router.route("/").get(controller.list);

module.exports = router;