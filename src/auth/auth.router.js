const router = require("express").Router();
const controller = require("./auth.controller");
const passport = require("./passport");

router.route('/login').post(controller.postLogin).get(controller.getLogin);
  
router.get('/logout', controller.logout);

module.exports = router