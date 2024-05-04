import * as Types from "../../libs/types/common.js";
import * as contentService from "../services/course-content.js";
import { isLoggedIn } from "../middlewares/auth.js";
import { ApplicationError } from "../../libs/error.js";

/**
 * @type {Types.Controller<typeof isLoggedIn>}
 * @returns {Promise<void>}
 */
export async function getContents(req, res) {
  try {
    const { materialId } = req.params;
    const contents = await contentService.getContentsByMaterialId(materialId);
    res.status(200).json(contents);
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
