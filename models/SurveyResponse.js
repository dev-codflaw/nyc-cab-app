const mongoose = require('mongoose');

const SurveyResponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  data: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SurveyResponse', SurveyResponseSchema);
