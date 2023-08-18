import { TypesQuestionsEnum } from '../../constants/typesQuestions';
import {
  ITypeMultipleOptionSelection,
  ITypeQuestionCommentBox,
  ITypeQuestionDate,
  ITypeQuestionDropdownMenu,
  ITypeQuestionEmail,
  ITypeQuestionMultiPointScale,
  ITypeSingleOptionSelection,
  typesOfQuestionsSurveyTypes,
} from '../../models/survey.model';
import CardQuestionMultiPointScale from '../card-question-multi-point-scale';
import CardQuestionCommentBox from '../card-question-comment-box';
import CardQuestionDate from '../card-question-date';
import CardQuestionDropdownMenu from '../card-question-dropdown-menu';
import CardQuestionEmail from '../card-question-email';
import CardQuestionTypeMultipleChoiceSelection from '../card-question-type-multiple-choice-selection';
import CardQuestionTypeSingleOptionSelection from '../card-question-type-single-option-selection';

interface IProps {
  questions: Array<typesOfQuestionsSurveyTypes>;
}

const questionsCreationEditionSurvey = ({ questions }: IProps) => {
  const onCardQuestionTypeSingleOptionSelection = (
    d: ITypeSingleOptionSelection
  ) => (
    <div key={d.id} className="mt-25">
      <CardQuestionTypeSingleOptionSelection {...d} />
    </div>
  );

  const onCardQuestionTypeMultipleChoiceSelection = (
    d: ITypeMultipleOptionSelection
  ) => (
    <div key={d.id} className="mt-25">
      <CardQuestionTypeMultipleChoiceSelection {...d} />
    </div>
  );

  const onCardQuestionDropdownMenu = (d: ITypeQuestionDropdownMenu) => (
    <div key={d.id} className="mt-25">
      <CardQuestionDropdownMenu {...d} />
    </div>
  );

  const onCardQuestionCommentBox = (d: ITypeQuestionCommentBox) => (
    <div key={d.id} className="mt-25">
      <CardQuestionCommentBox {...d} />
    </div>
  );

  const onCardQuestionEmail = (d: ITypeQuestionEmail) => (
    <div key={d.id} className="mt-25">
      <CardQuestionEmail {...d} />
    </div>
  );

  const onCardMultiPointScale = (d: ITypeQuestionMultiPointScale) => (
    <div key={d.id} className="mt-25">
      <CardQuestionMultiPointScale {...d} />
    </div>
  );

  const onCardQuestionDate = (d: ITypeQuestionDate) => (
    <div key={d.id} className="mt-25">
      <CardQuestionDate {...d} />
    </div>
  );

  return questions.map((d) => {
    let componentQuestion;
    switch (d.typeQuestion) {
      case TypesQuestionsEnum.QuestionTypeSingleOptionSelection:
        componentQuestion = onCardQuestionTypeSingleOptionSelection(
          d as ITypeMultipleOptionSelection
        );
        break;

      case TypesQuestionsEnum.QuestionTypeMultipleChoice:
        componentQuestion = onCardQuestionTypeMultipleChoiceSelection(
          d as ITypeMultipleOptionSelection
        );

        break;

      case TypesQuestionsEnum.QuestionTypeMultiPointScale:
        componentQuestion = onCardMultiPointScale(
          d as ITypeQuestionMultiPointScale
        );
        break;

      case TypesQuestionsEnum.QuestionTypeCommentBox:
        componentQuestion = onCardQuestionCommentBox(
          d as ITypeQuestionCommentBox
        );
        break;

      case TypesQuestionsEnum.QuestionTypeDropdownMenu:
        componentQuestion = onCardQuestionDropdownMenu(
          d as ITypeQuestionDropdownMenu
        );
        break;

      case TypesQuestionsEnum.QuestionTypeDate:
        componentQuestion = onCardQuestionDate(d as ITypeQuestionDate);
        break;

      case TypesQuestionsEnum.QuestionTypeEmail:
        componentQuestion = onCardQuestionEmail(d as ITypeQuestionEmail);
        break;

      default:
        componentQuestion = null;
        break;
    }
    return componentQuestion;
  });
};

export default questionsCreationEditionSurvey;
