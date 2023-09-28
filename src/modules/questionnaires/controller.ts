import express, { RequestHandler } from "express";
import { QuestionnaireInstance } from "./model";
import mongoose from "mongoose";

const questionnairesRouter = express.Router();

export default questionnairesRouter;
