import { TypesQuestionsEnum } from '../constants/typesQuestions';

export interface ISurveyCreateD {
  surveyName: string;
}

export interface ISurvey {
  id: string;
  surveyName: string;
  informedConsent: string;
  initiativeTypeYear: number;
  logoUrl: string;
  description: string;
  thankYouMessage: string;
  invitationToAnswerSurvey: string;
  idState: number;
  idCategory: number;
  idTypeOfInitiative: string;
  availableDate: string;
  closingDate: string;
  questions: Array<
    | ITypeSingleOptionSelection
    | ITypeQuestionMultiPointScale
    | ITypeQuestionCommentBox
    | ITypeQuestionDropdownMenu
    | ITypeQuestionDate
    | ITypeQuestionEmail
  >;
}

export interface ISurveyPaginated {
  items: ISurvey[];
  total: number;
  lastKey: string;
}

export interface ITypeSingleOptionSelection {
  id: string;
  titleQuestion: string;
  typeQuestion: TypesQuestionsEnum;
  options: Array<ITypeSelectionOptions>;
  questionIsMandatory: boolean;
}

export interface ITypeMultipleOptionSelection {
  id: string;
  titleQuestion: string;
  typeQuestion: TypesQuestionsEnum;
  options: Array<ITypeSelectionOptions>;
  questionIsMandatory: boolean;
}

export interface ITypeQuestionMultiPointScale {
  id: string;
  titleQuestion: string;
  description: string;
  typeQuestion: TypesQuestionsEnum.QuestionTypeMultiPointScale;
  questionIsMandatory: boolean;
  matrix: Array<any>;
}

export interface ITypeQuestionCommentBox {
  id: string;
  titleQuestion: string;
  typeQuestion: TypesQuestionsEnum.QuestionTypeCommentBox;
  questionIsMandatory: boolean;
}

export interface ITypeQuestionDropdownMenu {
  id: string;
  titleQuestion: string;
  typeQuestion: TypesQuestionsEnum.QuestionTypeDropdownMenu;
  options: Array<ITypeSelectionOptions>;
  questionIsMandatory: boolean;
}

export interface ITypeQuestionDate {
  id: string;
  titleQuestion: string;
  typeQuestion: TypesQuestionsEnum.QuestionTypeDate;
  questionIsMandatory: boolean;
  days: Array<{ id: number; name: string }>;
  months: Array<{ id: number; name: string }>;
  years: Array<{ id: number; name: string }>;
}

export interface ITypeQuestionEmail {
  id: string;
  titleQuestion: string;
  typeQuestion: TypesQuestionsEnum.QuestionTypeEmail;
  questionIsMandatory: boolean;
}

export interface ITypeSelectionOptions {
  id: string;
  option: string;
}

export type typesOfQuestionsSurveyTypes =
  | ITypeSingleOptionSelection
  | ITypeMultipleOptionSelection
  | ITypeQuestionMultiPointScale
  | ITypeQuestionCommentBox
  | ITypeQuestionDropdownMenu
  | ITypeQuestionDate
  | ITypeQuestionEmail;
