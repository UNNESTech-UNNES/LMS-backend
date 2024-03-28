import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Model } from "sequelize";
import { JWT_SECRET } from "../../libs/env.js";
import * as userService from "../services/user.js";
import * as userRepository from "../repositories/user.js";
import * as instructorRepository from "../repositories/instructor.js";
import * as otpRepository from "../repositories/otp.js";
import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import * as UserModel from "../models/user.js";
import { sequelize } from "../models/index.js";
import { generateRandomToken, generateRandomOTP } from "../../libs/utils.js";

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

/**
 * @param {string} email
 * @param {string} userId
 */
export async function sendOtpRequest(email, userId) {
  try {
    await sequelize.transaction(async (transaction) => {
      await otpRepository.setUsedTrueByUserId(userId, transaction);

      const nextFiveMinutesDate = new Date();

      nextFiveMinutesDate.setMinutes(nextFiveMinutesDate.getMinutes() + 5);

      const payload = {
        otp: generateRandomOTP(),
        used: false,
        user_id: userId,
        expired_at: nextFiveMinutesDate,
      };

      const otpData = await otpRepository.setOtpVerification(payload, transaction);

      // send otp to email
    });
  } catch (err) {
    throw generateApplicationError(err, "Error while sending OTP", 500);
  }
}

/** @param {any} payload */
export async function verifyOtp(payload) {
  const { otp, email } = payload;
  try {
    const verifyOtpData = await otpRepository.getDataOtpVerificationByOtp(otp, email);

    if (!verifyOtpData) {
      throw new ApplicationError("OTP not found", 404);
    }

    const userId = verifyOtpData.dataValues.user_id;

    await sequelize.transaction(async (transaction) => {
      await otpRepository.updateUsedOtpVerification(otp, userId, transaction);
      (await userRepository.updatedUser(userId, { verified: true }, transaction)) || (await instructorRepository.updatedInstructor(userId, { verified: true }, transaction));

      // Notification
    });
  } catch (err) {
    throw generateApplicationError(err, "Error while verifying OTP", 500);
  }
}
