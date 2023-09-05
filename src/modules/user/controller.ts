import express from "express";
import { RequestHandler } from "express";
import UserEntity from "./userEntity";
import ApiError from "../../core/apiError";
const userRouter = express.Router();

userRouter.post("/login", (async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = new UserEntity(email, password);

    const { msg, status, reason } = await user.login();
    console.log({ msg, status, reason });
    if (!status) throw new ApiError(400, reason || msg);

    res.status(200).json(user.toAuthToken());
  } catch (e) {
    next(e);
  }
}) as RequestHandler);

userRouter.post("/register", (async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const user = new UserEntity(email, password, userName);

    const { reason, status, msg } = await user.validate();
    console.log({ reason, status });

    if (!status) throw new ApiError(400, reason || msg);

    await user.register();

    console.log(user);

    res.json(user.toAuthToken());
  } catch (e: any) {
    if (e.name === "MongoError") return res.status(400).send(e);
    next(e);
  }
}) as RequestHandler);

export default userRouter;
