import { useState } from 'react';
import axios from 'axios';
import {
  ISurvey,
  ISurveyCreateD,
  ISurveyDataFilterPaginated,
  ISurveyPaginated,
} from '../models/survey.model';
import ApiResponse from '../../constantsGlobal/ApiResponse';

const urlApiSurvey = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MS_SURVEY,
});
const useSurvey = () => {
  const [surveyPaginated, setSurveyPaginated] = useState<ISurveyPaginated>({
    items: [],
    total: 0,
    lastKey: '',
  });
  const [survey, setSurvey] = useState<ISurvey | null>(null);

  const createSurveyService = async (surveyCreate: ISurveyCreateD) => {
    try {
      const res = await urlApiSurvey.post<ApiResponse<ISurvey>>(
        '/post-survey-create',
        {
          ...surveyCreate,
        }
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const getSurveyById = async (id: string) => {
    try {
      const res = await urlApiSurvey.get<ApiResponse<ISurvey | null>>(
        `/get-survey-by-id/${id}`
      );
      setSurvey(res.data.data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const searchSurveyPaginated = async (
    dataToFilter: ISurveyDataFilterPaginated
  ) => {
    try {
      const res = await urlApiSurvey.post<ApiResponse<ISurveyPaginated>>(
        '/post-survey-paginated',
        { ...dataToFilter }
      );
      setSurveyPaginated(res.data.data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const updateSurveyByIdService = async (dataToUpdate: ISurvey) => {
    try {
      await urlApiSurvey.post<ApiResponse<ISurvey>>('/update-survey-by-id', {
        ...dataToUpdate,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return {
    surveyPaginated,
    survey,
    searchSurveyPaginated,
    createSurveyService,
    updateSurveyByIdService,
    getSurveyById,
  };
};

export default useSurvey;
