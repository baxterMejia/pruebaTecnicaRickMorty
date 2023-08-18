import { combineReducers } from '@reduxjs/toolkit';
import surveySlice from './surveySlice';

const surveyReducer = combineReducers({
  survey: surveySlice,
});

export default surveyReducer;
