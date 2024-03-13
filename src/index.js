import express, { json } from "express";
import cors from "cors";
import { HOST_PORT } from "./libs/env.js";
import root from "./api/routes/index.js";

function main() {
  const app = express();
  app.use(cors(), json());

  root(app);
  app.listen(HOST_PORT, () => {
    console.info(`Server started on port ${HOST_PORT}`);
  });
}

main();
