import Sequelize from "sequelize";
import { CourseChapter, Quiz, QuizQuestion, sequelize } from "../models/index.js";
import * as Models from "../models/quiz.js";
import { Op } from "sequelize";

/** @param {Models.QuizAttributes} payload */
export function createQuiz(payload) {
  return Quiz.create(payload);
}

/**
 * @param {Models.QuizAttributes} payload
 * @param {string} quizId
 */
export function updateQuiz(payload, quizId) {
  return Quiz.update(payload, {
    where: { id: quizId },
  });
}

/** @param {string} id */
export function getQuizById(id) {
  return Quiz.findOne({
    where: { id },
  });
}

/** @param {string} quiz_id*/
export function getQuestionsByQuizId(quiz_id) {
  return Quiz.findByPk(quiz_id, {
    include: [
      "chapter",
      {
        model: QuizQuestion,
        as: "questions",
        where: { quiz_id: quiz_id },
      },
      {
        model: CourseChapter,
        as: "chapter",
      },
    ],
  });
}

/** @param {string} chapterId */
export function getQuizzesByChapterId(chapterId) {
  return Quiz.findAll({
    where: { course_chapter_id: chapterId },
    attributes: ["id"],
  });
}

/** @param {string} courseId */
export async function getCourseQuizzesByCourseId(courseId) {
  const courseQuizzes = await sequelize.query(
    `(
      SELECT q.id
      
      FROM quiz as q

      JOIN course_chapter as cc
        ON q.course_chapter_id = cc.id

      WHERE cc.course_id = :course_id
    )`,
    {
      type: Sequelize.QueryTypes.SELECT,
      model: Quiz,
      replacements: { course_id: courseId },
    }
  );

  const courseQuizzesIds = courseQuizzes.map(({ dataValues: { id } }) => id);

  return courseQuizzesIds;
}

/** @param {string[]} ids */
export function destroyQuizzes(ids) {
  return Quiz.destroy({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
}
