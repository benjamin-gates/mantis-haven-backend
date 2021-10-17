const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./updates.controller");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

router.route("/:updateId").delete(controller.delete).put(controller.edit).all(methodNotAllowed);


module.exports = router;