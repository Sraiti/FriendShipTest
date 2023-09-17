import { Field, InputType } from "type-graphql";
import { QuestionnaireStatus, Visibility } from "./types";
import { Question } from "./model";
import { type } from "os";

@InputType()
export class questionnaireInputType {
  @Field()
  title?: string;
  @Field({ nullable: true, defaultValue: "" })
  description?: string;

  @Field({})
  status?: QuestionnaireStatus;

  @Field((type) => [String])
  tags?: string[];

  @Field()
  startTime?: Date;

  @Field()
  endTime?: Date;

  @Field()
  timeLimit?: number;

  @Field({})
  visibility?: Visibility;

  @Field((type) => [Question])
  questions!: Question[];

  @Field((type) => [String])
  respondents?: string[];

  // @Field()
  // totalAttempts?: number;

  // @Field()
  // averageScore?: number;

  // @Field()
  // highestScore?: number;

  // @Field()
  // version?: number;
}
