import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import { omitPropertiesFromObject } from "../../libs/utils.js";
import * as userRepository from "../repositories/user.js";
import * as authService from "./auth.js";
import * as Models from "../models/user.js";

export async function getAllUsers() {
  try {
    const users = await userRepository.getAllUsers();
    if (users.length === 0) throw new ApplicationError("No user found", 404);
    return users;
  } catch (error) {
    throw generateApplicationError(error, "Error fetching all users", 500);
  }
}

export async function getAllInstructor() {
  try {
    const instructors = await userRepository.getAllInstructors();
    if (instructors.length === 0) throw new ApplicationError("No instructor found", 404);
    return instructors;
  } catch (error) {
    throw generateApplicationError(error, "Error fetching all instructors", 500);
  }
}

export async function getAllStudentsAndInstructor() {
  try {
    const users = await userRepository.getAllStudentsAndInstructor();
    return users;
  } catch (error) {
    throw generateApplicationError(error, "Error fetching all students", 500);
  }
}

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

/** @param {string} id */
export async function deleteUser(id) {
  try {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new ApplicationError("User not found", 404);
    }
    await userRepository.deleteUser(id);
  } catch (error) {
    throw generateApplicationError(error, "Error deleting user", 500);
  }
}

/** @param {string} id */
export async function deactiveUser(id) {
  try {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new ApplicationError("User not found", 404);
    }
    if (user.dataValues.verified === false) {
      throw new ApplicationError("User already deactivated", 400);
    }
    await userRepository.updatedUser(id, { verified: false });
  } catch (error) {
    throw generateApplicationError(error, "Error deactivating user", 500);
  }
}
