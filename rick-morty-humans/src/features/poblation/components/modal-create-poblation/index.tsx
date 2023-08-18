import stylesInputs from '@/StylesGlobal/inputs.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSurvey from '@/src/features/survey/hooks/useSurver';
import {
  IMessageModal,
  ITypeMessageModal,
} from '@/src/shared/components/models/shared.model';

import Modal from '@/src/shared/components/shared-modal/modal';
import SharedMessageModal from '@/src/shared/components/shared-message-modal';
import stylesButtonGlobal from '@/StylesGlobal/buttons.global.module.scss';
import usePoblation from '../../hooks/UsePoblation';
import { IPoblation, IPoblationCreateD } from '../../models/poblation.model';
import { enumMessagePoblation } from '../../constants/messagePoblation';

interface IProps {
  onSetShowCreateInstrument: (data?: any) => void; // Actualizar la firma de la función aquí
  initialData?: IPoblation;
}

const ModalCreatePoblation = ({ onSetShowCreateInstrument, initialData }: IProps) => {  
  const [visibilityComponent, setVisibilityComponent] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm();
  const { createPoblationService, updatePoblationByIdService } = usePoblation();
  const router = useRouter();
  const [sharedMessageSucces, setSharedMessageSucces] = useState<IMessageModal>(
    {
      title: '',
      message: '',
      show: false,
      buttonActionAccept: () => { },
      buttonActionClose: () => { },
      typeMessage: ITypeMessageModal.informative,
    }
  );

  useEffect(() => {
    if (initialData) {
      // Utiliza reset para asignar los valores iniciales al formulario
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = handleSubmit(async (data) => { 
    var Info: IPoblationCreateD = {
      id: initialData?.id !== undefined ? initialData?.id : 0,
      description: data.descripcion,
      status: true,
      availableDate: new Date(),
    };
    if (Info.id == 0) {
      createPoblation(Info);
    }
    else {
      updatePoblation(Info);
    }
  });

  const createPoblation = async (poblation: IPoblationCreateD) => {
    try {
      const data = await createPoblationService(poblation);
      if (data != 0) {
        setVisibilityComponent(false);
        onSetSharedMessageSucces(
          enumMessagePoblation.successfilOperationTitle,
          enumMessagePoblation.createdSurveyMessage,
          true,
          () => {
            onCloseSharedMessageSucces();
          },
          () => { },
          ITypeMessageModal.success
        );
      }
      else {
        setVisibilityComponent(false);
        onSetSharedMessageSucces(
          enumMessagePoblation.failedOperation,
          enumMessagePoblation.serviceGeneratedError,
          true,
          () => {
            onCloseSharedMessageSucces();
          },
          () => { },
          ITypeMessageModal.fail
        );
      }
    } catch (e) {
      setVisibilityComponent(false);
      onSetSharedMessageSucces(
        enumMessagePoblation.failedOperation,
        enumMessagePoblation.serviceGeneratedError,
        true,
        () => {
          onCloseSharedMessageSucces();
        },
        () => { },
        ITypeMessageModal.fail
      );
    }
  };

  const updatePoblation = async (poblation: IPoblationCreateD) => {
    try {
      const data = await updatePoblationByIdService(poblation);
      if (data != 0) {
        setVisibilityComponent(false);
        onSetSharedMessageSucces(
          enumMessagePoblation.successfilOperationTitle,
          enumMessagePoblation.updateSurveyMessage,
          true,
          () => {
            onCloseSharedMessageSucces();
          },
          () => { },
          ITypeMessageModal.success
        );
      }
      else {
        setVisibilityComponent(false);
        onSetSharedMessageSucces(
          enumMessagePoblation.failedOperation,
          enumMessagePoblation.serviceGeneratedError,
          true,
          () => {
            onCloseSharedMessageSucces();
          },
          () => { },
          ITypeMessageModal.fail
        );
      }
    } catch (e) {
      setVisibilityComponent(false);
      onSetSharedMessageSucces(
        enumMessagePoblation.failedOperation,
        enumMessagePoblation.serviceGeneratedError,
        true,
        () => {
          onCloseSharedMessageSucces();
        },
        () => { },
        ITypeMessageModal.fail
      );
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
      () => { },
      () => { },
      ITypeMessageModal.fail
    );
  };

  return (
    <div>
      <div style={{ visibility: visibilityComponent ? 'visible' : 'hidden' }}>
        <Modal
          title="Crear Población Objetivo"
          widthClass="w-50"
          onCloseModal={onSetShowCreateInstrument}
        >
          <form onSubmit={onSubmit} id="form-create-instrument">
            <div className="row">
              <div className="col-lg-12">
                <label className={stylesLabel['label-form-main']}>
                  Descripción
                </label>
                <input
                  type="text"
                  className={`${errors.surveyName && stylesInputs['input-form-main--error']
                    } ${stylesInputs['input-form-main']}`}
                  {...register('description', { required: true })}
                />
                {errors.surveyName && (
                  <span className={stylesLabel['label-form-error']}>
                    Campo requerido
                  </span>
                )}
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
              {initialData ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </Modal>
      </div>
      <SharedMessageModal {...sharedMessageSucces} />
    </div>
  );
};

export default ModalCreatePoblation;
