import { Express } from "express";
import cors from "cors";

export const enableCors = function (app: Express) {
  if (process.env.NODE_ENV == "development") {
    const corsOptions = {
      origin: "http://localhost:5173",
      methods: "GET,PUT,POST,DELETE",
    };
    app.use(cors(corsOptions));
  }
};
