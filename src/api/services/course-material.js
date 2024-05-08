import * as courseChapterRepository from "../repositories/course_chapter.js";
import * as courseMaterialRepository from "../repositories/course_material.js";
import * as courseMaterialCompletionRepository from "../repositories/course_material_completion.js";
import * as courseContentRepository from "../repositories/course_content.js";

/**
 * @param {any[]} parsedCourseChapters
 * @param {string} course_id
 */
export async function updateChapter(parsedCourseChapters, course_id) {
  for (const chapter of parsedCourseChapters) {
    /** @type {{ id:string; materials:any[] }} */
    const { id: chapterId, materials } = chapter;

    // Retrieve the list of materials from the database
    const existingMaterials = chapterId ? await courseMaterialRepository.getMaterialsByChapterId(chapterId) : [];

    // Delete any materials that are not in the updated list
    const materialIdsInPayload = /** @type {string[]} */ (materials.map(({ id }) => id));

    // Get the list of material ids that are not in the updated list
    const materialIdsToDelete = existingMaterials.filter(({ dataValues: { id } }) => !materialIdsInPayload.includes(id)).map(({ dataValues: { id } }) => id);

    await courseMaterialRepository.destroyMaterial(materialIdsToDelete);

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
    }
  }
}
