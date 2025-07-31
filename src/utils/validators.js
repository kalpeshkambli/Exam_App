// src/utils/validators.js
const Joi = require('joi');

// Student profile update: password कमीतकमी 6 (जास्त चालेल)
exports.updateStudentSchema = Joi.object({
  name: Joi.string().min(2).required(),
  branch: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Exam creation / update
exports.examSchema = Joi.object({
  subject: Joi.string().min(1).required(),
  start_time: Joi.string().isoDate().required(),
  duration_minutes: Joi.number().integer().min(1).required()
});

// Question add/update
exports.questionSchema = Joi.object({
  question_text: Joi.string().required(),
  option_a: Joi.string().required(),
  option_b: Joi.string().required(),
  option_c: Joi.string().required(),
  option_d: Joi.string().required(),
  correct_option: Joi.string().valid('A', 'B', 'C', 'D').required()
});

// Exam submission
exports.submitExamSchema = Joi.object({
  answers: Joi.array().items(
    Joi.object({
      questionId: Joi.number().integer().required(),
      selectedOption: Joi.string().valid('A', 'B', 'C', 'D').required()
    })
  ).min(1).required()
});
