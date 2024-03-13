import { ValidationError, UniqueConstraintError } from "sequelize";

export class ApplicationError extends Error {
  /**
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Generate application error
 *
 * @param {unknown} err
 * @param {string} message
 * @param {number} statusCode
 * @returns {ApplicationError}
 */
export function generateApplicationError(err, message, statusCode) {
  const assertedError = /**@type {ApplicationError} */ (err);

  const { message: errorMessage, statusCode: errorStatusCode } = assertedError;

  const isValidatorError = [ValidationError, UniqueConstraintError].some((error) => err instanceof error);

  const parsedErrorMessage = errorMessage || "Internal server error";

  const parsedStatusCode = isValidatorError ? 400 : errorStatusCode || statusCode;

  return new ApplicationError(`${message}: ${parsedErrorMessage}`, parsedStatusCode);
}
