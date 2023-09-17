import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Questionnaire, QuestionnaireInstance } from "./model";
import mongoose from "mongoose";
import ApiError from "../../core/apiError";
import { log } from "console";
import { questionnaireInputType } from "./inputType";
import { UserContext } from "../../globalTypes/graphQlCtx";

@Resolver((of) => Questionnaire)
export class QuestionnaireResolver {
  @Query((returns) => Questionnaire)
  async getQuestionnaire(
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

  @Mutation((returns) => Questionnaire)
  async createQuestionnaire(
    @Arg("data") data: questionnaireInputType,
    @Ctx() ctx: UserContext,
  ): Promise<boolean | ApiError> {
    try {
      const questionnaire = await QuestionnaireInstance.save(data);
      return true;
    } catch (error: any) {
      throw new ApiError(404, error.message, true);
    }
  }
}
