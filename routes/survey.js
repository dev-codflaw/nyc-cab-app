const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/surveyController");
const { authenticateJWT } = require("../middlewares/auth"); // If JWT secured

router.post("/", authenticateJWT, surveyController.submitSurvey);

module.exports = router;
