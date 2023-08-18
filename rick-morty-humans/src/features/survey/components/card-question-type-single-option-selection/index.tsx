import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import stylesInputsInstrument from '@/StylesGlobal/inputs.instruments.global.module.scss';
import {
  IArrayOfConditionedResponses,
  ITypeSingleOptionSelection,
} from '../../models/survey.model';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import stylesInstrumentsGlobal from '@/StylesGlobal/instruments.global.module.scss';
import { addOptionsQuestionSingleMultipleQuestionSelection } from '../../reducer/surveySlice';
import styles from './styles.module.scss';
import ModalAddQuestions from '../modal-add-questions';
import ModalAddConditionalityQuestion from '../modal-add-conditionality-question';
interface IProps extends ITypeSingleOptionSelection {
  removeQuestionOfSurvey: (idQuestion: string) => void;
}
const CardQuestionTypeSingleOptionSelection = ({
  titleQuestion,
  id,
  options,
  questionIsMandatory,
  arrayOfConditionedResponses,
  removeQuestionOfSurvey,
}: IProps) => {
  const dispatch = useDispatch();
  const [titleQuestionLocal, setTitleQuestionLocal] = useState(titleQuestion);
  const [optionsLocal, setOptionsLocal] = useState(options);
  const [showModalAddQuestion, setShosModalAddQuestion] = useState(false);
  const [
    showMessageRemoveOptionConditional,
    setShowMessageRemoveOptionConditional,
  ] = useState(false);
  const [
    arrayOfConditionedResponsesLocal,
    setArrayOfConditionedResponsesLocal,
  ] = useState(arrayOfConditionedResponses);
  const [showModalAddConditionality, setModalAddConditionality] =
    useState(false);

  useEffect(() => {
    addOptionsStateGlobal();
  }, [optionsLocal, titleQuestionLocal, arrayOfConditionedResponsesLocal]);

  const onCloseOrShowModalAddQuestion = () => {
    setShosModalAddQuestion(!showModalAddQuestion);
  };
  const onCloseOrShowModalAddConditionality = () => {
    setModalAddConditionality(!showModalAddConditionality);
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
    if (validIfAnswerHasCondition(optionsLocal[i].id)) {
      setShowMessageRemoveOptionConditional(true);
      setTimeout(() => {
        setShowMessageRemoveOptionConditional(false);
      }, 2000);
      return;
    }
    if (optionsLocal.length === 1) {
      return;
    }
    const newQuestions = [...optionsLocal];
    newQuestions.splice(i, 1);
    setOptionsLocal(newQuestions);
  };

  const validIfAnswerHasCondition = (idAnswerP: string) => {
    return arrayOfConditionedResponsesLocal.find(
      (d) => d.idAnswer === idAnswerP
    );
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
        arrayOfConditionedResponses: arrayOfConditionedResponsesLocal,
      })
    );
  };

  const removeAnyQuestionByIdStateGlobal = () => {
    removeQuestionOfSurvey(id);
  };

  const transformDataOptions = () => {
    return optionsLocal.map((d) => {
      return {
        id: d.id,
        description: d.option,
      };
    });
  };

  const onSetArrayOfConditionedResponsesLocal = (
    dataNew: Array<IArrayOfConditionedResponses>
  ) => {
    setArrayOfConditionedResponsesLocal(dataNew);
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
                handleTitle(e.target.value);
              }}
            />
          </div>
          <div>
            {arrayOfConditionedResponsesLocal?.length ? (
              <label>
                <strong>Pregunta tiene condición</strong>
              </label>
            ) : (
              <label></label>
            )}
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
        {showMessageRemoveOptionConditional && (
          <div>
            <label>
              No puede remover la opción ya que tiene una condicionalidad
            </label>
          </div>
        )}
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
                    handleQuestionChange(i, e.target.value);
                  }}
                  id={`input-title-question-option-rbt-${i}`}
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
        <div className="text-right">
          <button onClick={onCloseOrShowModalAddConditionality}>
            Agregar condicionalidad
          </button>
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

      {showModalAddConditionality && (
        <ModalAddConditionalityQuestion
          idQuestion={id}
          questionsAnswer={transformDataOptions()}
          titleQuestion={titleQuestionLocal}
          conditionedResponses={arrayOfConditionedResponsesLocal}
          onCloseOrShowModalAddConditionality={
            onCloseOrShowModalAddConditionality
          }
          onSetArrayOfConditionedResponses={(
            a: Array<IArrayOfConditionedResponses>
          ) => {
            onSetArrayOfConditionedResponsesLocal(a);
          }}
        />
      )}
    </>
  );
};

export default CardQuestionTypeSingleOptionSelection;
