import { Ref, getModelForClass } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import { ModelFunction } from "../../core/baseModelFunction";
import { Field } from "type-graphql";
import { User } from "../user/model";

enum QuestionnaireStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
  RESTRICTED = "restricted",
}

interface Question {
  questionText: string;
  options: string[];
  correctOption: number;
}

export class Questionnaire {
  @prop({
    ref: () => "User",
  })
  creatorId!: Ref<User>;

  @prop()
  title!: string;

  @prop()
  description?: string;

  @prop({ enum: QuestionnaireStatus, default: QuestionnaireStatus.DRAFT })
  status?: QuestionnaireStatus;

  @prop()
  tags?: string[];

  @prop()
  startTime?: Date;

  @prop()
  endTime?: Date;

  @prop()
  timeLimit?: number;

  @prop({ enum: Visibility, default: Visibility.PUBLIC })
  visibility?: Visibility;

  @prop({})
  questions!: Question[];

  @prop({})
  respondents?: string[];

  @prop()
  totalAttempts?: number;

  @prop()
  averageScore?: number;

  @prop()
  highestScore?: number;

  @prop()
  version?: number;
}

const schema = getModelForClass(Questionnaire);
class schemaModelFunction extends ModelFunction<Questionnaire> {
  constructor(schema: any) {
    super(schema);
  }
}
export const QuestionnaireInstance = new schemaModelFunction(schema);
