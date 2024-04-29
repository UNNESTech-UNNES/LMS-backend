import { ApplicationError } from "../../libs/error.js";
import { isAdmin, isAuthorized } from "./auth.js";
import * as Types from "../../libs/types/common.js";
import * as CourseModel from "../models/course.js";
import * as courseService from "../services/course.js";
import * as UserModel from "../models/user.js";
import * as userService from "../services/user.js";

/**
 * Check if valid credentials.
 * @type {Types.Middleware}
 * @returns {void}
 */
export function isValidCredential(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ message: "Email and password must be string" });
    return;
  }

  next();
}

/**
 * Check if valid email
 * @type {Types.Middleware}
 * @returns {void}
 */
export function isValidEmail(req, res, next) {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  if (typeof email !== "string") {
    res.status(400).json({ message: "Email must be string" });
    return;
  }

  next();
}

/**
 * Check if valid credentials
 * @type {Types.Middleware}
 * @returns {void}
 */
export function isValidResetPasswordPayload(req, res, next) {
  const { token, password } = req.body;

  if (!token || !password) {
    res.status(400).json({ message: "Token and password are required" });
    return;
  }

  if (typeof token !== "string" || typeof password !== "string") {
    res.status(400).json({ message: "Token and password must be string" });
    return;
  }

  next();
}

/**
 * Check if valid credentials
 * @type {Types.Middleware}
 * @returns {void}
 */
export function isValidVerifyOtpPayload(req, res, next) {
  const { otp, email } = req.body;

  if (!otp || !email) {
    res.status(400).json({ message: "OTP and email are required" });
    return;
  }

  if (typeof otp !== "string" || typeof email !== "string") {
    res.status(400).json({ message: "OTP and email must be string" });
    return;
  }

  next();
}

/**
 * Check if valid credentials
 * @type {Types.Middleware<Types.ExtractLocalsMiddleware<typeof isValidEmail> & {user: UserModel.UserAttributes}>}
 * @returns {Promise<void>}
 */
export async function isUnverifiedUserExists(req, res, next) {
  const { email } = req.body;

  try {
    const user = await userService.getUnverifiedUserByEmail(email);
    res.locals.user = user.dataValues;
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  next();
}
