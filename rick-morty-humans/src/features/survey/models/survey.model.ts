import { TypesGraphicSmileys } from '../constants/typesGraphicSmileys';
import { TypesQuestionsEnum } from '../constants/typesQuestions';

export interface ISurveyCreateD {
  surveyName: string;
}

export interface ISurvey {
  id: number;
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
  questions: Array<typesOfQuestionsSurveyTypes>;
  requestRutSurveyed: true;
  idTargetPopulation: number;
  yearTypeOfInitiative: string;
  showInformedConsentToUsers: boolean;
}

export interface ISurveyDataFilterPaginated {
  id: number;
  yearTypeOfInitiative: number;
  surveyName: string;
  idState: number;
  idCategory: number;
  idTypeOfInitiative: string;
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
  arrayOfConditionedResponses: Array<IArrayOfConditionedResponses>;
}

export interface IArrayOfConditionedResponses {
  idAnswer: string;
  idQuestion: string;
}
export interface ITypeMultipleOptionSelection {
  id: string;
  titleQuestion: string;
  typeQuestion: TypesQuestionsEnum;
  options: Array<ITypeSelectionOptions>;
  questionIsMandatory: boolean;
  arrayOfConditionedResponses: Array<IArrayOfConditionedResponses>;
}

export interface ITypeQuestionMultiPointScale {
  id: string;
  titleQuestion: string;
  description: string;
  typeQuestion:
    | TypesQuestionsEnum.QuestionTypeMultiPointScale
    | TypesQuestionsEnum.QuestionMultipleChoiceScale;
  questionIsMandatory: boolean;
  matrix: Array<any>;
  arrayOfConditionedResponses: Array<IArrayOfConditionedResponses>;
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

export interface ITypeQuestionGraphicClassificationOfSmileys {
  id: string;
  titleQuestion: string;
  typeQuestion: TypesQuestionsEnum.QuestionGraphicClassificationOfSmileys;
  questionIsMandatory: boolean;
  smileys: Array<ISmileys>;
}

export interface ISmileys {
  id: TypesGraphicSmileys;
  description: string;
  img: string;
}
export type typesOfQuestionsSurveyTypes =
  | ITypeSingleOptionSelection
  | ITypeMultipleOptionSelection
  | ITypeQuestionMultiPointScale
  | ITypeQuestionCommentBox
  | ITypeQuestionDropdownMenu
  | ITypeQuestionDate
  | ITypeQuestionEmail
  | ITypeQuestionGraphicClassificationOfSmileys;
