import Modal from '@/src/shared/components/shared-modal/modal';
import { RootState } from '@/src/store';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import stylesLabelGlobal from '@/StylesGlobal/labels.global.module.scss';
import { IArrayOfConditionedResponses } from '../../models/survey.model';

interface IProps {
  onCloseOrShowModalAddConditionality: () => void;
  titleQuestion: string;
  idQuestion: string;
  questionsAnswer: Array<{ id: string; description: string }>;
  conditionedResponses: Array<IArrayOfConditionedResponses>;
  onSetArrayOfConditionedResponses: (
    data: Array<IArrayOfConditionedResponses>
  ) => void;
}
const ModalAddConditionalityQuestion = ({
  onCloseOrShowModalAddConditionality,
  titleQuestion,
  questionsAnswer,
  idQuestion,
  conditionedResponses,
  onSetArrayOfConditionedResponses,
}: IProps) => {
  const surveyStateGlobal = useSelector(
    (state: RootState) => state.surveyComponent.survey
  );
  const questionsTransform = surveyStateGlobal.questions
    .map((d) => {
      return { id: d.id, titleQuestion: d.titleQuestion };
    })
    .filter((d) => d.id !== idQuestion);
  const [conditionedResponsesLocal, setConditionedResponsesLocal] = useState<
    Array<{ idAnswer: string; idQuestion: string }>
  >(conditionedResponses ?? []);
  const [idAnswer, setIdAnswer] = useState(null);
  const [idQuestionWithCondition, setIdQuestionWithCondition] = useState(null);
  const [questions, setQuestions] = useState(questionsTransform);

  useEffect(() => {
    filterAddedQuestions();
    onSetArrayOfConditionedResponses(conditionedResponsesLocal);
  }, [conditionedResponsesLocal]);

  const addCondition = () => {
    setIdAnswer(null);
    setIdQuestionWithCondition(null);
    setConditionedResponsesLocal((a) => [
      ...a,
      {
        idAnswer,
        idQuestion: idQuestionWithCondition,
      } as any,
    ]);
  };

  const filterAddedQuestions = () => {
    const d = questionsTransform.filter(
      (a) => !conditionedResponsesLocal.some((b) => b.idQuestion === a.id)
    );
    setQuestions(d);
  };

  const answerTranslation = (id: string) =>
    questionsAnswer.find((d) => d.id === id)?.description;

  const questionTranslation = (id: string) =>
    surveyStateGlobal.questions.find((d) => d.id === id)?.titleQuestion;

  const removeItem = (idAnswerP: string, idQuestionP: string) => {
    const filterData = conditionedResponsesLocal.filter(
      (d) => !(d.idAnswer === idAnswerP && d.idQuestion === idQuestionP)
    );

    setConditionedResponsesLocal(filterData);
  };

  return (
    <Modal widthClass="w-50" onCloseModal={onCloseOrShowModalAddConditionality}>
      <div style={{ position: 'relative' }}>
        <h1>{titleQuestion}</h1>

        <div className="row">
          <div className="col-sm-12">
            <label className={`${stylesLabelGlobal['label-form-main']}`}>
              Respuestas
            </label>
            <div>
              <Dropdown
                id="select-form-survey-end-idState"
                options={questionsAnswer}
                optionLabel="description"
                optionValue="id"
                placeholder="Seleccionar"
                value={idAnswer}
                onChange={(e) => {
                  setIdAnswer(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-sm-12">
            <label className={`${stylesLabelGlobal['label-form-main']}`}>
              Preguntas
            </label>
            <Dropdown
              id="select-form-survey-end-idState"
              options={questions}
              optionLabel="titleQuestion"
              optionValue="id"
              placeholder="Seleccionar"
              value={idQuestionWithCondition}
              onChange={(e) => {
                setIdQuestionWithCondition(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <div className="text-right">
          <button
            onClick={addCondition}
            disabled={!idAnswer || !idQuestionWithCondition}
          >
            Agregar
          </button>
        </div>
        <hr />
        <div className={`${styles['wrapper-table-condition']}`}>
          <table>
            <thead>
              <tr>
                <th>Respuesta</th> <th>Pregunta a mostrar</th> <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {conditionedResponsesLocal.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>{answerTranslation(d.idAnswer)}</td>
                    <td>{questionTranslation(d.idQuestion)}</td>
                    <td>
                      <button
                        onClick={() => {
                          removeItem(d.idAnswer, d.idQuestion);
                        }}
                      >
                        Quitar condición
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddConditionalityQuestion;
