import { ApplicationError } from "../../libs/error.js";
import * as Types from "../../libs/types/common.js";
import * as userService from "../services/user.js";
import * as authService from "../services/auth.js";
import * as instructorService from "../services/instructor.js";
import * as Models from "../models/user.js";
import * as instructorModels from "../models/instructor.js";

/**
 * Authentication for User
 */

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

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    const isMatch = await authService.isPasswordMatch(password, user.dataValues.password);

    if (!isMatch) {
      res.status(401).json({ message: "Password is not match" });
      return;
    }

    const token = await authService.generateToken(user.dataValues.id);

    /** @type {Models.UserAttributes & {token: string}} */
    const userWithToken = { ...user.dataValues, token };

    res.status(200).json({ message: "Login success", data: userWithToken });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Authentication for Instructor
 */

/**
 * @type {Types.Controller}
 * @returns {void}
 */
export async function registerInstructor(req, res) {
  const body = req.body;

  try {
    const data = await instructorService.createInstructor(body);
    res.status(201).json({ message: "Instructor created", data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function loginAsInstructor(req, res) {
  try {
    const { email, nip, password } = req.body;
    const instructor = email ? await instructorService.getInstructorByEmail(email) : await instructorService.getInstructorByNip(nip);

    const isMatch = await authService.isPasswordMatch(password, instructor.dataValues.password);

    if (!isMatch) {
      res.status(401).json({ message: "Password is not match" });
      return;
    }

    const token = await authService.generateToken(instructor.dataValues.id);

    /** @type {instructorModels.InstructorAttributes & {token:string}} */
    const instructorWithToken = { ...instructor.dataValues, token };

    res.status(200).json({ message: "Login success", data: instructorWithToken });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
