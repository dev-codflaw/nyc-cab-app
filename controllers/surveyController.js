exports.submitSurvey = async (req, res) => {
  const { userId, surveyAnswers } = req.body;

  if (!userId || !Array.isArray(surveyAnswers)) {
    return res.status(400).json({ success: false, message: "Invalid survey data." });
  }

  try {
    // Save to MongoDB or other DB
    // Example: Survey.create({ userId, answers: surveyAnswers });
    // For now, just log it
    console.log("Survey Data:", { userId, surveyAnswers });

    res.json({ success: true, message: "Survey submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving survey." });
  }
};
