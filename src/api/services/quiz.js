import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import * as quizQuestionRepository from "../repositories/question.js";

/**
 * @param {string} quiz_id
 */
export async function getQuizById(quiz_id) {
  try {
    const quiz = await quizQuestionRepository.getQuestionsByQuizIdToShow(quiz_id);
    if (!quiz) {
      throw new ApplicationError("Quiz not found", 404);
    }
    return quiz;
  } catch (err) {
    throw generateApplicationError(err, "Error while getting quiz", 500);
  }
}
