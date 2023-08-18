import { v4 as uuidv4 } from 'uuid';
import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import { useEffect, useState } from 'react';
import {
  IArrayOfConditionedResponses,
  ITypeQuestionMultiPointScale,
} from '../../models/survey.model';
import stylesInputsInstrument from '@/StylesGlobal/inputs.instruments.global.module.scss';
import stylesInstrumentsGlobal from '@/StylesGlobal/instruments.global.module.scss';
import styles from './styles.module.scss';
import { addChangeQuestionMultiPointScale } from '../../reducer/surveySlice';
import { useDispatch } from 'react-redux';
import ModalAddQuestions from '../modal-add-questions';
import ModalAddConditionalityQuestion from '../modal-add-conditionality-question';

interface IProps extends ITypeQuestionMultiPointScale {
  removeQuestionOfSurvey: (idQuestion: string) => void;
}

const CardQuestionMultiPointScale = ({
  id,
  titleQuestion,
  description,
  matrix,
  questionIsMandatory,
  arrayOfConditionedResponses,
  removeQuestionOfSurvey,
}: IProps) => {
  const [titleLocal, setTitleLocal] = useState(titleQuestion);
  const [descriptionLocal, setDescriptionLocal] = useState(description);
  const [matrixLocal, setMatrixLocal] = useState(matrix);
  const [showModalAddQuestion, setShosModalAddQuestion] = useState(false);
  const [
    arrayOfConditionedResponsesLocal,
    setArrayOfConditionedResponsesLocal,
  ] = useState(arrayOfConditionedResponses);
  const [
    showMessageRemoveOptionConditional,
    setShowMessageRemoveOptionConditional,
  ] = useState(false);
  const dispatch = useDispatch();
  const [showModalAddConditionality, setModalAddConditionality] =
    useState(false);

  useEffect(() => {
    addQuestionChangeStateGlobal();
  }, [
    titleLocal,
    descriptionLocal,
    matrixLocal,
    arrayOfConditionedResponsesLocal,
  ]);

  const addColumn = () => {
    const ma = matrixLocal.map((row, index) => {
      return index === 0 ? [...row, `Columna...`] : [...row, uuidv4()];
    });
    setMatrixLocal(ma);
  };

  const addRow = () => {
    const mat = [...matrixLocal];
    const leng = mat[0].length - 1;

    const trans = [
      `Fila...`,
      ...Array(leng)
        .fill(null)
        .map(() => uuidv4()),
    ];
    mat.push(trans);
    setMatrixLocal(mat);
  };

  const removeRow = (i: number) => {
    if (validIfAnswerHasConditionRow(i)) {
      setShowMessageRemoveOptionConditional(true);
      setTimeout(() => {
        setShowMessageRemoveOptionConditional(false);
      }, 2000);
      return;
    }
    if (matrix.length === 2) {
      return;
    }
    const newQuestions = [...matrixLocal];
    newQuestions.splice(i, 1);
    setMatrixLocal(newQuestions);
  };

  const validIfAnswerHasConditionRow = (indexR: number) => {
    const columns = matrixLocal[indexR];
    return columns.some((c: string) =>
      arrayOfConditionedResponsesLocal.some((d) => d.idAnswer === c)
    );
  };

  const validIfAnswerHasConditionColumn = (indexC: number) => {
    return matrixLocal.some((a) =>
      arrayOfConditionedResponsesLocal.some((d) => d.idAnswer === a[indexC])
    );
  };

  const removeColumn = (i: number) => {
    if (validIfAnswerHasConditionColumn(i)) {
      setShowMessageRemoveOptionConditional(true);
      setTimeout(() => {
        setShowMessageRemoveOptionConditional(false);
      }, 2000);
      return;
    }

    if (matrixLocal[0].length === 2) {
      return;
    }
    const newQuestions = matrixLocal.map((row) => [...row]);
    for (const d of newQuestions) {
      d.splice(i, 1);
    }
    setMatrixLocal(newQuestions);
  };

  const addQuestionChangeStateGlobal = () => {
    dispatch(
      addChangeQuestionMultiPointScale({
        id,
        matrix: matrixLocal,
        title: titleLocal,
        description: descriptionLocal,
        arrayOfConditionedResponses: arrayOfConditionedResponsesLocal,
      })
    );
  };

  const onCloseOrShowModalAddQuestion = () => {
    setShosModalAddQuestion(!showModalAddQuestion);
  };

  const removeAnyQuestionByIdStateGlobal = () => {
    removeQuestionOfSurvey(id);
  };

  const structureHeaderTable = () => {
    return matrixLocal[0].map((d: string, i: number) => {
      if (i === 0) {
        return (
          <th style={{ width: '300px' }} key={i} className="text-left">
            <button onClick={addRow} id="button-add-row-mps">
              Agregar fila
            </button>
          </th>
        );
      }
      return (
        <th key={i}>
          <div>
            <textarea
              value={d}
              onChange={(e) => {
                handleChangeNameColumn(i, e.target.value);
              }}
              id="textarea-column-mps"
              maxLength={500}
              placeholder="Escriba el texto de la columna"
            ></textarea>

            <span
              className="cursor-pointer"
              onClick={() => {
                removeColumn(i);
              }}
              id={`span-remove-column-mps-${i}`}
            >
              x
            </span>
          </div>
        </th>
      );
    });
  };

  const onCloseOrShowModalAddConditionality = () => {
    setModalAddConditionality(!showModalAddConditionality);
  };

  const structureRowTable = () => {
    return matrixLocal.map((d, indexOne) => {
      if (indexOne === 0) {
        return '';
      }
      return (
        <tr key={indexOne}>
          {d.map((h: string, i: number) => {
            if (i === 0) {
              return (
                <td key={i}>
                  <div>
                    <textarea
                      value={h}
                      maxLength={500}
                      onChange={(e) => {
                        handleChangeNameRow(indexOne, e.target.value);
                      }}
                      id={`textarea-row-mps-${i}`}
                      placeholder="Escriba el texto de la fila"
                    ></textarea>

                    <span
                      id={`span-remove-row-mps-${i}`}
                      onClick={() => {
                        removeRow(indexOne);
                      }}
                      className="cursor-pointer"
                    >
                      <strong>x</strong>
                    </span>
                  </div>
                </td>
              );
            } else {
              return (
                <td key={i}>
                  <div>
                    <input
                      type="radio"
                      name={String(indexOne)}
                      id={`input-rdb-mps-${i}`}
                    />
                  </div>
                </td>
              );
            }
          })}
        </tr>
      );
    });
  };

  const handleChangeNameColumn = (i: number, value: string) => {
    const changeNameColumn = matrixLocal.map((row) => [...row]);
    changeNameColumn[0][i] = value;
    setMatrixLocal([...changeNameColumn]);
  };

  const handleChangeNameRow = (i: number, value: string) => {
    const changeNameRow = matrixLocal.map((row) => [...row]);
    changeNameRow[i][0] = value;
    setMatrixLocal(changeNameRow);
  };

  const transformDataOptions = () => {
    const newArray = [];
    for (let i = 1; i < matrixLocal.length; i++) {
      const fila = matrixLocal[i];
      for (let j = 1; j < fila.length; j++) {
        newArray.push({
          id: fila[j],
          description: `${matrixLocal[i][0]}/${matrixLocal[0][j]}`,
        });
      }
    }
    return newArray;
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
        id="card-question-multi-point-scale"
      >
        <div
          className={`${stylesInstrumentsGlobal['wrapper-header-question']}`}
        >
          <div>
            <input
              value={titleLocal}
              className={`${stylesInputsInstrument['input-form-instrument-label']}`}
              type="text"
              id={`input-title-question-mps`}
              placeholder="Pregunta escala varios puntos"
              maxLength={200}
              onChange={(e) => {
                setTitleLocal(e.target.value);
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
              id="span-remove-question-mps"
              onClick={removeAnyQuestionByIdStateGlobal}
            >
              X
            </span>
          </div>
        </div>
        <hr />
        <div className="p-20px">
          <label>Descripción</label>
          <br />
          <br />
          <textarea
            value={descriptionLocal}
            maxLength={1000}
            placeholder="Descripción..."
            onChange={(e) => {
              setDescriptionLocal(e.target.value);
            }}
            className={`${stylesInputsInstrument['input-form-instrument-textarea']}`}
          ></textarea>
        </div>

        {showMessageRemoveOptionConditional && (
          <div className="p-20px">
            <label>
              No puede remover el ítem seleccionado ya que tiene una
              condicionalidad
            </label>
          </div>
        )}
        <div className={`${styles['wrapper-table']}`}>
          <div className={`${styles['wrapper-table-multi-point']}`}>
            <table>
              <thead>
                <tr>{structureHeaderTable()}</tr>
              </thead>
              <tbody>{structureRowTable()}</tbody>
            </table>
          </div>
          <div>
            <div>
              <button id="button-add-column-mps" onClick={addColumn}>
                Agregar columna
              </button>
            </div>
          </div>
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
          titleQuestion={titleLocal}
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

export default CardQuestionMultiPointScale;
