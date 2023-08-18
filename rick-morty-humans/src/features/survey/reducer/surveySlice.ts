import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IArrayOfConditionedResponses,
  ISmileys,
  ISurvey,
  ITypeQuestionCommentBox,
  ITypeQuestionDate,
  ITypeQuestionDropdownMenu,
  ITypeQuestionEmail,
  ITypeQuestionGraphicClassificationOfSmileys,
  ITypeQuestionMultiPointScale,
  ITypeSelectionOptions,
  ITypeSingleOptionSelection,
  typesOfQuestionsSurveyTypes,
} from '../models/survey.model';
import { useDispatch } from 'react-redux';

const initialState: ISurvey = {
  id: null,
  surveyName: '',
  description: '',
} as any;

const surveySlice = createSlice({
  name: 'surveyStateGlobal',
  initialState,
  reducers: {
    initDataSurvey: (_state, action: PayloadAction<ISurvey>) => action.payload,
    updateAttributesSurveyGlobal: (state, action: PayloadAction<ISurvey>) => {
      return { ...state, ...action.payload };
    },
    addQuestion: (
      state,
      action: PayloadAction<{
        question: typesOfQuestionsSurveyTypes;
        idQuestion: string;
      }>
    ) => {
      const { idQuestion, question } = action.payload;
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
        arrayOfConditionedResponses: Array<IArrayOfConditionedResponses>;
      }>
    ) => {
      const { id, options, title, arrayOfConditionedResponses } =
        action.payload;
      const questionIndex = state.questions.findIndex((d) => d.id === id);
      const question = state.questions[
        questionIndex
      ] as ITypeSingleOptionSelection;
      question.titleQuestion = title;
      question.options = options;
      question.arrayOfConditionedResponses = arrayOfConditionedResponses ?? [];
    },
    addChangeQuestionMultiPointScale: (
      state,
      action: PayloadAction<{
        id: string;
        matrix: Array<any>;
        title: string;
        description: string;
        arrayOfConditionedResponses: Array<IArrayOfConditionedResponses>;
      }>
    ) => {
      const { id, title, matrix, description, arrayOfConditionedResponses } =
        action.payload;
      const questionIndex = state.questions.findIndex((d) => d.id === id);
      const question = state.questions[
        questionIndex
      ] as ITypeQuestionMultiPointScale;
      question.titleQuestion = title;
      question.matrix = matrix;
      question.description = description;
      question.arrayOfConditionedResponses = arrayOfConditionedResponses ?? [];
    },
    removeAnyQuestionById: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      const { id } = action.payload;
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
        showInformedConsentToUsers: boolean;
      }>
    ) => {
      const { showInformedConsentToUsers, informedConsent } = action.payload;
      state.showInformedConsentToUsers = showInformedConsentToUsers;
      state.informedConsent = informedConsent;
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

    addChangeQuestionGraphicSmileys: (
      state,
      action: PayloadAction<{
        id: string;
        titleQuestion: string;
        smileys: Array<ISmileys>;
      }>
    ) => {
      const { id, titleQuestion, smileys } = action.payload;
      const questionIndex = state.questions.findIndex((d) => d.id === id);
      const question = state.questions[
        questionIndex
      ] as ITypeQuestionGraphicClassificationOfSmileys;
      question.titleQuestion = titleQuestion;
      question.smileys = smileys;
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
  addChangeQuestionGraphicSmileys,
  addThankYouMessage,
  addHeaderSurvey,
  addChangeQuestionCommentBox,
  addChangeQuestionDropdownMenu,
  addChangeQuestionDate,
  addChangeQuestionEmail,
  updateAttributesSurveyGlobal,
} = surveySlice.actions;

export default surveySlice.reducer;
