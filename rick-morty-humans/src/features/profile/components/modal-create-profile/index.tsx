import stylesInputs from '@/StylesGlobal/inputs.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import useSurvey from '@/src/features/survey/hooks/useSurver';
import {
  IMessageModal,
  ITypeMessageModal,
} from '@/src/shared/components/models/shared.model';

import Modal from '@/src/shared/components/shared-modal/modal';
import SharedMessageModal from '@/src/shared/components/shared-message-modal';
import stylesButtonGlobal from '@/StylesGlobal/buttons.global.module.scss';
import {
  TypesOfInstruments,
  TypesOfInstrumentsEnum,
} from '@/src/features/instruments/constants/typesOfInstruments';
import { enumMessageInstruments } from '@/src/features/instruments/constants/messageInstruments';
import { enumMessageGlobals } from '@/src/features/constantsGlobal/messageGlobals';

interface IProps {
  onSetShowCreateInstrument: () => void;
}

const ModalCreateProfile = ({ onSetShowCreateInstrument }: IProps) => {
  const [visibilityComponent, setVisibilityComponent] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { createSurveyService } = useSurvey();
  const router = useRouter();
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

  const onSubmit = handleSubmit(async (data) => {
    const { typeInstrument, surveyName } = data;
    if (typeInstrument === TypesOfInstrumentsEnum.survey) {
      createSurvey(surveyName);
    }
  });

  const createSurvey = async (surveyName: string) => {
    try {
      const { data } = await createSurveyService({ surveyName });
      setVisibilityComponent(false);
      onSetSharedMessageSucces(
        enumMessageGlobals.successfilOperationTitle,
        enumMessageInstruments.createdSurveyMessage,
        true,
        () => {
          router.push(`/Encuestas/CrearEncuesta/${data.id}`);
        },
        () => {},
        ITypeMessageModal.success
      );
    } catch (e) {
      setVisibilityComponent(false);
      onSetSharedMessageSucces(
        enumMessageGlobals.failedOperation,
        enumMessageGlobals.serviceGeneratedError,
        true,
        () => {
          onCloseSharedMessageSucces();
        },
        () => {},
        ITypeMessageModal.fail
      );
    }
  };

  const createRubric = () => {
    try {
    } catch (e) {
      console.error(e);
    }
  };

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

  return (
    <div>
      <div style={{ visibility: visibilityComponent ? 'visible' : 'hidden' }}>
        <Modal
          title=""
          widthClass="w-50"
          onCloseModal={onSetShowCreateInstrument}
        >
          <form onSubmit={onSubmit} id="form-create-instrument">
            <div className="row">
              <div className="col-lg-12">
                <label className={stylesLabel['label-form-main']}>
                  Nombre del instrumento
                </label>
                <input
                  type="text"
                  className={`${
                    errors.surveyName && stylesInputs['input-form-main--error']
                  } ${stylesInputs['input-form-main']}`}
                  {...register('surveyName', { required: true })}
                />
                {errors.surveyName && (
                  <span className={stylesLabel['label-form-error']}>
                    Campo requerido
                  </span>
                )}
              </div>

              <div className="col-lg-12">
                <label className={stylesLabel['label-form-main']}>
                  Tipo de instrumento
                </label>

                <Controller
                  name="typeInstrument"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      options={TypesOfInstruments}
                      optionLabel="description"
                      optionValue="id"
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>
          </form>
          <hr />
          <div className="text-right">
            <button
              onClick={onSetShowCreateInstrument}
              className={stylesButtonGlobal['button-tertiary']}
            >
              Cancelar
            </button>
            <button
              form="form-create-instrument"
              id="button-search-survey"
              className={stylesButtonGlobal['button-primary']}
            >
              Crear
            </button>
          </div>
        </Modal>
      </div>
      <SharedMessageModal {...sharedMessageSucces} />
    </div>
  );
};

export default ModalCreateProfile;
