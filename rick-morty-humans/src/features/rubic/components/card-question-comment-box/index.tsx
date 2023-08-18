import { useEffect, useState } from 'react';
import { ITypeQuestionCommentBox } from '../../models/survey.model';
import stylesInstrumentsGlobal from '@/StylesGlobal/instruments.global.module.scss';
import stylesInputsInstrument from '@/StylesGlobal/inputs.instruments.global.module.scss';
import {
  addChangeQuestionCommentBox,
  removeAnyQuestionById,
} from '../../reducer/surveySlice';
import { useDispatch } from 'react-redux';
import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import ModalAddQuestions from '../modal-add-questions';

const CardQuestionCommentBox = ({
  id,
  titleQuestion,
  questionIsMandatory,
}: ITypeQuestionCommentBox) => {
  const [titleLocal, setTitleLocal] = useState(titleQuestion);
  const [showModalAddQuestion, setShosModalAddQuestion] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    addQuestionChangeStateGlobal();
  }, [titleLocal]);

  const addQuestionChangeStateGlobal = () => {
    dispatch(
      addChangeQuestionCommentBox({
        id,
        titleQuestion: titleLocal,
      })
    );
  };

  const removeAnyQuestionByIdStateGlobal = () => {
    dispatch(
      removeAnyQuestionById({
        id,
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
        id="card-question-comment-box"
      >
        <div
          className={`${stylesInstrumentsGlobal['wrapper-header-question']}`}
        >
          <div>
            <input
              value={titleLocal}
              className={`${stylesInputsInstrument['input-form-instrument-label']}`}
              type="text"
              id={`input-title-question-cmbox`}
              maxLength={200}
              placeholder="Pregunta caja de comentarios"
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
              id="span-remove-question-cmbox"
              onClick={removeAnyQuestionByIdStateGlobal}
            >
              X
            </span>
          </div>
        </div>
        <hr />
        <div className="p-20px">
          <textarea
            maxLength={200}
            id="textarea-question-cmbox"
            placeholder="Comentario"
            className={`${stylesInputsInstrument['input-form-instrument-textarea']}`}
          ></textarea>
          <div className="text-right ">
            <span>0/1500</span>
          </div>
        </div>
        <hr />
        <div>
          <button
            onClick={onCloseOrShowModalAddQuestion}
            id={`button-add-question`}
            className={`${stylesInstrumentsGlobal['wrapper-button-add-new-question']}`}
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

export default CardQuestionCommentBox;
