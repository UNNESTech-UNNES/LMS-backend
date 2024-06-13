import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import { getCourseFilterQuery } from "../../libs/query.js";
import { parseArrayStringToArray, omitPropertiesFromObject } from "../../libs/utils.js";
import * as courseRepository from "../repositories/course.js";
import * as courseChapterRepository from "../repositories/course_chapter.js";
import * as courseMaterialRepository from "../repositories/course_material.js";
import * as courseContentRepository from "../repositories/course_content.js";
import * as courseInstructorRepository from "../repositories/course_instructor.js";
import * as quizRepository from "../repositories/quiz.js";
import * as quizQuestionRepository from "../repositories/question.js";
import * as courseChapterService from "./course-chapter.js";
import * as userCourseEnrollment from "../repositories/user_course_enrollment.js";
import * as Types from "../../libs/types/common.js";

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

/** @param {string} id */
export async function getCourseByIdToPreview(id) {
  try {
    const course = await courseRepository.getCourseByIdToPreview(id);
    if (!course) {
      throw new ApplicationError("Course not found", 404);
    }
    return course;
  } catch (err) {
    throw generateApplicationError(err, "Error while getting course", 500);
  }
}

/**
 * @param {string} id
 * @param {Types.RequestQuery} params
 */
export async function getUserCourses(id, params) {
  try {
    const queryFilters = await getCourseFilterQuery(params);

    // @ts-ignore
    const sortByNewest = params.filter?.includes?.("new");

    let userCourses = await (queryFilters ? courseRepository.getUserCoursesWithFilter(id, queryFilters, sortByNewest) : courseRepository.getUserCourses(id));

    // @ts-ignore
    const trimmedMyCourseType = params.type?.trim?.();

    const hasMyCourseTypeFilter = trimmedMyCourseType && ["ongoing", "completed"].includes(trimmedMyCourseType);
    if (hasMyCourseTypeFilter) {
      userCourses = userCourses.filter(({ dataValues: { total_materials, total_completed_materials } }) => {
        const isOngoing = total_materials > total_completed_materials;
        const isCompleted = total_materials === total_completed_materials;

        return trimmedMyCourseType === "ongoing" ? isOngoing : isCompleted;
      });
    }

    return userCourses;
  } catch (err) {
    throw generateApplicationError(err, "Error while getting user courses", 500);
  }
}

/**
 * @param {any} payload
 * @param {string} userId
 */
export async function createCourse(payload, userId) {
  const parsedPayload = omitPropertiesFromObject(payload, ["id", "created_at", "updated_at"]);

  const { target_audience, course_chapter, instructors } = payload;

  const parsedInstructos = /** @type {any[]} */ (parseArrayStringToArray(instructors));
  const course_instructors = parsedInstructos.map((instructor) => {
    return {
      user_id: instructor,
    };
  });
  const parsedPayloadWithCategoryAndUser = {
    ...parsedPayload,
    user_id: userId,
    target_audience: parseArrayStringToArray(target_audience),
    course_chapter: parseArrayStringToArray(course_chapter),
    course_instructors,
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
  const { chapters, target_audience, instructors } = payload;

  const parsedPayload = omitPropertiesFromObject(payload, ["id", "created_at", "updated_at"]);

  try {
    const parsedCourseChapters = /** @type {any[]} */ (parseArrayStringToArray(chapters));

    const parsedTargetAudience = /** @type {any[]} */ (parseArrayStringToArray(target_audience));

    const parsedInstructors = /** @type {string[]} */ (parseArrayStringToArray(instructors));
    const course_instructors = parsedInstructors.map((instructor) => {
      return {
        user_id: instructor,
      };
    });

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

    // Update Course instructors
    const CourseInstructorIds = await courseInstructorRepository.getCourseInstructorsByCourseId(id);
    // delete any instructors then create new ones
    const instructorIdsToDelete = CourseInstructorIds.map(({ dataValues: { id } }) => id);
    await courseInstructorRepository.destroyCourseInstructor(instructorIdsToDelete);

    for (const instructor of course_instructors) {
      await courseInstructorRepository.createCourseInstructor({ ...instructor, course_id: id });
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
    await courseChapterService.updateChapter(parsedCourseChapters, id);

    const updatedCourse = await courseRepository.getCourseByIdToPreview(id);

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
