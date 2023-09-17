import { Ref, getModelForClass } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import { ModelFunction } from "../../core/baseModelFunction";
import { Field, ObjectType } from "type-graphql";
import { User } from "../user/model";
import { QuestionnaireStatus, Visibility } from "./types";
import { uuid } from "uuidv4";

@ObjectType()
export class Question {
  @prop({ default: uuid(), type: String })
  @Field((type) => String, { nullable: false })
  id?: string;
  @prop()
  @Field((type) => String, { nullable: true })
  questionText?: string;
  @prop()
  @Field((type) => [String], { nullable: true })
  options?: string[];
  @prop()
  @Field((type) => Number, { nullable: true })
  correctOption?: number;
}

@ObjectType()
export class Questionnaire {
  @prop({
    ref: () => "User",
  })
  creatorId!: Ref<User>;

  @prop()
  @Field()
  title!: string;

  @prop()
  @Field((type) => String, { nullable: true })
  description?: string;

  @Field()
  @prop({ enum: QuestionnaireStatus, default: QuestionnaireStatus.DRAFT })
  status?: QuestionnaireStatus;

  @Field((type) => [String], { nullable: true })
  @prop()
  tags?: string[];

  @prop()
  startTime?: Date;

  @prop()
  endTime?: Date;

  @prop()
  timeLimit?: number;

  @Field()
  @prop({ enum: Visibility, default: Visibility.PUBLIC })
  visibility?: Visibility;

  @Field((type) => [Question], { nullable: true })
  @prop({ type: Question, default: [] })
  questions!: Question[];

  @Field((type) => [String], { nullable: true })
  @prop({})
  respondents?: string[];

  @Field((type) => Number, { nullable: true })
  @prop()
  totalAttempts?: number;

  @Field((type) => Number, { nullable: true })
  @prop()
  averageScore?: number;

  @Field((type) => Number, { nullable: true })
  @prop()
  highestScore?: number;

  @Field((type) => Number, { nullable: true })
  @prop()
  version?: number;
}

const schema = getModelForClass(Questionnaire, {
  schemaOptions: { timestamps: true },
});
class schemaModelFunction extends ModelFunction<Questionnaire> {
  constructor(schema: any) {
    super(schema);
  }
}
export const QuestionnaireInstance = new schemaModelFunction(schema);
