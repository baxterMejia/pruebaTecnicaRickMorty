import stylesInputs from '@/StylesGlobal/inputs.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
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
import { TypesOfInstruments, TypesOfInstrumentsEnum } from '@/src/features/instruments/constants/typesOfInstruments';
import { enumMessageInstruments } from '@/src/features/instruments/constants/messageInstruments';
import { IUser, IUserCreateD } from '../../models/User.model';
import useUser from '../../hooks/UseUser';
import { enumMessageUser } from '../../constants/messageUser';

interface IProps {
  onSetShowCreateInstrument: (data?: any) => void; // Actualizar la firma de la función aquí
  initialData?: IUser;
}

const ModalCreateUser = ({ onSetShowCreateInstrument , initialData }: IProps) => {
  const [visibilityComponent, setVisibilityComponent] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm();
  const { createUserService , updateUserByIdService } = useUser();
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

  useEffect(() => {
    if (initialData) {
      // Utiliza reset para asignar los valores iniciales al formulario
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = handleSubmit(async (data) => {
    var Info : IUserCreateD = {
      id: initialData?.id !== undefined ? initialData?.id : 0,
      firtsName: data.firtsName,
      secondName: data.secondName,
      availableDate : new Date(),
      mail : data.mail,
      username : data.username,
      profile : data.profile,
      status : true,
    }
    if (Info.id == 0) {
      createUser(Info);
    }
    else {
      updateUser(Info);
    }
  });

  const createUser = async (poblation: IUserCreateD) => {
    try {
      const data = await createUserService(poblation);
      if (data != 0) {
        setVisibilityComponent(false);
        onSetSharedMessageSucces(
          enumMessageUser.successfilOperationTitle,
          enumMessageUser.createdSurveyMessage,
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
          enumMessageUser.failedOperation,
          enumMessageUser.serviceGeneratedError,
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
        enumMessageUser.failedOperation,
        enumMessageUser.serviceGeneratedError,
        true,
        () => {
          onCloseSharedMessageSucces();
        },
        () => { },
        ITypeMessageModal.fail
      );
    }
  };

  const updateUser = async (poblation: IUserCreateD) => {
    try {
      const data = await updateUserByIdService(poblation);
      if (data != 0) {
        setVisibilityComponent(false);
        onSetSharedMessageSucces(
          enumMessageUser.successfilOperationTitle,
          enumMessageUser.updateSurveyMessage,
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
          enumMessageUser.failedOperation,
          enumMessageUser.serviceGeneratedError,
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
        enumMessageUser.failedOperation,
        enumMessageUser.serviceGeneratedError,
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
      () => {},
      () => {},
      ITypeMessageModal.fail
    );
  };

  return (
    <div>
      <div style={{ visibility: visibilityComponent ? 'visible' : 'hidden' }}>
        <Modal
          title="Crear Usuario"
          widthClass="w-50"
          onCloseModal={onSetShowCreateInstrument}
        >
          <form onSubmit={onSubmit} id="form-create-instrument">
            <div className="row">
              <div className="col-lg-12">
                <label className={stylesLabel['label-form-main']}>
                  Nombre:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.surveyName && stylesInputs['input-form-main--error']
                  } ${stylesInputs['input-form-main']}`}
                  {...register('firtsName', { required: true })}
                />
                {errors.surveyName && (
                  <span className={stylesLabel['label-form-error']}>
                    Campo requerido
                  </span>
                )}
              </div>            
            </div>
            <div className="row">
              <div className="col-lg-12">
                <label className={stylesLabel['label-form-main']}>
                  Apellido:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.surveyName && stylesInputs['input-form-main--error']
                  } ${stylesInputs['input-form-main']}`}
                  {...register('secondName', { required: true })}
                />
                {errors.surveyName && (
                  <span className={stylesLabel['label-form-error']}>
                    Campo requerido
                  </span>
                )}
              </div>            
            </div>
            <div className="row">
              <div className="col-lg-12">
                <label className={stylesLabel['label-form-main']}>
                  Email:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.surveyName && stylesInputs['input-form-main--error']
                  } ${stylesInputs['input-form-main']}`}
                  {...register('mail', { required: true })}
                />
                {errors.surveyName && (
                  <span className={stylesLabel['label-form-error']}>
                    Campo requerido
                  </span>
                )}
              </div>            
            </div>
            <div className="row">
              <div className="col-lg-12">
                <label className={stylesLabel['label-form-main']}>
                  Usuario:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.surveyName && stylesInputs['input-form-main--error']
                  } ${stylesInputs['input-form-main']}`}
                  {...register('username', { required: true })}
                />
                {errors.surveyName && (
                  <span className={stylesLabel['label-form-error']}>
                    Campo requerido
                  </span>
                )}
              </div>            
            </div>
            <div className="row">
              <div className="col-lg-12">
                <label className={stylesLabel['label-form-main']}>
                  Perfil:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.surveyName && stylesInputs['input-form-main--error']
                  } ${stylesInputs['input-form-main']}`}
                  {...register('profile', { required: true })}
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
              Crear
            </button>
          </div>
        </Modal>
      </div>
      <SharedMessageModal {...sharedMessageSucces} />
    </div>
  );
};

export default ModalCreateUser;
