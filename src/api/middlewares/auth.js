import { ApplicationError } from "../../libs/error.js";
import * as authService from "../services/auth.js";
import * as Models from "../models/user.js";
import * as Types from "../../libs/types/common.js";

/**
 * Check if user is authorized.
 * @type {Types.Middleware<{user: Models.UserAttributes}>}
 * @returns {Promise<void>}
 */
export async function isAuthorized(req, res, next) {
  const authorization = req.get("authorization");

  if (!authorization) {
    res.status(400).json({ message: "Missing authorization header" });
    return;
  }

  const [type, token] = authorization.split(" ");

  if (type.toLowerCase() !== "bearer") {
    res.status(401).json({ message: "Invalid authorization token" });
    return;
  }

  try {
    const user = await authService.verifyToken(token);
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

/**
 * Check if user is admin.
 *
 * @type {Types.Middleware<
 *   Types.ExtractLocalsMiddleware<typeof isAuthorized> & {
 *     role: Models.UserAttributes["role"];
 *   }
 * >}
 * @returns {void}
 */
export function isAdmin(_req, res, next) {
  const { role } = /** @type {Models.UserAttributes} */ (res.locals.user);

  if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "INSTRUCTOR") {
    res.status(403).json({ message: "Only admin is allowed for this endpoint" });
    return;
  }

  res.locals.role = role;

  next();
}

/**
 * Check if user is logged in when access course content.
 *
 * @type {Types.Middleware<{ user: Models.UserAttributes | null }>}
 * @returns {Promise<void>}
 */
export async function isLoggedIn(req, res, next) {
  const authorization = req.get("authorization");

  if (!authorization) {
    res.locals.user = null;
    return next();
  }

  const [type, token] = authorization.split(" ");

  if (type.toLocaleLowerCase() !== "bearer") {
    res.status(401).json({ message: "Invalid authorization token" });
    return;
  }

  try {
    const user = await authService.verifyToken(token);
    res.locals.user = user.dataValues;
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }

  next();
}
