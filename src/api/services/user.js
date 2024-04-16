import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import { omitPropertiesFromObject } from "../../libs/utils.js";
import * as userRepository from "../repositories/user.js";
import * as authService from "./auth.js";
import * as Models from "../models/user.js";

/** @param {string} id */
export async function getUserById(id) {
  try {
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new ApplicationError("User not found", 404);
    }
    return user;
  } catch (error) {
    throw generateApplicationError(error, "Error fetching user by id", 500);
  }
}

/** @param {string} email */
export async function getUserByEmail(email) {
  try {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new ApplicationError("User not found", 404);
    }
    return user;
  } catch (error) {
    throw generateApplicationError(error, "Error fetching user by email", 500);
  }
}

/** @param {string} email */
export async function getUnverifiedUserByEmail(email) {
  try {
    const user = await userRepository.getUnverifiedUserByEmail(email);
    if (!user) {
      throw new ApplicationError("User not found", 404);
    }
    return user;
  } catch (error) {
    throw generateApplicationError(error, "Error fetching user by email", 500);
  }
}

/** @param {Models.UserAttributes} payload */
export async function createUser(payload) {
  const { email, password } = payload;
  console.log(payload);

  const parsedPayload = omitPropertiesFromObject(payload, ["id", "verified", "password", "created_at", "updated_at"]);
  try {
    // create encrypted password
    const encryptedPassword = await authService.hashPassword(password);

    const parsedUserWithEncryptedPassword = /** @type {Models.UserAttributes} */ ({ ...parsedPayload, password: encryptedPassword });
    // check if user verified exists
    const verifiedUser = await userRepository.getUserByEmail(email);
    if (verifiedUser) {
      throw new ApplicationError("User already exists", 400);
    }
    /** @type {Awaited<ReturnType<typeof userRepository.createUser>>} */
    let user;

    // check if unverified user exist with email
    const unverifiedUser = await userRepository.getUnverifiedUserByEmail(email);

    if (unverifiedUser) {
      const [, [updatedUser]] = await userRepository.updatedUser(unverifiedUser.dataValues.id, parsedUserWithEncryptedPassword);

      user = updatedUser;
    } else {
      const newUser = await userRepository.createUser(parsedUserWithEncryptedPassword);
      user = newUser;
    }
    return user;
  } catch (error) {
    throw generateApplicationError(error, "Error creating user", 500);
  }
}
