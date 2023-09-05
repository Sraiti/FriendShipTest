import { Application } from "express";
import userRouter from "./modules/user/controller";
import questionnairesRouter from "./modules/questionnaires/controller";

export const setRoutes = (app: Application) => {
  app.use("/user", userRouter);
  app.use("/questionnaire", questionnairesRouter);
};
