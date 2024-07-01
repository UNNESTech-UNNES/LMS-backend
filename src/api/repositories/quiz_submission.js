import { QuizSubmission } from "../models/index.js";
import * as Models from "../models/quiz-submission.js";

/** @param {Models.QuizSubmissionAttributes} payload */
export function createQuizSubmission(payload) {
  return QuizSubmission.create(payload);
}
