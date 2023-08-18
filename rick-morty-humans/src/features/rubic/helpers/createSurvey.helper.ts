import { v4 as uuidv4 } from 'uuid';
import {
  ITypeQuestionCommentBox,
  ITypeQuestionDate,
  ITypeQuestionDropdownMenu,
  ITypeQuestionEmail,
  ITypeQuestionMultiPointScale,
  ITypeSingleOptionSelection,
} from '../models/survey.model';
import { TypesQuestionsEnum } from '../constants/typesQuestions';
import {
  daysDate,
  monthsDate,
  yearsDate,
} from '../constants/initialDataQuestionDate';
export default class CreateSurveyHelper {
  public validateRichTextImageSize(images: Array<string>) {
    let imageExistsExceedsSize = false;
    for (const image of images) {
      const imgSrcMatch = image.match(/src="([^"]+)"/);
      if (imgSrcMatch) {
        const base64Data = imgSrcMatch[1].split(',')[1];
        const fileSizeInBytes = window.atob(base64Data).length;
        const fileSizeInKB = fileSizeInBytes / 1024;
        const roundedFileSizeInKB = Math.round(fileSizeInKB * 100) / 100;
        ///console.log('Tamaño del archivo en KB:', roundedFileSizeInKB);
        if (roundedFileSizeInKB > 1000) {
          imageExistsExceedsSize = true;
          // console.log('La imagen excede el tamaño máximo permitido');
        }
      }
    }
    return imageExistsExceedsSize;
  }

  public questionTypeSingleOptionSelection(
    questionIsMandatory: boolean
  ): ITypeSingleOptionSelection {
    return {
      id: uuidv4(),
      titleQuestion: 'Pregunta selección de única opción',
      typeQuestion: TypesQuestionsEnum.QuestionTypeSingleOptionSelection,
      options: [
        {
          id: uuidv4(),
          option: 'Opción...',
        },
      ],
      questionIsMandatory,
    };
  }

  public questionTypeMultipleOptionSelection(
    questionIsMandatory: boolean
  ): ITypeSingleOptionSelection {
    return {
      id: uuidv4(),
      titleQuestion: 'Pregunta selección multiple',
      typeQuestion: TypesQuestionsEnum.QuestionTypeMultipleChoice,
      options: [
        {
          id: uuidv4(),
          option: 'Opción...',
        },
      ],
      questionIsMandatory,
    };
  }

  public questionMultiPointScale(
    questionIsMandatory: boolean
  ): ITypeQuestionMultiPointScale {
    return {
      id: uuidv4(),
      titleQuestion: 'Pregunta escala varios puntos',
      description: 'Descripción...',
      typeQuestion: TypesQuestionsEnum.QuestionTypeMultiPointScale,
      questionIsMandatory,
      matrix: [
        ['', 'Columna...'],
        ['Fila...', uuidv4()],
      ],
    };
  }

  public questionCommentBox(
    questionIsMandatory: boolean
  ): ITypeQuestionCommentBox {
    return {
      id: uuidv4(),
      titleQuestion: 'Pregunta caja de comentarios',
      typeQuestion: TypesQuestionsEnum.QuestionTypeCommentBox,
      questionIsMandatory,
    };
  }

  public questionDropdowMenu(
    questionIsMandatory: boolean
  ): ITypeQuestionDropdownMenu {
    return {
      id: uuidv4(),
      titleQuestion: 'Pregunta menú desplegable',
      typeQuestion: TypesQuestionsEnum.QuestionTypeDropdownMenu,
      questionIsMandatory,
      options: [
        {
          id: uuidv4(),
          option: 'Opción...',
        },
      ],
    };
  }

  public questionDate(questionIsMandatory: boolean): ITypeQuestionDate {
    return {
      id: uuidv4(),
      titleQuestion: 'Pregunta fecha',
      typeQuestion: TypesQuestionsEnum.QuestionTypeDate,
      questionIsMandatory,
      days: daysDate,
      months: monthsDate,
      years: yearsDate(),
    };
  }

  public questionEmail(questionIsMandatory: boolean): ITypeQuestionEmail {
    return {
      id: uuidv4(),
      titleQuestion: 'Pregunta introducción de correo',
      typeQuestion: TypesQuestionsEnum.QuestionTypeEmail,
      questionIsMandatory,
    };
  }
}
