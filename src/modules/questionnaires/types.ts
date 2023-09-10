export enum QuestionnaireStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
  RESTRICTED = "restricted",
}

export interface Question {
  questionText: string;
  options: string[];
  correctOption: number;
}
