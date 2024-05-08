import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import { getCourseFilterQuery } from "../../libs/query.js";
import { parseArrayStringToArray, omitPropertiesFromObject } from "../../libs/utils.js";
import * as courseRepository from "../repositories/course.js";
import * as courseChapterRepository from "../repositories/course_chapter.js";
import * as courseMaterialRepository from "../repositories/course_material.js";
import * as courseContentRepository from "../repositories/course_content.js";
import * as quizRepository from "../repositories/quiz.js";
import * as quizQuestionRepository from "../repositories/question.js";
import * as courseMaterialService from "./course-material.js";
import * as userCourseEnrollment from "../repositories/user_course_enrollment.js";
import * as Types from "../../libs/types/common.js";
import { da } from "@faker-js/faker";

/**
 * @param {Types.RequestQuery} params
 * @param {boolean} isAdminOrInstructor
 */
export async function getCourses(params, isAdminOrInstructor = false) {
  try {
    const queryFilters = await getCourseFilterQuery(params);

    let courses;

    const usingAdminCourses = isAdminOrInstructor && params.admin === "true";

    if (usingAdminCourses) {
      courses = await courseRepository.getCoursesWithDetails();
    } else if (queryFilters) {
      // @ts-ignore
      const sortByNewest = params.filter?.includes?.("new");

      courses = await courseRepository.getCoursesByFilter(queryFilters, sortByNewest);
    } else {
      courses = await courseRepository.getCourses();
    }

    return courses;
  } catch (err) {
    throw generateApplicationError(err, "Error while getting courses", 500);
  }
}

/**
 * @param {string} id
 * @param {string | null} [userId=null] Default is `null`
 */
export async function getCourseById(id, userId = null) {
  try {
    /** @type {Awaited<ReturnType<typeof courseRepository.getCourseById>>} */
    let course = null;

    if (userId) {
      const existingUserCourse = await userCourseEnrollment.getUserCourseByUserIdAndCourseId(userId, id);

      // If logged in user has already enrolled in the course
      if (existingUserCourse) {
        course = await courseRepository.getCourseWithUserStatus(id, userId);
      } else {
        course = await courseRepository.getCourseById(id);
      }
    } else {
      // If user is not logged in
      course = await courseRepository.getCourseById(id);
    }

    if (!course) {
      throw new ApplicationError("Course not found", 404);
    }

    return course;
  } catch (err) {
    throw generateApplicationError(err, "Error while getting course", 500);
  }
}

/**
 * @param {any} payload
 * @param {string} userId
 */
export async function createCourse(payload, userId) {
  const parsedPayload = omitPropertiesFromObject(payload, ["id", "created_at", "updated_at"]);

  const { target_audience, course_chapter } = payload;

  const parsedPayloadWithCategoryAndUser = {
    ...parsedPayload,
    user_id: userId,
    target_audience: parseArrayStringToArray(target_audience),
    course_chapter: parseArrayStringToArray(course_chapter),
  };

  try {
    const course = await courseRepository.createCourse(parsedPayloadWithCategoryAndUser);

    return course;
  } catch (err) {
    throw generateApplicationError(err, "Error while creating course", 500);
  }
}

/**
 * @param {any} payload
 * @param {string} id
 */
export async function updateCourse(payload, id) {
  const { chapters, target_audience } = payload;

  const parsedPayload = omitPropertiesFromObject(payload, ["id", "created_at", "updated_at"]);

  try {
    const parsedCourseChapters = /** @type {any[]} */ (parseArrayStringToArray(chapters));

    const parsedTargetAudience = /** @type {any[]} */ (parseArrayStringToArray(target_audience));

    const parsedPayloadArrayString = {
      ...parsedPayload,
      course_chapter: parsedCourseChapters,
      target_audience: parsedTargetAudience,
    };

    const course = await courseRepository.getCourseById(id);

    // Check if course not exists
    if (!course) {
      throw new ApplicationError("Course not found", 404);
    }

    // Retrieve the list of chapters from the database
    const existingChapters = await courseChapterRepository.getChaptersByCourseId(id);

    // Delete any chapters that are not in the updated list
    const chapterIdsInPayload = /** @type {string[]} */ (parsedCourseChapters?.map(({ id }) => id));

    // Get the list of chapter ids that are not in the updated list
    const chapterIdsToDelete = existingChapters.filter(({ dataValues: { id } }) => !chapterIdsInPayload.includes(id)).map(({ dataValues: { id } }) => id);

    await courseChapterRepository.destroyChapter(chapterIdsToDelete);

    await course.update(parsedPayloadArrayString);

    // Update the chapters
    await courseMaterialService.updateChapter(parsedCourseChapters, id);

    const updatedCourse = await courseRepository.getCourseById(id);

    return updatedCourse;
  } catch (err) {
    throw generateApplicationError(err, "Error while updating course", 500);
  }
}

/**
 * @param {string} id
 */
export async function destroyCourse(id) {
  try {
    // Delete course chapters
    const existingChapters = await courseChapterRepository.getChaptersByCourseId(id);
    const chapterIds = /** @type {string[]} */ (existingChapters.map(({ dataValues: { id } }) => id));

    // Delete course materials
    for (const chapterId of chapterIds) {
      const existingMaterials = await courseMaterialRepository.getMaterialsByChapterId(chapterId);
      const materialIds = existingMaterials.map(({ dataValues: { id } }) => id);

      // Delete course contents
      for (const materialId of materialIds) {
        const existingContents = await courseContentRepository.getContentsByMaterialId(materialId);
        const contentIds = existingContents.map(({ dataValues: { id } }) => id);

        await courseContentRepository.destroyContents(contentIds);
      }
      await courseMaterialRepository.destroyMaterial(materialIds);

      // Delete quizzes
      const existingQuizzes = await quizRepository.getQuizzesByChapterId(chapterId);
      const quizIds = existingQuizzes.map(({ dataValues: { id } }) => id);

      // Delete quiz questions
      for (const quizId of quizIds) {
        const existingQuestions = await quizQuestionRepository.getQuestionsByQuizId(quizId);
        const questionIds = existingQuestions.map(({ dataValues: { id } }) => id);

        await quizQuestionRepository.destroyQuestions(questionIds);
      }
      await quizRepository.destroyQuizzes(quizIds);
    }

    await courseChapterRepository.destroyChapter(chapterIds);

    return await courseRepository.deleteCourse(id);
  } catch (err) {
    throw generateApplicationError(err, "Error while deleting course", 500);
  }
}
