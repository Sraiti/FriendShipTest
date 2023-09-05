import express, { RequestHandler } from "express";
import { QuestionnaireInstance } from "./model";

const questionnairesRouter = express.Router();

questionnairesRouter.post("/register", (async (req, res, next) => {
  try {
    const payload = req.body;

    const result = await QuestionnaireInstance.save(payload);

    res.json({ result });
  } catch (e: any) {
    if (e.name === "MongoError") return res.status(400).send(e);
    next(e);
  }
}) as RequestHandler);

export default questionnairesRouter;
