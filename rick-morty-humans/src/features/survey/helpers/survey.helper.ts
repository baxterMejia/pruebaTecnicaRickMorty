import { v4 as uuidv4 } from 'uuid';
import {
  ITypeQuestionCommentBox,
  ITypeQuestionDate,
  ITypeQuestionDropdownMenu,
  ITypeQuestionEmail,
  ITypeQuestionGraphicClassificationOfSmileys,
  ITypeQuestionMultiPointScale,
  ITypeSingleOptionSelection,
} from '../models/survey.model';
import { TypesQuestionsEnum } from '../constants/typesQuestions';
import {
  daysDate,
  monthsDate,
  yearsDate,
} from '../constants/initialDataQuestionDate';
import { TypesGraphicSmileys } from '../constants/typesGraphicSmileys';
export default class SurveyHelper {
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
      arrayOfConditionedResponses: [],
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
      arrayOfConditionedResponses: [],
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
      arrayOfConditionedResponses: [],
      matrix: [
        ['', 'Columna...'],
        ['Fila...', uuidv4()],
      ],
    };
  }

  public questionMultipleChoiceScale(
    questionIsMandatory: boolean
  ): ITypeQuestionMultiPointScale {
    return {
      id: uuidv4(),
      titleQuestion: 'Pregunta escala varios puntos',
      description: 'Descripción...',
      typeQuestion: TypesQuestionsEnum.QuestionMultipleChoiceScale,
      questionIsMandatory,
      arrayOfConditionedResponses: [],
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

  public generateYearsByParameterInitialToCurrent(
    yearInitial: number
  ): Array<{ id: number; description: string }> {
    const yearNow = new Date().getFullYear();
    const years = [];

    for (let i = yearInitial; i <= yearNow; i++) {
      years.push({
        id: i,
        description: String(i),
      });
    }

    return years;
  }

  public questionGraphicClassificationOfSmileys(
    questionIsMandatory: boolean
  ): ITypeQuestionGraphicClassificationOfSmileys {
    return {
      id: uuidv4(),
      titleQuestion: 'Pregunta clasificación gráfica puntuación de caritas',
      typeQuestion: TypesQuestionsEnum.QuestionGraphicClassificationOfSmileys,
      questionIsMandatory,
      smileys: [
        {
          id: TypesGraphicSmileys.smileyVeryUnsatisfied,
          description: 'Estado 1',
          img: '/Cara1.jpg',
        },
        {
          id: TypesGraphicSmileys.smileyUnsatisfied,
          description: 'Estado 2',
          img: '/Cara2.jpg',
        },
        {
          id: TypesGraphicSmileys.smileyNeutral,
          description: 'Estado 3',
          img: '/Cara3.jpg',
        },
        {
          id: TypesGraphicSmileys.smileySatisfied,
          description: 'Estado 4',
          img: '/Cara4.jpg',
        },
        {
          id: TypesGraphicSmileys.smileyVerySatisfied,
          description: 'Estado 5',
          img: '/Cara5.jpg',
        },
      ],
    };
  }
}
