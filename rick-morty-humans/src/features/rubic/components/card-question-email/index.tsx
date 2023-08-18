import { useDispatch } from 'react-redux';
import { ITypeQuestionEmail } from '../../models/survey.model';
import {
  addChangeQuestionEmail,
  removeAnyQuestionById,
} from '../../reducer/surveySlice';
import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import stylesInputsInstrument from '@/StylesGlobal/inputs.instruments.global.module.scss';
import stylesInstrumentsGlobal from '@/StylesGlobal/instruments.global.module.scss';
import { useEffect, useState } from 'react';
import ModalAddQuestions from '../modal-add-questions';
import stylesInputsGlobal from '@/StylesGlobal/inputs.global.module.scss';

const CardQuestionEmail = ({
  id,
  titleQuestion,
  questionIsMandatory,
}: ITypeQuestionEmail) => {
  const dispatch = useDispatch();
  const [titleLocal, setTitleLocal] = useState(titleQuestion);
  const [showModalAddQuestion, setShosModalAddQuestion] = useState(false);
  const removeAnyQuestionByIdStateGlobal = () => {
    dispatch(
      removeAnyQuestionById({
        id,
      })
    );
  };

  useEffect(() => {
    addQuestionChangeStateGlobal();
  }, [titleLocal]);

  const addQuestionChangeStateGlobal = () => {
    dispatch(
      addChangeQuestionEmail({
        id,
        titleQuestion: titleLocal,
      })
    );
  };

  const onCloseOrShowModalAddQuestion = () => {
    setShosModalAddQuestion(!showModalAddQuestion);
  };

  return (
    <>
      <div
        className={`${stylesCardGlobal['card-main']}`}
        id="card-question-email"
      >
        <div
          className={`${stylesInstrumentsGlobal['wrapper-header-question']}`}
        >
          <div>
            <input
              value={titleLocal}
              className={`${stylesInputsInstrument['input-form-instrument-label']}`}
              type="text"
              id={`input-title-question-email`}
              placeholder="Pregunta introducción de correo"
              maxLength={200}
              onChange={(e) => {
                setTitleLocal(e.target.value.trim());
              }}
            />
          </div>
          <div>
            <label>Pregunta tiene condición</label>
          </div>
          <div>
            <span
              className="cursor-pointer"
              id="span-remove-question-email"
              onClick={removeAnyQuestionByIdStateGlobal}
            >
              X
            </span>
          </div>
        </div>
        <hr />

        <div className="p-20px">
          <input
            type="email"
            className={`${stylesInputsGlobal['input-form-main']}`}
            placeholder="Correo"
            maxLength={200}
          />
        </div>

        <hr />
        <div>
          <button
            onClick={onCloseOrShowModalAddQuestion}
            className={`${stylesInstrumentsGlobal['wrapper-button-add-new-question']}`}
            id={`button-add-question`}
          >
            Agregar pregunta
          </button>

          {questionIsMandatory && (
            <div className="text-right">
              <label>* Campo obligatorio</label>
            </div>
          )}
        </div>
      </div>
      {showModalAddQuestion && (
        <ModalAddQuestions
          idQuestion={id}
          onCloseOrShowModalAddQuestion={onCloseOrShowModalAddQuestion}
        />
      )}
    </>
  );
};

export default CardQuestionEmail;
