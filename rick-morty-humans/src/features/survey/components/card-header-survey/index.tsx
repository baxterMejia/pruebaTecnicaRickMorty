import stylesCardGlobal from '@/StylesGlobal/cards.global.module.scss';
import stylesInputsInstrument from '@/StylesGlobal/inputs.instruments.global.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { addHeaderSurvey } from '../../reducer/surveySlice';
import { useDispatch } from 'react-redux';
import AwsServiceSurvey from '../../hooks/AwsServiceSurvey';
import { debounce } from 'lodash';
import { ISurvey } from '../../models/survey.model';
import { waitApiSendDataDebounceSurvey } from '../../constants/typesQuestions';
interface IProps {
  surveyName: string;
  description: string;
  logoUrl: string;
  updateSurveyFormBackend: (d: ISurvey) => void;
}
const CardHeaderSurvey = ({
  surveyName,
  description,
  logoUrl,
  updateSurveyFormBackend,
}: IProps) => {
  const awsService = new AwsServiceSurvey();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(logoUrl);
  const [logoUrlLocal, setLogoUrlLocal] = useState(logoUrl);
  const [surveyNameLocal, setSurveyNameLocal] = useState(surveyName);
  const [descriptionLocal, setDescriptionLocal] = useState(description);

  useEffect(() => {
    updateStateGlobalSurvey();
  }, [surveyNameLocal, descriptionLocal, logoUrlLocal]);

  useEffect(() => {
    debouncedActualizarAPI();
    return () => {
      debouncedActualizarAPI.cancel();
    };
  }, [surveyNameLocal, logoUrlLocal, descriptionLocal]);

  const handleClick = () => {
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  };

  const handleTitleChange = (titleForm: string) => {
    setSurveyNameLocal(titleForm);
  };

  const handleDescriptionChange = (descriptionForm: string) => {
    setDescriptionLocal(descriptionForm);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileEvent = event.target.files;
    if (!fileEvent) {
      return;
    }
    const file = fileEvent[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreviewImage(base64);
      const logoUrlLo = awsService.savePicture(base64);
      setLogoUrlLocal(logoUrlLo);
    };
    reader?.readAsDataURL(file);
  };

  const handleRemovedImg = () => {
    if (!fileInputRef.current) {
      return;
    }
    setPreviewImage('');
    setLogoUrlLocal('');
    fileInputRef.current.value = '';
  };

  const updateStateGlobalSurvey = () => {
    dispatch(
      addHeaderSurvey({
        surveyName: surveyNameLocal,
        description: descriptionLocal,
        logoUrl: logoUrlLocal,
      })
    );
  };

  //Actualizando componentes. Enviando al Backend
  const onUpdateCardService = () => {
    updateSurveyFormBackend({
      surveyName: surveyNameLocal,
      description: descriptionLocal,
      logoUrl: logoUrlLocal,
    } as any);
  };
  const debouncedActualizarAPI = debounce(
    onUpdateCardService,
    waitApiSendDataDebounceSurvey
  );

  return (
    <div className={`${stylesCardGlobal['card-main']}`}>
      <div>
        <input
          type="text"
          placeholder="Titulo encuesta"
          value={surveyNameLocal}
          maxLength={200}
          onChange={(e) => {
            handleTitleChange(e.target.value);
          }}
          id="input-survey-name"
          className={`${stylesInputsInstrument['input-form-instrument-label']}`}
        />
      </div>
      <hr />
      <div>
        <h1>Logo</h1>
        {!previewImage && (
          <div
            className={`${styles['wrapper-load-file']}`}
            onClick={handleClick}
            id="file-input-load-img"
          >
            <i className="pi pi-cloud-upload" />
          </div>
        )}
        {previewImage && (
          <div className={`${styles['wrapper-img-preview']}`}>
            <span onClick={handleRemovedImg} id="removed-img-header-logo">
              X
            </span>
            <img
              src={previewImage}
              alt="Preview"
              onClick={handleClick}
              id="img-header-logo"
            />
          </div>
        )}
        <input
          style={{ visibility: 'hidden' }}
          onChange={handleFileChange}
          type="file"
          ref={fileInputRef}
          id="input-file-logo-survey"
        />
      </div>

      <div>
        <h1>Descripción</h1>
        <textarea
          onChange={(e) => {
            handleDescriptionChange(e.target.value);
          }}
          maxLength={1000}
          value={descriptionLocal}
          placeholder="Descripción encuesta"
          id="textarea-description-survey"
          className={`${stylesInputsInstrument['input-form-instrument-textarea']}`}
        />
      </div>
    </div>
  );
};

export default CardHeaderSurvey;
