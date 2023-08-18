import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInvitationToAnswerSurvey } from '../../reducer/surveySlice';
import { ISurvey } from '../../models/survey.model';
import { debounce } from 'lodash';
import { waitApiSendDataDebounceSurvey } from '../../constants/typesQuestions';

interface IProps {
  invitationToAnswerSurvey: string;
  updateSurveyFormBackend: (d: ISurvey) => void;
}
const CardInvitationToAnswerSurvey = ({
  invitationToAnswerSurvey,
  updateSurveyFormBackend,
}: IProps) => {
  const [invitationToAnswerSurveyLocal, setInvitationToAnswerSurvey] = useState(
    invitationToAnswerSurvey
  );
  const dispatch = useDispatch();

  useEffect(() => {
    updateStateGlobalSurvey();
  }, [invitationToAnswerSurveyLocal]);

  const updateStateGlobalSurvey = () => {
    dispatch(
      addInvitationToAnswerSurvey({
        invitationToAnswerSurvey: invitationToAnswerSurveyLocal,
      })
    );
  };

  const handleTextChange = (e: EditorTextChangeEvent) => {
    const content = e.htmlValue?.trim();
    setInvitationToAnswerSurvey(content ?? '');
  };

  useEffect(() => {
    debouncedActualizarAPI();
    return () => {
      debouncedActualizarAPI.cancel();
    };
  }, [invitationToAnswerSurveyLocal]);
  //Actualizando card. Enviando al Backend
  const onUpdateCardService = () => {
    updateSurveyFormBackend({
      invitationToAnswerSurvey: invitationToAnswerSurveyLocal,
    } as any);
  };
  const debouncedActualizarAPI = debounce(
    onUpdateCardService,
    waitApiSendDataDebounceSurvey
  );
  return (
    <div className={`${stylesCardGlobal['card-main']}`}>
      <h1>Invitación a contestar la encuesta</h1>
      <hr />
      <div>
        <Editor
          value={invitationToAnswerSurveyLocal}
          onTextChange={handleTextChange}
          id="message-invitation-to-answer-survey"
          style={{ height: '320px' }}
        ></Editor>
      </div>
    </div>
  );
};

export default CardInvitationToAnswerSurvey;
