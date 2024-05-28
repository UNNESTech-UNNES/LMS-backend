import * as userCourseService from "../services/user-course.js";
import { ApplicationError } from "../../libs/error.js";
import * as Types from "../../libs/types/common.js";

/**
 * @type {Types.AuthorizedController}
 * @returns {Promise<void>}
 */
export async function setOnboardedTrue(req, res) {
  try {
    const { id } = req.params;
    const updatedUserCourse = await userCourseService.setOnboardedTrue(id);
    res.status(200).json({ message: "User course onboarded status updated", updatedUserCourse });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}
