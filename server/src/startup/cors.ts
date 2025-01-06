import { Express } from "express";
import cors from "cors";

export const enableCors = function (app: Express) {
  // if (process.env.NODE_ENV == "development") {
  //   console.log(process.env.NODE_ENV);
  // Set up CORS with custom options
  const corsOptions = {
    origin:
      process.env.NODE_ENV == "development"
        ? "http://localhost:5173"
        : "https://cursor-frames-client.vercel.app",
    // Allow requests from this origin
    methods: "GET,PUT,POST,DELETE", // Allow these HTTP methods
  };
  app.use(cors(corsOptions));
  // }
};
