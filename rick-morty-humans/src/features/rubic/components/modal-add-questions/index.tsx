import Modal from '@/src/shared/components/shared-modal/modal';
import styles from './styles.module.scss';
import { useState } from 'react';
import { TypesQuestionsEnum } from '../../constants/typesQuestions';
import { useDispatch } from 'react-redux';
import CreateSurveyHelper from '../../helpers/createSurvey.helper';
import { addQuestion } from '../../reducer/surveySlice';
interface IProps {
  onCloseOrShowModalAddQuestion: () => void;
  idQuestion: string;
}
const ModalAddQuestions = ({
  onCloseOrShowModalAddQuestion,
  idQuestion,
}: IProps) => {
  const CreateSurveyHelperClass = new CreateSurveyHelper();
  const [urlQuestion, setUrlQuestion] = useState('/Pregunta1.jpg');
  const wrapperLiSelectionStyle = styles['wrapper-li-selection'];
  const [questionIsMandatory, setQuestionIsMandatory] = useState(false);
  const [showMessageQuestionAdd, setShowMessageQuestionAdd] = useState(false);
  const dispatch = useDispatch();

  const [titleQuestion, setTitleQuestion] = useState<string | null>(null);
  const [idTypeQuestion, setIdTypeQuestion] =
    useState<TypesQuestionsEnum | null>(null);

  const handleMouseEnter = (
    url: string,
    titleQuestionD: string | null,
    idTypeQuestionD: TypesQuestionsEnum
  ) => {
    setUrlQuestion(url);
    setTitleQuestion(titleQuestionD);
    setIdTypeQuestion(idTypeQuestionD);
    setQuestionIsMandatory(false);
  };

  const addQuestionSurvey = (idTypeQuestionD: TypesQuestionsEnum) => {
    setShowMessageQuestionAdd(true);
    setTimeout(() => {
      setShowMessageQuestionAdd(false);
    }, 1000);
    switch (idTypeQuestionD) {
      case TypesQuestionsEnum.QuestionTypeSingleOptionSelection:
        dispatch(
          addQuestion({
            question:
              CreateSurveyHelperClass.questionTypeSingleOptionSelection(
                questionIsMandatory
              ),
            idQuestion,
          })
        );
        break;

      case TypesQuestionsEnum.QuestionTypeMultipleChoice:
        dispatch(
          addQuestion({
            question:
              CreateSurveyHelperClass.questionTypeMultipleOptionSelection(
                questionIsMandatory
              ),
            idQuestion,
          })
        );
        break;

      case TypesQuestionsEnum.QuestionTypeMultiPointScale:
        dispatch(
          addQuestion({
            question:
              CreateSurveyHelperClass.questionMultiPointScale(
                questionIsMandatory
              ),
            idQuestion,
          })
        );
        break;

      case TypesQuestionsEnum.QuestionTypeCommentBox:
        dispatch(
          addQuestion({
            question:
              CreateSurveyHelperClass.questionCommentBox(questionIsMandatory),
            idQuestion,
          })
        );
        break;

      case TypesQuestionsEnum.QuestionTypeDropdownMenu:
        dispatch(
          addQuestion({
            question:
              CreateSurveyHelperClass.questionDropdowMenu(questionIsMandatory),
            idQuestion,
          })
        );
        break;

      case TypesQuestionsEnum.QuestionTypeDate:
        dispatch(
          addQuestion({
            question: CreateSurveyHelperClass.questionDate(questionIsMandatory),
            idQuestion,
          })
        );
        break;

      case TypesQuestionsEnum.QuestionTypeEmail:
        dispatch(
          addQuestion({
            question:
              CreateSurveyHelperClass.questionEmail(questionIsMandatory),
            idQuestion,
          })
        );
        break;
    }
  };
  return (
    <Modal onCloseModal={onCloseOrShowModalAddQuestion} widthClass="w-90">
      <div className={`${styles['wrapper-modal-add-questions']}`}>
        <div className={`${styles['wrapper-type-questions']}`}>
          <h1>Tipo de preguntas</h1>
          <hr />
          <ul id="ul-wrapper-questions">
            <li
              id="li-question-single-option-select"
              className={
                idTypeQuestion ===
                TypesQuestionsEnum.QuestionTypeSingleOptionSelection
                  ? `${wrapperLiSelectionStyle}`
                  : ''
              }
              onClick={() => {
                handleMouseEnter(
                  '/Pregunta1.jpg',
                  'Selección de unica opción',
                  TypesQuestionsEnum.QuestionTypeSingleOptionSelection
                );
              }}
            >
              Selección de unica opción
            </li>

            <li
              id="li-question-multiple-option-select"
              className={
                idTypeQuestion === TypesQuestionsEnum.QuestionTypeMultipleChoice
                  ? `${wrapperLiSelectionStyle}`
                  : ''
              }
              onClick={() => {
                handleMouseEnter(
                  '/Pregunta2.jpg',
                  'Selección multiple',
                  TypesQuestionsEnum.QuestionTypeMultipleChoice
                );
              }}
            >
              Selección multiple
            </li>

            <li
              id="li-question-dropdown-menu"
              className={
                idTypeQuestion === TypesQuestionsEnum.QuestionTypeDropdownMenu
                  ? `${wrapperLiSelectionStyle}`
                  : ''
              }
              onClick={() => {
                handleMouseEnter(
                  '/Pregunta3.jpg',
                  'Menú desplegable',
                  TypesQuestionsEnum.QuestionTypeDropdownMenu
                );
              }}
            >
              Menú desplegable
            </li>

            <li
              id="li-question-comment-box"
              className={
                idTypeQuestion === TypesQuestionsEnum.QuestionTypeCommentBox
                  ? `${wrapperLiSelectionStyle}`
                  : ''
              }
              onClick={() => {
                handleMouseEnter(
                  '/Pregunta4.jpg',
                  'Caja de comentarios',
                  TypesQuestionsEnum.QuestionTypeCommentBox
                );
              }}
            >
              Caja de comentarios
            </li>

            <li
              id="li-question-email"
              className={
                idTypeQuestion === TypesQuestionsEnum.QuestionTypeEmail
                  ? `${wrapperLiSelectionStyle}`
                  : ''
              }
              onClick={() => {
                handleMouseEnter(
                  '/Pregunta5.jpg',
                  'Introducción de correo',
                  TypesQuestionsEnum.QuestionTypeEmail
                );
              }}
            >
              Introducción de correo
            </li>
            <li
              id="li-question-multi-point-scale"
              className={
                idTypeQuestion ===
                TypesQuestionsEnum.QuestionTypeMultiPointScale
                  ? `${wrapperLiSelectionStyle}`
                  : ''
              }
              onClick={() => {
                handleMouseEnter(
                  '/Pregunta6.jpg',
                  'Escala varios puntos',
                  TypesQuestionsEnum.QuestionTypeMultiPointScale
                );
              }}
            >
              Escala varios puntos
            </li>

            <li
              id="li-question-date"
              className={
                idTypeQuestion === TypesQuestionsEnum.QuestionTypeDate
                  ? `${wrapperLiSelectionStyle}`
                  : ''
              }
              onClick={() => {
                handleMouseEnter(
                  '/Pregunta7.jpg',
                  'Fecha',
                  TypesQuestionsEnum.QuestionTypeDate
                );
              }}
            >
              Fecha
            </li>
          </ul>
        </div>

        <div className={`${styles['wrapper-modal-img']}`}>
          {titleQuestion && (
            <div>
              {showMessageQuestionAdd && (
                <div className="text-center">
                  <label>Pregunta agregada...</label>
                </div>
              )}
              <h1>{titleQuestion}</h1>
              <div className={`${styles['wrapper-title-content-question']}`}>
                <input
                  type="checkbox"
                  checked={questionIsMandatory}
                  id="input-chk-question-is-mandatory"
                  onChange={(e) => {
                    setQuestionIsMandatory(e.target.checked);
                  }}
                />{' '}
                Obligatoria{' '}
                <button
                  onClick={() => {
                    addQuestionSurvey(idTypeQuestion!);
                  }}
                  id="button-add-question-select"
                >
                  Agregar pregunta
                </button>
              </div>
              <hr />
              <img src={urlQuestion} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddQuestions;
