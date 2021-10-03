const router = require("express").Router();
const controller = require("./images.controller");

router.route("/").get(controller.list).post(controller.create);

router.route("/:imageId").delete(controller.delete).put(controller.edit);

module.exports = router;