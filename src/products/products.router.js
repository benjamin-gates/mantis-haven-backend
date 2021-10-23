const router = require("express").Router();
const controller = require("./products.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

router.route("/:productId").delete(controller.delete).all(methodNotAllowed);

module.exports = router;