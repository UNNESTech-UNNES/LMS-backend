import Sequelize, { Op } from "sequelize";
import { User } from "../models/index.js";
import * as Models from "../models/user.js";

/** @param {string} id */
export function getUserById(id) {
  return User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
}

/** @param {string} email */
export function getUserByEmail(email) {
  return User.findOne({
    where: {
      email,
      verified: true,
    },
  });
}

/**
 * @param {string} email
 * @param {string} role
 */
export function getUserByEmailAndRole(email, role) {
  return User.findOne({
    where: {
      email,
      role,
      verified: true,
    },
  });
}

/** @param {string} email */
export function getUnverifiedUserByEmail(email) {
  return User.findOne({
    where: { email, verified: false },
  });
}

/** @param {Models.UserAttributes} payload */
export function createUser(payload) {
  return User.create(payload);
}

/**
 * @param {string} id
 * @param {Partial<Models.UserAttributes>} payload
 * @param {Sequelize.Transaction} [transaction]
 */
export function updatedUser(id, payload, transaction) {
  return User.update(payload, {
    where: { id },
    returning: true,
    transaction,
  });
}

/** @param {string} id */
export function deleteUser(id) {
  return User.destroy({ where: { id } });
}
