import Sequelize from "sequelize";
import { Instructor } from "../models/index.js";
import * as Models from "../models/instructor.js";

/** @param {string} id */
export function getInstructorById(id) {
  return Instructor.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
}

/** @param {string} email */
export function getInstructorByEmail(email) {
  return Instructor.findOne({
    where: {
      email,
      verified: true,
    },
  });
}

/** @param {string} nip */
export function getInstructorByNip(nip) {
  return Instructor.findOne({
    where: {
      nip,
      verified: true,
    },
  });
}

/** @param {string} email */
export function getUnverifiedIntructorByEmail(email) {
  return Instructor.findOne({
    where: { email, verified: false },
  });
}

/** @param {Models.InstructorAttributes} payload */
export function createInstructor(payload) {
  return Instructor.create(payload);
}

/**
 * @param {string} id
 * @param {Partial<Models.InstructorAttributes>} payload
 * @param {Sequelize.Transaction} [transaction]
 */
export function updatedInstructor(id, payload, transaction) {
  return Instructor.update(payload, {
    where: { id },
    returning: true,
    transaction,
  });
}

/** @param {string} id */
export function deleteInstructor(id) {
  return Instructor.destroy({ where: { id } });
}
