import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ISurvey,
  ITypeQuestionCommentBox,
  ITypeQuestionDate,
  ITypeQuestionDropdownMenu,
  ITypeQuestionEmail,
  ITypeQuestionMultiPointScale,
  ITypeSelectionOptions,
  ITypeSingleOptionSelection,
  typesOfQuestionsSurveyTypes,
} from '../models/survey.model';

const initialState: ISurvey = {
  id: '',
  surveyName: '',
  description: '',
} as any;

const surveySlice = createSlice({
  name: 'surveyStateGlobal',
  initialState,
  reducers: {
    initDataSurvey: (_state, action: PayloadAction<ISurvey>) => action.payload,
    addQuestion: (
      state,
      action: PayloadAction<{
        question: typesOfQuestionsSurveyTypes;
        idQuestion: string;
      }>
    ) => {
      const { idQuestion, question } = action.payload;
      console.log(idQuestion, 'ssdsd');
      if (idQuestion) {
        const findIndex = state.questions.findIndex((d) => d.id === idQuestion);
        state.questions.splice(findIndex + 1, 0, question);
      } else {
        state.questions.unshift(question);
      }
    },
    addOptionsQuestionSingleMultipleQuestionSelection: (
      state,
      action: PayloadAction<{
        id: string;
        options: ITypeSelectionOptions[];
        title: string;
      }>
    ) => {
      const { id, options, title } = action.payload;
      const questionIndex = state.questions.findIndex((d) => d.id === id);
      const question = state.questions[
        questionIndex
      ] as ITypeSingleOptionSelection;
      question.titleQuestion = title;
      question.options = options;
    },
    addChangeQuestionMultiPointScale: (
      state,
      action: PayloadAction<{
        id: string;
        matrix: Array<any>;
        title: string;
        description: string;
      }>
    ) => {
      const { id, title, matrix, description } = action.payload;
      const questionIndex = state.questions.findIndex((d) => d.id === id);
      const question = state.questions[
        questionIndex
      ] as ITypeQuestionMultiPointScale;
      question.titleQuestion = title;
      question.matrix = matrix;
      question.description = description;
    },
    removeAnyQuestionById: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      const { id } = action.payload;
      console.log(id, 'borrar');
      state.questions = state.questions.filter((d) => d.id !== id);
    },
    addHeaderSurvey: (
      state,
      action: PayloadAction<{
        surveyName: string;
        description: string;
        logoUrl: string;
      }>
    ) => {
      const { surveyName, description, logoUrl } = action.payload;
      state.surveyName = surveyName;
      state.description = description;
      state.logoUrl = logoUrl;
    },
    addInformedConsent: (
      state,
      action: PayloadAction<{
        informedConsent: string;
      }>
    ) => {
      state.informedConsent = action.payload.informedConsent;
    },
    addInvitationToAnswerSurvey: (
      state,
      action: PayloadAction<{
        invitationToAnswerSurvey: string;
      }>
    ) => {
      state.invitationToAnswerSurvey = action.payload.invitationToAnswerSurvey;
    },
    addThankYouMessage: (
      state,
      action: PayloadAction<{
        thankYouMessage: string;
      }>
    ) => {
      state.thankYouMessage = action.payload.thankYouMessage;
    },
    addChangeQuestionCommentBox: (
      state,
      action: PayloadAction<{
        id: string;
        titleQuestion: string;
      }>
    ) => {
      const { id, titleQuestion } = action.payload;
      const questionIndex = state.questions.findIndex((d) => d.id === id);
      const question = state.questions[
        questionIndex
      ] as ITypeQuestionCommentBox;
      question.titleQuestion = titleQuestion;
    },
    addChangeQuestionDropdownMenu: (
      state,
      action: PayloadAction<{
        id: string;
        titleQuestion: string;
        options: Array<ITypeSelectionOptions>;
      }>
    ) => {
      const { id, titleQuestion, options } = action.payload;
      const questionIndex = state.questions.findIndex((d) => d.id === id);
      const question = state.questions[
        questionIndex
      ] as ITypeQuestionDropdownMenu;
      question.titleQuestion = titleQuestion;
      question.options = options;
    },
    addChangeQuestionDate: (
      state,
      action: PayloadAction<{
        id: string;
        titleQuestion: string;
      }>
    ) => {
      const { id, titleQuestion } = action.payload;
      const questionIndex = state.questions.findIndex((d) => d.id === id);
      const question = state.questions[questionIndex] as ITypeQuestionDate;
      question.titleQuestion = titleQuestion;
    },
    addChangeQuestionEmail: (
      state,
      action: PayloadAction<{
        id: string;
        titleQuestion: string;
      }>
    ) => {
      const { id, titleQuestion } = action.payload;
      const questionIndex = state.questions.findIndex((d) => d.id === id);
      const question = state.questions[questionIndex] as ITypeQuestionEmail;
      question.titleQuestion = titleQuestion;
    },
    resetSurveyStatusGlobal: () => initialState,
  },
});

export const {
  initDataSurvey,
  addQuestion,
  addOptionsQuestionSingleMultipleQuestionSelection,
  removeAnyQuestionById,
  resetSurveyStatusGlobal,
  addInformedConsent,
  addChangeQuestionMultiPointScale,
  addInvitationToAnswerSurvey,
  addThankYouMessage,
  addHeaderSurvey,
  addChangeQuestionCommentBox,
  addChangeQuestionDropdownMenu,
  addChangeQuestionDate,
  addChangeQuestionEmail,
} = surveySlice.actions;

export default surveySlice.reducer;
