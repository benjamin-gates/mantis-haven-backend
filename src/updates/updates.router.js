const router = require("express").Router();
const controller = require("./updates.controller");

router.route("/").get(controller.list).post(controller.create);

router.route("/:updateId").delete(controller.delete);


module.exports = router;