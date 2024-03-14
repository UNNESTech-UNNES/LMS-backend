import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Model } from "sequelize";
import { JWT_SECRET } from "../../libs/env.js";
import * as userService from "../services/user.js";
import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import * as UserModel from "../models/user.js";
import { sequelize } from "../models/index.js";
import { generateRandomToken } from "../../libs/utils.js";

/**
 * Generate hash password with bcrypt
 *
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password, salt = 10) {
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw generateApplicationError(error, "Error hashing password", 500);
  }
}

/**
 * Compare password with hashed password
 *
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export async function isPasswordMatch(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw generateApplicationError(error, "Error comparing password", 500);
  }
}

/**
 * Generate JWT token
 *
 * @param {string} id
 * @returns {Promise<string>}
 */
export async function generateToken(id) {
  try {
    const token = await jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
    return token;
  } catch (error) {
    throw generateApplicationError(error, "Error generating token", 500);
  }
}

/**
 * Verify token with JWT
 *
 * @param {string} token
 * @returns {Promise<Model<UserModel.UserAttributes>>}
 */
export async function verifyToken(token) {
  try {
    const { id } = /** @type {jwt.JwtPayload} */ (await jwt.verify(token, JWT_SECRET));

    const user = await userService.getUserById(id);
    return user;
  } catch (error) {
    throw generateApplicationError(error, "Error verifying token", 500);
  }
}
