import { ApplicationError } from "../../libs/error.js";
import * as courseMaterialCompletionService from "../services/course-material-completion.js";
import * as Types from "../../libs/types/common.js";

/**
 * @type {Types.AuthorizedController}
 */
export async function updateCourseMaterialCompletion(req, res) {
  const { id } = req.params;
  const { percentage } = req.body;

  try {
    const courseMaterialCompletion = await courseMaterialCompletionService.updateCourseMaterialStatus(id, percentage);

    res.status(200).json({
      message: "Course material has been completed successfully",
      data: courseMaterialCompletion,
    });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
}
