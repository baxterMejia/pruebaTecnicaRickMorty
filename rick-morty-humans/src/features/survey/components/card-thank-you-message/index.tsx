import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import stylesInstrumentsGlobal from '@/StylesGlobal/instruments.global.module.scss';
import ModalAddQuestions from '../modal-add-questions';
import { useEffect, useState } from 'react';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { useDispatch } from 'react-redux';
import { addThankYouMessage } from '../../reducer/surveySlice';
import { ISurvey } from '../../models/survey.model';
import { debounce } from 'lodash';
import { waitApiSendDataDebounceSurvey } from '../../constants/typesQuestions';

interface IProps {
  thankYouMessage: string;
  updateSurveyFormBackend: (d: ISurvey) => void;
}
const CardThankYouMessage = ({
  thankYouMessage,
  updateSurveyFormBackend,
}: IProps) => {
  const [showModalAddQuestion, setShosModalAddQuestion] = useState(false);
  const [thankYouMessageLocal, setThankYouMessageLocal] =
    useState(thankYouMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    updateStateGlobalSurvey();
  }, [thankYouMessageLocal]);

  useEffect(() => {
    debouncedActualizarAPI();
    return () => {
      debouncedActualizarAPI.cancel();
    };
  }, [thankYouMessageLocal]);

  const onCloseOrShowModalAddQuestion = () => {
    setShosModalAddQuestion(!showModalAddQuestion);
  };

  const updateStateGlobalSurvey = () => {
    dispatch(
      addThankYouMessage({
        thankYouMessage: thankYouMessageLocal,
      })
    );
  };

  const handleTextChange = (e: EditorTextChangeEvent) => {
    const content = e.htmlValue?.trim();
    setThankYouMessageLocal(content ?? '');
  };

  //Actualizando componentes. Enviando al Backend
  const onUpdateCardService = () => {
    updateSurveyFormBackend({
      thankYouMessage: thankYouMessageLocal,
    } as any);
  };
  const debouncedActualizarAPI = debounce(
    onUpdateCardService,
    waitApiSendDataDebounceSurvey
  );

  return (
    <>
      <div className={`${stylesCardGlobal['card-main']}`}>
        <h1>Mensaje de agradecimiento</h1>
        <hr />
        <div>
          <Editor
            style={{ height: '320px' }}
            value={thankYouMessageLocal}
            id="message-thank-you"
            onTextChange={handleTextChange}
          ></Editor>
        </div>
        <button
          onClick={onCloseOrShowModalAddQuestion}
          className={`${stylesInstrumentsGlobal['wrapper-button-add-new-question']}`}
          id="button-add-question-card-thank-you-message"
        >
          Agregar pregunta
        </button>
      </div>

      {showModalAddQuestion && (
        <ModalAddQuestions
          idQuestion={''}
          onCloseOrShowModalAddQuestion={onCloseOrShowModalAddQuestion}
        />
      )}
    </>
  );
};

export default CardThankYouMessage;
