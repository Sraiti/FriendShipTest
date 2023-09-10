import { Field, InputType } from "type-graphql";
import { Question, QuestionnaireStatus, Visibility } from "./types";

@InputType()
export class questionnaireInputType {
  @Field()
  title?: string;
  @Field({ nullable: true, defaultValue: "" })
  description?: string;

  // @Field({})
  // status?: QuestionnaireStatus;

  // @Field()
  // tags?: string[];

  // @Field()
  // startTime?: Date;

  // @Field()
  // endTime?: Date;

  // @Field()
  // timeLimit?: number;

  // @Field({})
  // visibility?: Visibility;

  // @Field({})
  // questions!: Question[];

  // @Field({})
  // respondents?: string[];

  // @Field()
  // totalAttempts?: number;

  // @Field()
  // averageScore?: number;

  // @Field()
  // highestScore?: number;

  // @Field()
  // version?: number;
}
