import { Field, InputType, registerEnumType } from "type-graphql";
import { QuestionnaireStatus, Visibility } from "./types";
import { Question, Questionnaire } from "./model";

registerEnumType(Visibility, {
  name: "Visibility", // Mandatory
  description: "Visibility of the Questionnaire Public | Private |RESTRICTED", // Optional
});

registerEnumType(QuestionnaireStatus, {
  name: "QuestionnaireStatus", // Mandatory
  description: "Draft or ARCHIVED or Published ", // Optional
});

@InputType()
export class QuestionInputType {
  @Field((type) => String, { nullable: false })
  questionText!: string;
  @Field((type) => [String], { nullable: false })
  options!: string[];
  @Field((type) => Number, { nullable: false })
  correctOption!: number;
}

@InputType()
export class questionnaireInputType implements Partial<Questionnaire> {
  @Field()
  title?: string;
  @Field({ nullable: true, defaultValue: "" })
  description?: string;

  @Field((type) => QuestionnaireStatus, {
    defaultValue: QuestionnaireStatus.DRAFT,
    nullable: false,
  })
  status?: QuestionnaireStatus;

  @Field((type) => [String])
  tags?: string[];

  @Field({ nullable: true })
  timeLimit?: number;

  @Field((type) => Visibility, {})
  visibility?: Visibility;

  @Field((type) => [QuestionInputType], { nullable: true })
  questions?: Question[];

  // @Field((type) => [String])
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
