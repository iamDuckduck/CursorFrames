import { Express } from "express";
import bodyParser from "body-parser";
import error from "../middleware/error";
import { router as toFrames } from "../router/toFrames";

export default function (app: Express) {
  app.use(bodyParser.json());
  app.use("/api/toFrames", toFrames);
  app.use(error);
}
