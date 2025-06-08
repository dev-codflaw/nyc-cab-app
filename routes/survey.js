const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/auth');
const SurveyResponse = require('../models/SurveyResponse');

// Survey form
router.get('/', authenticateJWT, (req, res) => {
  res.render('survey_form.njk'); // Use your HTML as Nunjucks template
});

// Submit survey
router.post('/submit', authenticateJWT, express.json(), async (req, res) => {
  try {
    const surveyData = req.body;
    const newSurvey = new SurveyResponse({
      userId: req.user._id,
      data: surveyData,
    });
    await newSurvey.save();
    res.json({ success: true, message: 'Survey submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error saving survey' });
  }
});

module.exports = router;
