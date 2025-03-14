import express from "express";
import "express-async-errors";
import { logger, handleRejection } from "./startup/logger";
import routes from "./startup/routes";
import { enableCors } from "./startup/cors";

const app = express();
const env = process.env.NODE_ENV;

handleRejection(); //it handles unhandled rejected promise outside the route scope
enableCors(app); //enable cors for local env when it's in development, disable in production
routes(app); //set up all the routes

const port = 3000;

env !== "test"
  ? app.listen(port, () => logger.info(`Listening on port 3000...`))
  : logger.info(`not listening to any port (test env)`); //may dynamically assign ports when testing api

// // Export the app as the default export
export default app;
