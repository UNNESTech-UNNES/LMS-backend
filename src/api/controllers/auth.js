import { ApplicationError } from "../../libs/error.js";
import * as Types from "../../libs/types/common.js";
import * as userService from "../services/user.js";
import * as authService from "../services/auth.js";
import * as Models from "../models/user.js";

/**
 * Registration
 */

/**
 * Register new user
 * @type {Types.Controller}
 * @returns {void}
 */
export async function register(req, res) {
  const body = req.body;
  const payload = { ...body, role: "USER" };

  try {
    const data = await userService.createUser(payload);

    res.status(201).json({ message: "User registered", data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Register new student
 * @type {Types.Controller}
 * @returns {void}
 */
export async function registerStudent(req, res) {
  const body = req.body;
  const payload = { ...body, role: "STUDENT" };

  try {
    const data = await userService.createUser(payload);
    res.status(201).json({ message: "Student registered", data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Register new instructor
 * @type {Types.Controller}
 * @returns {void}
 */
export async function registerInstructor(req, res) {
  const body = req.body;
  const payload = { ...body, role: "INSTRUCTOR" };

  try {
    const data = await userService.createUser(payload);
    res.status(201).json({ message: "Instructor registered", data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Register new admin
 * @type {Types.Controller}
 * @returns {void}
 */
export async function registerAdmin(req, res) {
  const body = req.body;
  const payload = { ...body, role: "ADMIN" };

  try {
    const data = await userService.createUser(payload);
    res.status(201).json({ message: "Admin registered", data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    const isMatch = await authService.isPasswordMatch(password, user.dataValues.password);

    if (!isMatch) {
      res.status(401).json({ message: "Password is not match" });
      return;
    }

    const token = await authService.generateToken(user.dataValues.id);

    /** @type {Models.UserAttributes & {token: string}} */
    const userWithToken = { ...user.dataValues, token };

    res.status(200).json({ message: "Login success", data: userWithToken });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

// /**
//  * @type {Types.Controller}
//  * @returns {Promise<void>}
//  */
// export async function loginAsInstructor(req, res) {
//   try {
//     const { email, nip, password } = req.body;
//     const instructor = email ? await instructorService.getInstructorByEmail(email) : await instructorService.getInstructorByNip(nip);

//     const isMatch = await authService.isPasswordMatch(password, instructor.dataValues.password);

//     if (!isMatch) {
//       res.status(401).json({ message: "Password is not match" });
//       return;
//     }

//     const token = await authService.generateToken(instructor.dataValues.id);

//     /** @type {instructorModels.InstructorAttributes & {token:string}} */
//     const instructorWithToken = { ...instructor.dataValues, token };

//     res.status(200).json({ message: "Login success", data: instructorWithToken });
//   } catch (err) {
//     if (err instanceof ApplicationError) {
//       res.status(err.statusCode).json({ message: err.message });
//       return;
//     }
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

/**
 * OTP Verification
 */

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function sendOtpRequest(req, res) {
  const { email, id: userId } = req.body;
  // const { id: userId } = res.locals.user;

  try {
    await authService.sendOtpRequest(email, userId);
    res.status(201).json({ message: "OTP sent successfully" });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function verifyOtp(req, res) {
  try {
    const payload = req.body;
    await authService.verifyOtp(payload);
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function sendVerifyToResetPassword(req, res) {
  const { email } = req.body;

  try {
    await authService.sendVerifyToResetPassword(email);

    res.status(201).json({ message: "Account verification sent successfully" });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function checkLinkToResetPassword(req, res) {
  const { token } = req.params;

  try {
    await authService.checkLinkToResetPassword(token);

    res.status(200).json({ message: "Verification is valid" });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function changePassword(req, res) {
  const payload = req.body;

  try {
    await authService.changePassword(payload);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
