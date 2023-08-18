import { useEffect, useState } from 'react';
import { ITypeQuestionGraphicClassificationOfSmileys } from '../../models/survey.model';
import stylesInstrumentsGlobal from '@/StylesGlobal/instruments.global.module.scss';
import stylesInputsInstrument from '@/StylesGlobal/inputs.instruments.global.module.scss';
import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import ModalAddQuestions from '../modal-add-questions';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { addChangeQuestionGraphicSmileys } from '../../reducer/surveySlice';

interface IProps extends ITypeQuestionGraphicClassificationOfSmileys {
  removeQuestionOfSurvey: (idQuestion: string) => void;
}

const CardQuestionGraphicClassificationOfSmileys = ({
  removeQuestionOfSurvey,
  id,
  titleQuestion,
  questionIsMandatory,
  smileys,
}: IProps) => {
  const [titleLocal, setTitleLocal] = useState(titleQuestion);
  const [smileysLocal, setSmileysLocal] = useState(smileys);
  const [showModalAddQuestion, setShosModalAddQuestion] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    addOptionsStateGlobal();
  }, [titleLocal, smileysLocal]);

  const addOptionsStateGlobal = () => {
    dispatch(
      addChangeQuestionGraphicSmileys({
        id,
        titleQuestion: titleLocal,
        smileys: smileysLocal,
      })
    );
  };

  const onCloseOrShowModalAddQuestion = () => {
    setShosModalAddQuestion(!showModalAddQuestion);
  };

  const removeAnyQuestionByIdStateGlobal = () => {
    removeQuestionOfSurvey(id);
  };

  const handleQuestionChangeSmiley = (i: number, value: string) => {
    const newSmiley = [...smileysLocal];
    const updatedSmiley = {
      ...newSmiley[i],
      description: value,
    };
    newSmiley[i] = updatedSmiley;
    setSmileysLocal(newSmiley);
  };

  return (
    <>
      <div
        className={`${stylesCardGlobal['card-main']}`}
        id="card-question-graphic-smileys"
      >
        <div
          className={`${stylesInstrumentsGlobal['wrapper-header-question']}`}
        >
          <div>
            <input
              value={titleLocal}
              className={`${stylesInputsInstrument['input-form-instrument-label']}`}
              type="text"
              id={`input-title-question-gcs`}
              placeholder="Pregunta escala varios puntos"
              maxLength={200}
              onChange={(e) => {
                setTitleLocal(e.target.value);
              }}
            />
          </div>
          <div></div>
          <div>
            <span
              className="cursor-pointer"
              id="span-remove-question-gcs"
              onClick={removeAnyQuestionByIdStateGlobal}
            >
              X
            </span>
          </div>
        </div>
        <div className={`p-20px ${styles['wrapper-smileys']}`}>
          {smileysLocal.map((s, i) => {
            return (
              <div key={s.id}>
                <img src={s.img} />
                <input
                  type="text"
                  maxLength={50}
                  value={s.description}
                  id={`input-description-smiley-${s.id}`}
                  onChange={(e) =>
                    handleQuestionChangeSmiley(i, e.target.value)
                  }
                  className={`${stylesInputsInstrument['input-form-instrument-label']}`}
                />
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

export default CardQuestionGraphicClassificationOfSmileys;
