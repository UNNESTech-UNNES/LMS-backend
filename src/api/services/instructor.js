import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import { omitPropertiesFromObject } from "../../libs/utils.js";
import * as authService from "./auth.js";
import * as instructorRepository from "../repositories/instructor.js";
import * as Models from "../models/instructor.js";

/** @param {string} id */
export async function getInstructorById(id) {
  try {
    const user = await instructorRepository.getInstructorById(id);

    if (!user) {
      throw new ApplicationError("User not found", 404);
    }
    const userSocialMedia = user.dataValues.social_media;
    if (userSocialMedia) {
      user.dataValues.social_media = JSON.parse(userSocialMedia);
    }
    return user;
  } catch (err) {
    throw generateApplicationError(err, "Error fetching user by id", 500);
  }
}

/** @param {string} email */
export async function getInstructorByEmail(email) {
  try {
    const user = await instructorRepository.getInstructorByEmail(email);

    if (!user) {
      throw new ApplicationError("User not found", 404);
    }

    const userSocialMedia = user.dataValues.social_media;
    if (userSocialMedia) {
      user.dataValues.social_media = JSON.parse(userSocialMedia);
    }
    return user;
  } catch (err) {
    throw generateApplicationError(err, "Error fetching user by email", 500);
  }
}

/** @param {string} nip */
export async function getInstructorByNip(nip) {
  try {
    const user = await instructorRepository.getInstructorByNip(nip);

    if (!user) {
      throw new ApplicationError("User not found", 404);
    }
    const userSocialMedia = user.dataValues.social_media;
    if (userSocialMedia) {
      user.dataValues.social_media = JSON.parse(userSocialMedia);
    }
    return user;
  } catch (err) {
    throw generateApplicationError(err, "Error fetching user by nip", 500);
  }
}

/** @param {string} email */
export async function getUnverifiedIntructorByEmail(email) {
  try {
    const user = await instructorRepository.getUnverifiedIntructorByEmail(email);
    if (!user) {
      throw new ApplicationError("User not found", 404);
    }
    return user;
  } catch (err) {
    throw generateApplicationError(err, "Error fetching user by email", 500);
  }
}

/** @param {Models.InstructorAttributes} payload */
export async function createInstructor(payload) {
  const { email, password } = payload;
  const parsedPayload = omitPropertiesFromObject(payload, ["id", "verified", "password", "created_at", "updated_at"]);

  try {
    // create encrypted password
    const encryptedPassword = await authService.hashPassword(password);

    const parsedUserWithEncryptedPassword = /** @type {Models.InstructorAttributes} */ ({ ...parsedPayload, password: encryptedPassword });
    // check if instructor verified exists
    const verifiedUser = await instructorRepository.getInstructorByEmail(email);
    if (verifiedUser) {
      throw new ApplicationError("User already exists", 409);
    }
    /** @type {Awaited<ReturnType<typeof instructorRepository.createInstructor>>} */
    let user;

    // check if unverified instructor exist with email or phone number
    const unverifiedUser = await instructorRepository.getUnverifiedIntructorByEmail(email);
    if (unverifiedUser) {
      const [, [updatedUser]] = await instructorRepository.updatedInstructor(unverifiedUser.dataValues.id, parsedUserWithEncryptedPassword);
      user = updatedUser;
    } else {
      const newUser = await instructorRepository.createInstructor(parsedUserWithEncryptedPassword);
      user = newUser;
    }

    return user;
  } catch (err) {
    throw generateApplicationError(err, "Error creating user", 500);
  }
}
