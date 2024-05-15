const express = require("express");
const router = express();
const userCon = require("../controllers/userController");
const validate = require("../middleware/bodyValidation/validationMethod");
const schema = require("../middleware/bodyValidation/validationSchema");

router.post("/signup", validate.validateBody(schema.signup), userCon.signUp);
// router.post("/login", validate.validateBody(schema.login), userCon.login);

module.exports = router;
