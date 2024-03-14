import { ApplicationError } from "../../libs/error.js";
import * as Types from "../../libs/types/common.js";
import * as userService from "../services/user.js";

/**
 * @type {Types.Controller}
 * @returns {void}
 */

export async function register(req, res) {
  const body = req.body;

  try {
    const data = await userService.createUser(body);

    res.status(201).json({ message: "User created", data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
