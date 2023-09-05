import { Ref, getModelForClass } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import { Model } from "mongoose";
import { ModelFunction } from "../../core/baseModelFunction";
import { userType } from "../../enums/auth";
import { Field } from "type-graphql";
import { Questionnaire } from "../questionnaires/model";
// import { Questionnaire } from "../questionnaires/model";

export class User {
  //@Field()
  @prop({ required: true })
  name!: string;
  // @Field()
  @prop({ required: true })
  email!: string;
  @prop({ required: true })
  hashPassword!: string;
  @prop({ required: true })
  salt!: string;
  // @Field()
  @prop({ required: true, default: userType.user })
  role!: userType;

  //@Field(() => [Questionnaire])
  @prop({ ref: () => "Questionnaire" })
  questionnaires?: Ref<Questionnaire>[];
}

const schema = getModelForClass(User);
class schemaModelFunction extends ModelFunction<User> {
  constructor(schema: any) {
    super(schema);
  }
}
export const userInstance = new schemaModelFunction(schema);
