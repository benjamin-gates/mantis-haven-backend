const router = require("express").Router();
const controller = require("./updates.controller");

router.route("/").get(controller.list);




module.exports = router;