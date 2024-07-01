import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import * as quizRepository from "../repositories/quiz.js";
import * as quizQuestionRepository from "../repositories/question.js";
import * as quizSubmissionRepository from "../repositories/quiz_submission.js";
import * as historyAttemptRepository from "../repositories/history_attempt.js";
import * as quizQuestionModels from "../models/quiz_question.js";
import * as historyAttemptModels from "../models/historyattempt.js";
import * as quizSubmissionModels from "../models/quiz-submission.js";
import * as Types from "../../libs/types/common.js";

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

/**
 * @param {string} quiz_id
 * @param {string} user_id
 * @param {any} payload
 */
export async function submitQuiz(quiz_id, user_id, payload) {
  try {
    const { attempted_at, submissions } = payload;

    const quiz = await quizRepository.getQuizById(quiz_id);
    if (!quiz) {
      throw new ApplicationError("Quiz not found", 404);
    }
    if (quiz.dataValues.retake === false) {
      const history = await historyAttemptRepository.getHistoryAttemptsByQuizId(quiz_id, user_id);
      if (history.length > 0) {
        throw new ApplicationError("You have already attempted this quiz", 400);
      }
    }
    const userAttempt = await historyAttemptRepository.createHistoryAttempt({ quiz_id, user_id, attempted_at });

    await Promise.all(
      submissions.map(async (/** @type {any} */ submission) => {
        await quizSubmissionRepository.createQuizSubmission({
          ...submission,
          user_id,
          attempt_id: userAttempt.dataValues.id,
        });
      })
    );
    const score = await countQuizScore(submissions);
    await historyAttemptRepository.updateHistoryAttempt({ score }, userAttempt.dataValues.id);
  } catch (err) {
    throw generateApplicationError(err, "Error while submitting quiz", 500);
  }
}

/** @param {any[]} submissions */
async function countQuizScore(submissions) {
  try {
    let score = 0;
    await Promise.all(
      submissions.map(async (/** @type {any} */ submission) => {
        const question = await quizQuestionRepository.getQuestionById(submission.question_id);
        if (question?.dataValues.correct_option === submission.answer) {
          score++;
        }
      })
    );
    const latestScore = Math.round((score / submissions.length) * 100);
    return latestScore;
  } catch (err) {
    throw generateApplicationError(err, "Error while counting quiz score", 500);
  }
}

/**
 * @param {string} user_id
 * @param {string} quiz_id
 */
export async function getHistory(quiz_id, user_id) {
  try {
    const history = await historyAttemptRepository.getHistoryAttemptsByQuizId(quiz_id, user_id);
    return history;
  } catch (err) {
    throw generateApplicationError(err, "Error while getting quiz history", 500);
  }
}
