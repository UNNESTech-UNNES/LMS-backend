import { Op } from "sequelize";
import { CourseCategory } from "../api/models/index.js";
import * as Types from "./types/common.js";
import * as CourseModel from "../api/models/course.js";

/**
 * @param {Types.RequestQuery} params
 * @returns {Promise<Types.WhereOptions<CourseModel.CourseAttributes> | null>}
 */
export async function getCourseFilterQuery(params) {
  /**
   * @type {Partial<{
   *  type: string;
   *  search: string;
   *  filter: string;
   *  category: string;
   * }>}
   */
  const { type, filter, category, search } = params;

  const hasFilter = type || filter || category || search;

  if (!hasFilter) return null;

  /**
   * @type {Partial<{
   *  type: string;
   *  search: string;
   *  filter: string[];
   *  category: string[];
   * }>}
   */
  const queryFilters = {};

  if (type) {
    queryFilters.type = type.trim();
  }

  if (search) {
    queryFilters.search = search.trim();
  }

  if (category) {
    queryFilters.category = category.split(",").flatMap((cat) => {
      const category = cat.trim();
      return category ? category : [];
    });
  }

  /** @type {Types.WhereOptions<CourseModel.CourseAttributes>} */
  const whereClause = {};

  if (queryFilters.type) {
    if (queryFilters.type === "free") whereClause.premium = false;
    else if (queryFilters.type === "premium") whereClause.premium = true;
  }

  if (queryFilters.search) {
    whereClause.name = {
      [Op.iLike]: `%${queryFilters.search}%`,
    };
  }

  if (queryFilters.category?.length) {
    const categories = await CourseCategory.findAll({
      where: { name: queryFilters.category },
      attributes: ["id"],
    });

    const categoryIds = categories.map(({ dataValues: { id } }) => id);
    whereClause.$course_category_id$ = categoryIds;
  }

  return whereClause;
}
