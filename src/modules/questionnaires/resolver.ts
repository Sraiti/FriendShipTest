import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Questionnaire, QuestionnaireInstance } from "./model";
import mongoose from "mongoose";
import ApiError from "../../core/apiError";
import { log } from "console";

@Resolver(Questionnaire)
export class QuestionnaireResolver {
  @Query((returns) => Questionnaire)
  async questionnaire(
    @Arg("id") id: string,
  ): Promise<ApiError | Questionnaire> {
    log("reached", { id });
    const questionnaire = await QuestionnaireInstance.searchById(
      new mongoose.Types.ObjectId(id),
      {},
    );

    log({ questionnaire });
    if (questionnaire === null) {
      throw new ApiError(404, "Not Found");
    }

    return questionnaire;
  }
}
