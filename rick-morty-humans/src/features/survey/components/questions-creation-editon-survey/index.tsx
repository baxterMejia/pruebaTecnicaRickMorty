import { TypesQuestionsEnum } from '../../constants/typesQuestions';
import {
  ITypeMultipleOptionSelection,
  ITypeQuestionCommentBox,
  ITypeQuestionDate,
  ITypeQuestionDropdownMenu,
  ITypeQuestionEmail,
  ITypeQuestionGraphicClassificationOfSmileys,
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
import CardQuestionMultipleChoiceScale from '../card-question-multiple-choice-scale';
import CardQuestionGraphicClassificationOfSmileys from '../card-question-graphic-classification-of-smileys';
interface IProps {
  questions: Array<typesOfQuestionsSurveyTypes>;
  removeQuestionOfSurvey: (idQuestion: string) => void;
}

const questionsCreationEditionSurvey = ({
  questions,
  removeQuestionOfSurvey,
}: IProps) => {
  const onCardQuestionTypeSingleOptionSelection = (
    d: ITypeSingleOptionSelection
  ) => (
    <div key={d.id} className="mt-25">
      <CardQuestionTypeSingleOptionSelection
        {...d}
        removeQuestionOfSurvey={removeQuestionOfSurvey}
      />
    </div>
  );

  const onCardQuestionTypeMultipleChoiceSelection = (
    d: ITypeMultipleOptionSelection
  ) => (
    <div key={d.id} className="mt-25">
      <CardQuestionTypeMultipleChoiceSelection
        {...d}
        removeQuestionOfSurvey={removeQuestionOfSurvey}
      />
    </div>
  );

  const onCardQuestionDropdownMenu = (d: ITypeQuestionDropdownMenu) => (
    <div key={d.id} className="mt-25">
      <CardQuestionDropdownMenu
        {...d}
        removeQuestionOfSurvey={removeQuestionOfSurvey}
      />
    </div>
  );

  const onCardQuestionCommentBox = (d: ITypeQuestionCommentBox) => (
    <div key={d.id} className="mt-25">
      <CardQuestionCommentBox
        {...d}
        removeQuestionOfSurvey={removeQuestionOfSurvey}
      />
    </div>
  );

  const onCardQuestionEmail = (d: ITypeQuestionEmail) => (
    <div key={d.id} className="mt-25">
      <CardQuestionEmail
        {...d}
        removeQuestionOfSurvey={removeQuestionOfSurvey}
      />
    </div>
  );

  const onCardMultiPointScale = (d: ITypeQuestionMultiPointScale) => (
    <div key={d.id} className="mt-25">
      <CardQuestionMultiPointScale
        {...d}
        removeQuestionOfSurvey={removeQuestionOfSurvey}
      />
    </div>
  );

  const onCardMultipleChoiceScale = (d: ITypeQuestionMultiPointScale) => (
    <div key={d.id} className="mt-25">
      <CardQuestionMultipleChoiceScale
        {...d}
        removeQuestionOfSurvey={removeQuestionOfSurvey}
      />
    </div>
  );

  const onCardQuestionDate = (d: ITypeQuestionDate) => (
    <div key={d.id} className="mt-25">
      <CardQuestionDate
        {...d}
        removeQuestionOfSurvey={removeQuestionOfSurvey}
      />
    </div>
  );

  const onCardQuestionTypeGraphicClassificationOfSmileys = (
    d: ITypeQuestionGraphicClassificationOfSmileys
  ) => (
    <div key={d.id} className="mt-25">
      <CardQuestionGraphicClassificationOfSmileys
        {...d}
        removeQuestionOfSurvey={removeQuestionOfSurvey}
      />
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

      case TypesQuestionsEnum.QuestionMultipleChoiceScale:
        componentQuestion = onCardMultipleChoiceScale(
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

      case TypesQuestionsEnum.QuestionGraphicClassificationOfSmileys:
        componentQuestion = onCardQuestionTypeGraphicClassificationOfSmileys(
          d as ITypeQuestionGraphicClassificationOfSmileys
        );
        break;

      default:
        componentQuestion = null;
        break;
    }
    return componentQuestion;
  });
};

export default questionsCreationEditionSurvey;
