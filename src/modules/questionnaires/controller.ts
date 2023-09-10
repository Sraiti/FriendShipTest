import express, { RequestHandler } from "express";
import { QuestionnaireInstance } from "./model";
import mongoose from "mongoose";

const questionnairesRouter = express.Router();

questionnairesRouter.post("/save", (async (req, res, next) => {
  try {
    const result = await QuestionnaireInstance.save({
      creatorId: new mongoose.Types.ObjectId("64f65bdd5726dc34ef48a69e"),
      title: "test",
      questions: [
        {
          questionText: "text",
          options: ["1", "2", "3", "4"],
          correctOption: 3,
        },
      ],
    });

    res.json({ result });
  } catch (e: any) {
    if (e.name === "MongoError") return res.status(400).send(e);
    next(e);
  }
}) as RequestHandler);

export default questionnairesRouter;
