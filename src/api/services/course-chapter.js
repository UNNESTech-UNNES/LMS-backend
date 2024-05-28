import * as courseChapterRepository from "../repositories/course_chapter.js";
import * as courseMaterialRepository from "../repositories/course_material.js";
import * as courseMaterialCompletionRepository from "../repositories/course_material_completion.js";
import * as courseContentRepository from "../repositories/course_content.js";
import * as courseQuizRepository from "../repositories/quiz.js";
import * as courseQuizQuestionRepository from "../repositories/question.js";

/**
 * @param {any[]} parsedCourseChapters
 * @param {string} course_id
 */
export async function updateChapter(parsedCourseChapters, course_id) {
  for (const chapter of parsedCourseChapters) {
    /** @type {{ id:string; materials:any[]; quizzes:any[] }} */
    const { id: chapterId, materials, quizzes } = chapter;

    /** MATERIALS */
    // Retrieve the list of materials from the database
    const existingMaterials = chapterId ? await courseMaterialRepository.getMaterialsByChapterId(chapterId) : [];

    // Delete any materials that are not in the updated list
    const materialIdsInPayload = /** @type {string[]} */ (materials.map(({ id }) => id));

    // Get the list of material ids that are not in the updated list
    const materialIdsToDelete = existingMaterials.filter(({ dataValues: { id } }) => !materialIdsInPayload.includes(id)).map(({ dataValues: { id } }) => id);
    await courseMaterialRepository.destroyMaterial(materialIdsToDelete);

    /** QUIZZES */
    // Retrieve the list of quizzes from the database
    const existingQuizzes = chapterId ? await courseQuizRepository.getQuizzesByChapterId(chapterId) : [];

    // Delete any quizzes that are not in the updated list
    const quizIdsInPayload = /** @type {string[]} */ (quizzes.map(({ id }) => id));

    // Get the list of quiz ids that are not in the updated list
    const quizIdsToDelete = existingQuizzes.filter(({ dataValues: { id } }) => !quizIdsInPayload.includes(id)).map(({ dataValues: { id } }) => id);
    await courseQuizRepository.destroyQuizzes(quizIdsToDelete);

    const courseChapter = chapterId ? await courseChapterRepository.getChapterById(chapterId) : null;
    if (courseChapter) {
      await courseChapterRepository.updateChapter(chapter, chapterId);

      for (const material of materials) {
        /** @type {{ id: string; contents:any[] }} */
        const { id: materialId, contents } = material;

        // Retrive the list of contents from the database
        const existingContents = materialId ? await courseContentRepository.getContentsByMaterialId(materialId) : [];

        // Delete any contents that are not in the updated list
        const contentIdsInPayload = /** @type {string[]} */ (contents.map(({ id }) => id));

        // Get the list of content ids that are not in the updated list
        const contentIdsToDelete = existingContents.filter(({ dataValues: { id } }) => !contentIdsInPayload.includes(id)).map(({ dataValues: { id } }) => id);

        await courseContentRepository.destroyContents(contentIdsToDelete);

        if (materialId) {
          const courseMaterial = await courseMaterialRepository.getMaterialById(materialId);
          if (courseMaterial) {
            await courseMaterialRepository.updateMaterial(material, materialId);

            for (const content of contents) {
              const { id: contentId } = content;

              if (contentId) {
                const courseContent = await courseContentRepository.getContentById(contentId);

                if (courseContent) {
                  await courseContentRepository.updateCourseContent(content, contentId);
                }
              } else {
                const parsedContentWithMaterialId = {
                  ...content,
                  course_material_id: materialId,
                };

                const newContent = await courseContentRepository.createCourseContent(parsedContentWithMaterialId);
              }
            }
          } else {
            const parsedMaterialWithChapterId = {
              ...material,
              course_chapter_id: chapterId,
            };

            const newMaterial = await courseMaterialRepository.createMaterial(parsedMaterialWithChapterId);

            for (const content of contents) {
              const newContent = await courseContentRepository.createCourseContent({
                ...content,
                course_material_id: newMaterial.dataValues.id,
              });
            }

            await courseMaterialCompletionRepository.backfillCourseMaterialStatus(course_id, newMaterial.dataValues.id);
          }
        }
      }

      for (const quiz of quizzes) {
        /** @type {{ id:string; questions:any[] }} */
        const { id: quizId, questions } = quiz;

        // Retrieve the list of questions from the database
        const existingQuestions = quizId ? await courseQuizQuestionRepository.getQuestionsByQuizId(quizId) : [];

        // Delete any questions that are not in the updated list
        const questionIdsInPayload = /** @type {string[]} */ (questions.map(({ id }) => id));

        // Get the list of question ids that are not in the updated list
        const questionIdsToDelete = existingQuestions.filter(({ dataValues: { id } }) => !questionIdsInPayload.includes(id)).map(({ dataValues: { id } }) => id);
        await courseQuizQuestionRepository.destroyQuestions(questionIdsToDelete);

        if (quizId) {
          const courseQuiz = await courseQuizRepository.getQuizById(quizId);
          if (courseQuiz) {
            await courseQuizRepository.updateQuiz(quiz, quizId);

            for (const question of questions) {
              const { id: questionId } = question;

              if (questionId) {
                const courseQuestion = await courseQuizQuestionRepository.getQuestionById(questionId);

                if (courseQuestion) {
                  await courseQuizQuestionRepository.updateQuizQuestion(question, questionId);
                }
              } else {
                const parsedQuestionWithQuizId = {
                  ...question,
                  quiz_id: quizId,
                };

                const newQuestion = await courseQuizQuestionRepository.createQuizQuestion(parsedQuestionWithQuizId);
              }
            }
          } else {
            const parsedQuizWithChapterId = {
              ...quiz,
              course_chapter_id: chapterId,
            };

            const newQuiz = await courseQuizRepository.createQuiz(parsedQuizWithChapterId);

            for (const question of questions) {
              const newQuestion = await courseQuizQuestionRepository.createQuizQuestion({
                ...question,
                quiz_id: newQuiz.dataValues.id,
              });
            }
          }
        }
      }
    } else {
      const newChapter = await courseChapterRepository.createChapter({ ...chapter, course_id: course_id });

      for (const material of materials) {
        const newMaterial = await courseMaterialRepository.createMaterial({
          ...material,
          course_chapter_id: newChapter.dataValues.id,
        });

        for (const content of material.contents) {
          const newContent = await courseContentRepository.createCourseContent({
            ...content,
            course_material_id: newMaterial.dataValues.id,
          });
        }

        await courseMaterialCompletionRepository.backfillCourseMaterialStatus(course_id, newMaterial.dataValues.id);
      }

      for (const quiz of quizzes) {
        const newQuiz = await courseQuizRepository.createQuiz({
          ...quiz,
          course_chapter_id: newChapter.dataValues.id,
        });

        for (const question of quiz.questions) {
          const newQuestion = await courseQuizQuestionRepository.createQuizQuestion({
            ...question,
            quiz_id: newQuiz.dataValues.id,
          });
        }
      }
    }
  }
}
