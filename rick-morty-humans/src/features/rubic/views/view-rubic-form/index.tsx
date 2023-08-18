import stylesGlobalPages from '@/StylesGlobal/pages.global.module.scss';
import CardHeaderSurvey from '../../components/card-header-survey';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSurvey from '../../hooks/useSurver';
import SharedMessageModal from '@/src/shared/components/shared-message-modal';
import {
  IMessageModal,
  ITypeMessageModal,
} from '@/src/shared/components/models/shared.model';
import { enumMessageInstruments } from '@/src/features/instruments/constants/messageInstruments';
import { enumMessageRubric } from '@/src/features/rubic/constants/messageRubric';
import { statesInstruments } from '@/src/features/constantsGlobal/statesInstruments';
import styles from './styles.module.scss';
import { ISurvey } from '../../models/survey.model';
import CardInformedConsent from '../../components/card-informed-consent';
import CardInvitationToAnswerSurvey from '../../components/card-invitation-to-answer-the-survey';
import CardThankYouMessage from '../../components/card-thank-you-message';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import {
  initDataSurvey,
  resetSurveyStatusGlobal,
} from '../../reducer/surveySlice';
import QuestionsCreationEditionSurvey from '../../components/questions-creation-editon-survey';
import { debounce } from 'lodash';
import { waitApiSendDataDebounceSurvey } from '../../constants/typesQuestions';
import ModalEndSurvey from '../../components/modal-end-survey';
const ViewRubicForm = () => {
  const router = useRouter();
  const [saveChangeFormSurvey, setSaveChangeFormSurvey] = useState(false);
  const [loadInitialSurvey, setLoadInitialSurvey] = useState(true);
  const [showModalEndSurvey, setShowModalEndSurvey] = useState(false);
  const { idSurvey } = router.query;
  const dispatch = useDispatch();
  const { getSurveyById, updateSurveyByIdService, survey } = useSurvey();
  const surveyStateGlobal = useSelector(
    (state: RootState) => state.surveyComponent.survey
  );
  const [sharedMessageSucces, setSharedMessageSucces] = useState<IMessageModal>(
    {
      title: '',
      message: '',
      show: false,
      buttonActionAccept: () => {},
      buttonActionClose: () => {},
      typeMessage: ITypeMessageModal.informative,
    }
  );
  //Consultamos la información inicial de la encuesta
  useEffect(() => {
    if (!idSurvey) {
      return;
    }
    onGetSurveyById();
  }, [idSurvey]);
  //Reiniciar estado global cuando se desmonte el componente
  useEffect(() => {
    return () => {
      dispatch(resetSurveyStatusGlobal());
    };
  }, []);

  //Con la información traida de backend de encuestas. Se inicializa el estado global de encuestas
  useEffect(() => {
    if (!survey) {
      return;
    }
    dispatch(initDataSurvey(survey));
    setLoadInitialSurvey(false);
  }, [survey]);

  const onSetSharedMessageSucces = (
    title: string,
    message: string,
    show: boolean,
    buttonActionAccept: () => void,
    buttonActionClose: () => void,
    typeMessage: number
  ) => {
    setSharedMessageSucces({
      title,
      message,
      show,
      buttonActionAccept,
      buttonActionClose,
      typeMessage,
    });
  };

  const onCloseSharedMessageSucces = () => {
    onSetSharedMessageSucces(
      '',
      '',
      false,
      () => {},
      () => {},
      ITypeMessageModal.fail
    );
  };

  const onGetSurveyById = async () => {
    try {
      await getSurveyById(idSurvey as string);
    } catch {
      onSetSharedMessageSucces(
        enumMessageRubric.failedOperation,
        enumMessageRubric.serviceGeneratedError,
        true,
        () => {
          onCloseSharedMessageSucces();
        },
        () => {},
        ITypeMessageModal.fail
      );
    }
  };
  // Actualizar al backend solo la data de preguntas de la data global
  useEffect(() => {
    debouncedActualizarAPI();
    return () => {
      debouncedActualizarAPI.cancel();
    };
  }, [surveyStateGlobal.questions]);

  const debouncedActualizarAPI = debounce(() => {
    
  }, waitApiSendDataDebounceSurvey);

  const updateSurveyFormBackend = async (
    dataNew: ISurvey,
    surveyGlobal: ISurvey | null
  ) => {
    if (loadInitialSurvey) {
      return;
    }
    try {
      let setSurveyForm = {};
      if (surveyGlobal) {
        setSurveyForm = {
          questions: surveyGlobal.questions,
          id: surveyStateGlobal.id,
        };
      } else {
        setSurveyForm = {
          ...dataNew,
          id: surveyStateGlobal.id,
        };
      }

      setSaveChangeFormSurvey(true);
      await updateSurveyByIdService(setSurveyForm as ISurvey);
      setSaveChangeFormSurvey(false);
    } catch {
      setSaveChangeFormSurvey(false);
      onSetSharedMessageSucces(
        enumMessageRubric.failedOperation,
        enumMessageRubric.serviceGeneratedError,
        true,
        () => {
          onCloseSharedMessageSucces();
        },
        () => {},
        ITypeMessageModal.fail
      );
    }
  };

  const handleFormSearchInstrument = () => {
    router.push(`/Instrumentos`);
  };

  const handleShowModalEndSurvey = () => {
    setShowModalEndSurvey(!showModalEndSurvey);
  };
  return (
    <>
      <div
        className={`${stylesGlobalPages['wrapper-page']} ${styles['wrapper-header']}`}
      >
        <div className={`${styles['wrapper-header-view-form']}`}>
          <div>
            <h1>ID Rubrica: {surveyStateGlobal?.id}</h1>
          </div>
  
          <div>
            <h1>
              Estado:{" "}
              {
                statesInstruments.find(
                  (d) => d.id === surveyStateGlobal?.idState
                )?.description
              }
            </h1>
            {saveChangeFormSurvey && <label>Guardando cambios...</label>}
          </div>
        </div>
        <br />
        <CardHeaderSurvey
          surveyName={surveyStateGlobal?.surveyName || ""}
          description={surveyStateGlobal?.description || ""}
          logoUrl={surveyStateGlobal?.logoUrl || ""}
          updateSurveyFormBackend={(data) => {
            updateSurveyFormBackend(data, null);
          }}
        />
        <div className="mt-25">
          <CardInformedConsent
            informedConsent={surveyStateGlobal?.informedConsent || ""}
            updateSurveyFormBackend={(data) => {
              updateSurveyFormBackend(data, null);
            }}
          />
        </div>
        <div className="mt-25">
          <CardInvitationToAnswerSurvey
            invitationToAnswerSurvey={
              surveyStateGlobal?.invitationToAnswerSurvey || ""
            }
            updateSurveyFormBackend={(data) => {
              updateSurveyFormBackend(data, null);
            }}
          />
        </div>
        <div className="mt-25">
          <CardThankYouMessage
            thankYouMessage={surveyStateGlobal?.thankYouMessage || ""}
            updateSurveyFormBackend={(data) => {
              updateSurveyFormBackend(data, null);
            }}
          />
        </div>
  
        {/* <div>
          <QuestionsCreationEditionSurvey
            questions={surveyStateGlobal?.questions || []}
          />
        </div> */}
        <button
          onClick={() => {
            console.log(surveyStateGlobal);
          }}
        >
          a
        </button>
      </div>
      <br /> <br />
      <div className={`${stylesGlobalPages['wrapper-stycky-footer-page']}`}>
        <div>
          <button onClick={handleFormSearchInstrument}>Regresar</button>
        </div>
        <div>
          <button onClick={handleShowModalEndSurvey}>Finalizar</button>
        </div>
      </div>
      <SharedMessageModal {...sharedMessageSucces} />
      {showModalEndSurvey && (
        <ModalEndSurvey handleShowModalEndSurvey={handleShowModalEndSurvey} />
      )}
    </>
  );
};

export default ViewRubicForm;
