import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import { getCourseFilterQuery } from "../../libs/query.js";
import { parseArrayStringToArray, omitPropertiesFromObject } from "../../libs/utils.js";
import * as courseRepository from "../repositories/course.js";
import * as courseChapterRepository from "../repositories/course_chapter.js";
import * as courseMaterialRepository from "../repositories/course_material.js";
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
// export async function getCourseById(id, userId = null) {
//   try {
//     /** @type {Awaited<ReturnType<typeof courseRepository.getCourseById>>} */
//     let course = null;

//     if(userId){
//       const existingUserCourse = await userCourseRepository.getUserCourseByCourseId(id, userId);

//       // If logged in user has already enrolled in the course
//       if(existingUserCourse){
//         // course = await courseRepository.getCourseById();
//       } else {
//         // If logged in user has not enrolled in the course
//         course = await courseRepository.getCourseById(id);

//         const courseIsPremium = course?.dataValues?.premium;

//         if(courseIsPremium){
//           // Remove premium content from course except for the first chapter
//           course?.dataValues.course_chapter.forEach(
//             ({dataValues: {order_index, course_material}}) => {
//               if(order_index >1){
//                 course_material.forEach(
//                   ({dataValues:}) => delete dataValues.course_content
//                 )
//               }
//             }
//           )
//         }
//       }
//     }
//   } catch (err) {
//     throw generateApplicationError(err, "Error while getting chapter", 500);
//   }
// }

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
  const { course_chapter, target_audience } = payload;

  const parsedPayload = omitPropertiesFromObject(payload, ["id", "created_at", "updated_at"]);

  try {
    const parsedCourseChapters = /** @type {any[]} */ (parseArrayStringToArray(course_chapter));

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

    for (const chapter of parsedCourseChapters) {
      /** @type {{ id:string; course_material:any[] }} */
      const { id: chapterId, course_material } = chapter;

      // Retrieve the list of materials from the database
      const existingMaterials = chapterId ? await courseMaterialRepository.getMaterialsByChapterId(id) : [];

      // Delete any materials that are not in the updated list
      const materialIdsInPayload = /** @type {string[]} */ (course_material.map(({ id }) => id));

      // Get the list of material ids that are not in the updated list
      const materialIdsToDelete = existingMaterials.filter(({ dataValues: { id } }) => !materialIdsInPayload.includes(id)).map(({ dataValues: { id } }) => id);

      await courseMaterialRepository.destroyMaterial(materialIdsToDelete);

      const courseChapter = chapterId ? await courseChapterRepository.getChapterById(chapterId) : null;

      if (courseChapter) {
        await courseChapterRepository.updateChapter(chapter, chapterId);

        for (const material of course_material) {
          const { id: materialId } = material;

          if (materialId) {
            const courseMaterial = await courseMaterialRepository.getMaterialById(materialId);
            if (courseMaterial) {
              await courseMaterialRepository.updateMaterial(material, materialId);
            } else {
              const parsedMaterialWithChapterId = {
                ...material,
                course_chapter_id: chapterId,
              };

              const newMaterial = await courseMaterialRepository.createMaterial(parsedMaterialWithChapterId);

              // await courseMaterialStatusRepository.backfillCourseMaterialStatus(id, newMaterial.dataValues.id);
            }
          }
        }
      } else {
        const newChapter = await courseChapterRepository.createChapter(chapter);

        for (const material of course_material) {
          const newMaterial = await courseMaterialRepository.createMaterial({
            ...material,
            course_chapter_id: newChapter.dataValues.id,
          });

          // await courseMaterialRepository.backfillCourseMaterialStatus(id, newMaterial.dataValues.id);
        }
      }
    }

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
    return await courseRepository.deleteCourse(id);
  } catch (err) {
    throw generateApplicationError(err, "Error while deleting course", 500);
  }
}
