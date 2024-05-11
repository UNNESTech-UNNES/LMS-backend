import Sequelize from "sequelize";
import { Quiz, QuizQuestion, CourseChapter, sequelize } from "../models/index.js";
import * as Models from "../models/quiz_question.js";
import { Op } from "sequelize";

/** @param {Models.QuizQuestionAttributes} payload */
export function createQuizQuestion(payload) {
  return QuizQuestion.create(payload);
}

/**
 * @param {Models.QuizQuestionAttributes} payload
 * @param {string} questionId
 */
export function updateQuizQuestion(payload, questionId) {
  return QuizQuestion.update(payload, {
    where: { id: questionId },
  });
}

/** @param {string} id */
export function getQuestionById(id) {
  return QuizQuestion.findOne({
    where: { id },
  });
}

/** @param {string} quizId */
export function getQuestionsByQuizId(quizId) {
  return QuizQuestion.findAll({
    where: { quiz_id: quizId },
  });
}

/** @param {string} quizId */
export function getQuestionsByQuizIdToShow(quizId) {
  return Quiz.findByPk(quizId, {
    include: [
      "chapter",
      {
        model: QuizQuestion,
        as: "questions",
        where: { quiz_id: quizId },
      },
      {
        model: CourseChapter,
        as: "chapter",
      },
    ],
  });
}

/** @param {string[]} quizId */
export function destroyQuestions(quizId) {
  return QuizQuestion.destroy({
    where: { id: { [Op.in]: quizId } },
  });
}
