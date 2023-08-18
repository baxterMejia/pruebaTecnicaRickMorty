import { useDispatch } from 'react-redux';
import { ITypeQuestionDate } from '../../models/survey.model';
import {
  addChangeQuestionDate,
  removeAnyQuestionById,
} from '../../reducer/surveySlice';
import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import stylesInstrumentsGlobal from '@/StylesGlobal/instruments.global.module.scss';
import stylesInputsInstrument from '@/StylesGlobal/inputs.instruments.global.module.scss';
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import styles from './styles.module.scss';
import ModalAddQuestions from '../modal-add-questions';

const CardQuestionDate = ({
  id,
  titleQuestion,
  years,
  days,
  months,
  questionIsMandatory,
}: ITypeQuestionDate) => {
  const [titleLocal, setTitleLocal] = useState(titleQuestion);
  const [showModalAddQuestion, setShosModalAddQuestion] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    addQuestionChangeStateGlobal();
  }, [titleLocal]);

  const addQuestionChangeStateGlobal = () => {
    dispatch(
      addChangeQuestionDate({
        id,
        titleQuestion: titleLocal,
      })
    );
  };

  const onCloseOrShowModalAddQuestion = () => {
    setShosModalAddQuestion(!showModalAddQuestion);
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
        id="card-question-date"
      >
        <div
          className={`${stylesInstrumentsGlobal['wrapper-header-question']}`}
        >
          <div>
            <input
              value={titleLocal}
              className={`${stylesInputsInstrument['input-form-instrument-label']}`}
              type="text"
              id={`input-title-question-date`}
              placeholder="Pregunta fecha"
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
              id="span-remove-question-date"
              onClick={removeAnyQuestionByIdStateGlobal}
            >
              X
            </span>
          </div>
        </div>
        <hr />
        <div className={styles['wrapper-dropdown-date']}>
          <div>
            <label>Día</label>
            <Dropdown
              options={days}
              placeholder="Seleccionar..."
              optionLabel="name"
              optionValue="id"
              id="select-question-date-days"
            />
          </div>
          <div>
            <label>Mes</label>
            <Dropdown
              options={months}
              optionLabel="name"
              optionValue="id"
              placeholder="Seleccionar..."
              id="select-question-date-months"
            />
          </div>
          <div>
            <label>Año</label>
            <Dropdown
              options={years}
              optionLabel="name"
              optionValue="id"
              placeholder="Seleccionar..."
              id="select-question-date-years"
            />
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

export default CardQuestionDate;
