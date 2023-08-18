import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInformedConsent } from '../../reducer/surveySlice';
import { ISurvey } from '../../models/survey.model';
import { debounce } from 'lodash';
import { waitApiSendDataDebounceSurvey } from '../../constants/typesQuestions';
import styles from './styles.module.scss';

interface IProps {
  informedConsent: string;
  showInformedConsentToUsers: boolean;
  updateSurveyFormBackend: (d: ISurvey) => void;
}
const CardInformedConsent = ({
  informedConsent,
  showInformedConsentToUsers,
  updateSurveyFormBackend,
}: IProps) => {
  const dispatch = useDispatch();
  const [informedConsentLocal, setInformedConsentLocal] =
    useState(informedConsent);
  const [showInformedConsentToUsersLocal, setShowInformedConsentToUsersLocal] =
    useState(showInformedConsentToUsers);

  useEffect(() => {
    updateStateGlobalSurvey();
  }, [informedConsentLocal, showInformedConsentToUsersLocal]);

  const updateStateGlobalSurvey = () => {
    dispatch(
      addInformedConsent({
        informedConsent: informedConsentLocal,
        showInformedConsentToUsers: showInformedConsentToUsersLocal,
      })
    );
  };

  const handleTextChange = (e: EditorTextChangeEvent) => {
    const content = e.htmlValue?.trim();
    /* 
   // NO BORRAR es para cuando se haga la integración con S3 poder obtener las imagenes
   // del componente editor y procesarlas. Ya que se debe restringir sus Pesos y procesamiento
   // con S3
   const images = content.match(/<img[^>]+>/g);
    setRefreshEditor(false);
    if (images) {
      const exist = createSurveyHelperClass.validateRichTextImageSize(images);
      if (exist) {
        setInformedConsentLocal('<h1>prueba</h1>');
        setRefreshEditor(true);
        return;
      }
    }*/
    setInformedConsentLocal(content ?? '');
  };

  useEffect(() => {
    debouncedActualizarAPI();
    return () => {
      debouncedActualizarAPI.cancel();
    };
  }, [informedConsentLocal, showInformedConsentToUsersLocal]);
  //Actualizando card. Enviando al Backend
  const onUpdateCardService = () => {
    updateSurveyFormBackend({
      informedConsent: informedConsentLocal,
      showInformedConsentToUsers: showInformedConsentToUsersLocal,
    } as any);
  };
  const debouncedActualizarAPI = debounce(
    onUpdateCardService,
    waitApiSendDataDebounceSurvey
  );
  return (
    <div className={`${stylesCardGlobal['card-main']}`}>
      <div className={`${styles['wrapper-title']}`}>
        <h1>Consentimiento informado</h1>
        <label>
          <input
            type="checkbox"
            checked={showInformedConsentToUsersLocal}
            onChange={(e) => {
              setShowInformedConsentToUsersLocal(e.target.checked);
            }}
          />{' '}
          Agregar consentimiento
        </label>
      </div>
      <hr />
      <div>
        <Editor
          id="message-informed-consent"
          value={informedConsentLocal}
          onTextChange={handleTextChange}
          style={{ height: '320px' }}
        ></Editor>
      </div>
    </div>
  );
};
export default CardInformedConsent;
