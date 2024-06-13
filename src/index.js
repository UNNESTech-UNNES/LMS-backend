import express, { json } from "express";
import cors from "cors";
import { HOST_PORT } from "./libs/env.js";
import root from "./api/routes/index.js";
import auth from "./api/routes/auth.js";
import manageUser from "./api/routes/manage-user.js";
import instructor from "./api/routes/instructor.js";
import course from "./api/routes/courses.js";
import content from "./api/routes/content.js";
import quiz from "./api/routes/quiz.js";
import classes from "./api/routes/class.js";
import usercourse from "./api/routes/user-courses.js";
import courseCategories from "./api/routes/course-categories.js";
import courseMaterialCompletion from "./api/routes/course-material-completion.js";

function main() {
  const app = express();
  app.use(cors(), json());

  root(app);
  auth(app);
  course(app);
  content(app);
  quiz(app);
  classes(app);
  usercourse(app);
  courseCategories(app);
  courseMaterialCompletion(app);
  manageUser(app);
  instructor(app);

  app.listen(HOST_PORT, () => {
    console.info(`Server started on port ${HOST_PORT}`);
  });
}

main();
