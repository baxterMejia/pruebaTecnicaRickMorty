import { useDispatch } from 'react-redux';
import {
  ITypeQuestionDropdownMenu,
  ITypeSelectionOptions,
} from '../../models/survey.model';
import {
  addChangeQuestionDropdownMenu,
  removeAnyQuestionById,
} from '../../reducer/surveySlice';
import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import stylesInstrumentsGlobal from '@/StylesGlobal/instruments.global.module.scss';
import stylesInputsInstrument from '@/StylesGlobal/inputs.instruments.global.module.scss';
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import styles from './styles.module.scss';
import ModalAddOptionsQuestionDropdownMenu from '../modal-add-options-question-dropdown-menu';
import ModalAddQuestions from '../modal-add-questions';
interface IProps extends ITypeQuestionDropdownMenu {
  removeQuestionOfSurvey: (idQuestion: string) => void;
}
const CardQuestionDropdownMenu = ({
  id,
  titleQuestion,
  options,
  questionIsMandatory,
  removeQuestionOfSurvey,
}: IProps) => {
  const [titleLocal, setTitleLocal] = useState(titleQuestion);
  const [optionsLocal, setOptionsLocal] = useState(options);
  const [showModalAddOptions, setShowModalAddOptions] = useState(false);
  const [showModalAddQuestion, setShosModalAddQuestion] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    addQuestionChangeStateGlobal();
  }, [titleLocal, optionsLocal]);

  const addQuestionChangeStateGlobal = () => {
    dispatch(
      addChangeQuestionDropdownMenu({
        id,
        titleQuestion: titleLocal,
        options: optionsLocal,
      })
    );
  };
  const removeAnyQuestionByIdStateGlobal = () => {
    removeQuestionOfSurvey(id);
  };

  const handleOptionsLocalNew = (optionsNew: Array<ITypeSelectionOptions>) => {
    setOptionsLocal(optionsNew);
  };

  const handleShowModalAddOptions = () => {
    setShowModalAddOptions(!showModalAddOptions);
  };
  const onCloseOrShowModalAddQuestion = () => {
    setShosModalAddQuestion(!showModalAddQuestion);
  };

  return (
    <>
      <div
        className={`${stylesCardGlobal['card-main']}`}
        id="card-question-dropdown-menu"
      >
        <div
          className={`${stylesInstrumentsGlobal['wrapper-header-question']}`}
        >
          <div>
            <input
              value={titleLocal}
              className={`${stylesInputsInstrument['input-form-instrument-label']}`}
              type="text"
              id={`input-title-question-dropd`}
              maxLength={200}
              placeholder="Pregunta menú desplegable"
              onChange={(e) => {
                setTitleLocal(e.target.value);
              }}
            />
          </div>
          <div></div>
          <div>
            <span
              id="span-remove-question-dropd"
              className="cursor-pointer"
              onClick={removeAnyQuestionByIdStateGlobal}
            >
              X
            </span>
          </div>
        </div>
        <hr />
        <div className={`${styles['wrapper-dropdown']}`}>
          <div>
            <Dropdown
              options={optionsLocal}
              optionLabel="option"
              optionValue="id"
              placeholder="Seleccionar..."
              id="select-question-dropdown"
            />
          </div>
          <div>
            <button
              id="button-add-options-dropdown"
              onClick={handleShowModalAddOptions}
            >
              +
            </button>
          </div>
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
      {showModalAddOptions && (
        <ModalAddOptionsQuestionDropdownMenu
          options={optionsLocal}
          handleOptionsLocalNew={handleOptionsLocalNew}
          handleShowModalAddOptions={handleShowModalAddOptions}
        />
      )}

      {showModalAddQuestion && (
        <ModalAddQuestions
          idQuestion={id}
          onCloseOrShowModalAddQuestion={onCloseOrShowModalAddQuestion}
        />
      )}
    </>
  );
};

export default CardQuestionDropdownMenu;
