import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import stylesInputsInstrument from '@/StylesGlobal/inputs.instruments.global.module.scss';
import { ITypeSingleOptionSelection } from '../../models/survey.model';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import stylesInstrumentsGlobal from '@/StylesGlobal/instruments.global.module.scss';
import {
  addOptionsQuestionSingleMultipleQuestionSelection,
  removeAnyQuestionById,
} from '../../reducer/surveySlice';
import styles from './styles.module.scss';
import ModalAddQuestions from '../modal-add-questions';

const CardQuestionTypeSingleOptionSelection = ({
  titleQuestion,
  id,
  options,
  questionIsMandatory,
}: ITypeSingleOptionSelection) => {
  const dispatch = useDispatch();
  const [titleQuestionLocal, setTitleQuestionLocal] = useState(titleQuestion);
  const [optionsLocal, setOptionsLocal] = useState(options);
  const [showModalAddQuestion, setShosModalAddQuestion] = useState(false);

  useEffect(() => {
    addOptionsStateGlobal();
  }, [optionsLocal, titleQuestionLocal]);

  const onCloseOrShowModalAddQuestion = () => {
    setShosModalAddQuestion(!showModalAddQuestion);
  };

  const addOptionNew = () => {
    setOptionsLocal([
      ...optionsLocal,
      {
        id: uuidv4(),
        option: `Opción...`,
      },
    ]);
  };
  const handleTitle = (v: string) => {
    setTitleQuestionLocal(v);
  };

  const handleRemoveQuestion = (i: number) => {
    if (optionsLocal.length === 1) {
      return;
    }
    const newQuestions = [...optionsLocal];
    newQuestions.splice(i, 1);
    setOptionsLocal(newQuestions);
  };

  const handleQuestionChange = (i: number, value: string) => {
    const newQuestions = [...optionsLocal];
    const updatedQuestion = {
      ...newQuestions[i],
      option: value,
    };
    newQuestions[i] = updatedQuestion;
    setOptionsLocal(newQuestions);
  };

  const addOptionsStateGlobal = () => {
    dispatch(
      addOptionsQuestionSingleMultipleQuestionSelection({
        id,
        options: optionsLocal,
        title: titleQuestionLocal,
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

  return (
    <>
      <div
        className={`${stylesCardGlobal['card-main']}`}
        id="card-question-single-option-selection"
      >
        <div
          className={`${stylesInstrumentsGlobal['wrapper-header-question']}`}
        >
          <div>
            <input
              value={titleQuestionLocal}
              className={`${stylesInputsInstrument['input-form-instrument-label']}`}
              type="text"
              id={`input-title-question-rbt`}
              placeholder="Pregunta selección de única opción"
              maxLength={200}
              onChange={(e) => {
                handleTitle(e.target.value.trim());
              }}
            />
          </div>
          <div>
            <label>Pregunta tiene condición</label>
          </div>
          <div>
            <span
              className="cursor-pointer"
              id="span-remove-question-rbt"
              onClick={removeAnyQuestionByIdStateGlobal}
            >
              X
            </span>
          </div>
        </div>
        <hr />

        <div className={`${styles['wrapper-body-question']}`}>
          {optionsLocal.map((o, i) => {
            return (
              <div key={o.id} className={`${styles['wrapper-question-rdb']}`}>
                <input type="radio" name={id} />
                <input
                  className={`${stylesInputsInstrument['input-form-instrument-label']}`}
                  type="text"
                  placeholder="Opción"
                  value={o.option}
                  onChange={(e) => {
                    handleQuestionChange(i, e.target.value.trim());
                  }}
                  id={`input-title-question-option-rbt-${i}`}
                  onBlur={addOptionsStateGlobal}
                  maxLength={200}
                />
                <span
                  onClick={() => {
                    handleRemoveQuestion(i);
                  }}
                  id={`span-remove-question-option-rbt-${i}`}
                >
                  X
                </span>
              </div>
            );
          })}
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
          <button
            onClick={addOptionNew}
            className={`${styles['wrapper-button-add-new-option']}`}
            id={`button-add-question-option-rbt`}
          >
            Agregar
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

export default CardQuestionTypeSingleOptionSelection;
