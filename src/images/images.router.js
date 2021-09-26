const router = require("express").Router();
const controller = require("./images.controller");

router.route("/").get(controller.list).post(controller.create);

router.route("/:imageId").delete(controller.delete);

module.exports = router;