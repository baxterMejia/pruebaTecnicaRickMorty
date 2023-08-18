import Modal from '@/src/shared/components/shared-modal/modal';
import stylesLabelGlobal from '@/StylesGlobal/labels.global.module.scss';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Controller, useForm } from 'react-hook-form';
import {
  instrumentsCategory,
  instrumentsCategoryEnum,
} from '../../../constantsGlobal/instrumentsCategory';
import SharedMessageModal from '@/src/shared/components/shared-message-modal';
import { useState } from 'react';
import {
  IMessageModal,
  ITypeMessageModal,
} from '@/src/shared/components/models/shared.model';
import { typesOfInitiativeDummy } from '@/src/features/constantsGlobal/typesOfInitiativeDummy';
import {
  statesInstruments,
  statesInstrumentsEnum,
} from '@/src/features/constantsGlobal/statesInstruments';
import useSurvey from '../../hooks/useSurver';
import { ISurvey } from '../../models/survey.model';
import { typesOfTargetPopulationsDummy } from '@/src/features/constantsGlobal/typesTargetPopulationsDummy';
import SurveyHelper from '../../helpers/survey.helper';
import { useDispatch } from 'react-redux';
import { updateAttributesSurveyGlobal } from '../../reducer/surveySlice';
import { enumMessageGlobals } from '@/src/features/constantsGlobal/messageGlobals';

interface IProps extends ISurvey {
  idSurvey: number;
  handleShowModalEndSurvey: () => void;
}

type FormData = {
  idCategory: number;
  idTypeOfInitiative: string;
  yearTypeOfInitiative: string;
  idTargetPopulation: number;
  requestRutSurveyed: boolean;
  idState: number;
};

const ModalEndSurvey = ({
  idSurvey,
  yearTypeOfInitiative,
  idTypeOfInitiative,
  idState,
  requestRutSurveyed,
  idCategory,
  idTargetPopulation,
  handleShowModalEndSurvey,
}: IProps) => {
  const { updateSurveyByIdService } = useSurvey();
  const dispatch = useDispatch();
  const yearInitial = 2023;
  const [idCategoryLocal, setIdCategoryLocal] = useState(idCategory);
  const surveyHelperService = new SurveyHelper();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      idCategory: idCategoryLocal,
      idTypeOfInitiative,
      yearTypeOfInitiative,
      idTargetPopulation,
      requestRutSurveyed,
      idState,
    },
  });
  const statusSureveyFinaly = statesInstruments.filter(
    (d) =>
      d.id === statesInstrumentsEnum.draft ||
      d.id === statesInstrumentsEnum.available
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

  const onSubmit = handleSubmit(() => {
    handleUpdateEndSurvey();
  });

  const handleUpdateEndSurvey = async () => {
    try {
      const dataForm = getValues();
      const dataJson = {
        id: idSurvey,
        ...dataForm,
      };

      await updateSurveyByIdService(dataJson as ISurvey);
      handleShowModalEndSurvey();
      dispatch(updateAttributesSurveyGlobal({ ...dataJson } as ISurvey));
    } catch {
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
  const handleDropdownChangeIdCategory = (idOption: DropdownChangeEvent) => {
    const value = Number(idOption.target.value);
    setIdCategoryLocal(value);
    setValue('idCategory', value);
    setValue('idTypeOfInitiative', '');
    setValue('yearTypeOfInitiative', '');
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
    <>
      <Modal onCloseModal={handleShowModalEndSurvey} widthClass="w-50">
        <div>
          <form onSubmit={onSubmit} id="modal-form-end-survey">
            <h1 className="text-center">Tipo de encuesta</h1>
            <div className="row">
              <div className="col-sm-12">
                <label className={`${stylesLabelGlobal['label-form-main']}`}>
                  Tipo de instrumento
                </label>
                <Controller
                  name="idCategory"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...(field as any)}
                      options={instrumentsCategory}
                      optionLabel="description"
                      id="select-form-survey-end-idCategory"
                      optionValue="id"
                      placeholder="Seleccionar"
                      onChange={handleDropdownChangeIdCategory}
                    />
                  )}
                />
                {errors.idCategory && (
                  <label className={`${stylesLabelGlobal['label-form-error']}`}>
                    * Campo obligatorio
                  </label>
                )}
              </div>

              {idCategoryLocal === instrumentsCategoryEnum.TypeOfInitiative && (
                <div className="col-sm-12">
                  <label className={stylesLabelGlobal['label-form-main']}>
                    Tipo de iniciativa
                  </label>
                  <Controller
                    name="idTypeOfInitiative"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Dropdown
                        {...(field as any)}
                        id="select-form-survey-end-idTypeOfInitiative"
                        options={typesOfInitiativeDummy}
                        optionLabel="description"
                        optionValue="id"
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors.idTypeOfInitiative && (
                    <label
                      className={`${stylesLabelGlobal['label-form-error']}`}
                    >
                      * Campo obligatorio
                    </label>
                  )}
                </div>
              )}

              <div className="col-sm-12">
                <label className={stylesLabelGlobal['label-form-main']}>
                  Año tipo de iniciativa
                </label>
                <Controller
                  name="yearTypeOfInitiative"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Dropdown
                      {...(field as any)}
                      options={surveyHelperService.generateYearsByParameterInitialToCurrent(
                        yearInitial
                      )}
                      id="select-form-survey-end-yearTypeOfInitiative"
                      optionLabel="description"
                      optionValue="description"
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.yearTypeOfInitiative && (
                  <label className={`${stylesLabelGlobal['label-form-error']}`}>
                    * Campo obligatorio
                  </label>
                )}
              </div>

              <div className="col-sm-12">
                <label className={stylesLabelGlobal['label-form-main']}>
                  Población objetivo
                </label>
                <Controller
                  name="idTargetPopulation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Dropdown
                      {...(field as any)}
                      id="select-form-survey-end-idTargetPopulation"
                      options={typesOfTargetPopulationsDummy}
                      optionLabel="description"
                      optionValue="id"
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.idTargetPopulation && (
                  <label className={`${stylesLabelGlobal['label-form-error']}`}>
                    * Campo obligatorio
                  </label>
                )}
              </div>

              <div className="col-sm-12">
                <label
                  className={stylesLabelGlobal['label-form-main']}
                  style={{ marginBottom: 0 }}
                >
                  <input
                    id="check-form-survey-end-requestRutSurveyed"
                    type="checkbox"
                    {...register('requestRutSurveyed')}
                  />{' '}
                  Solicitar rut del encuestado
                </label>
              </div>

              <div className="col-sm-12">
                <label className={stylesLabelGlobal['label-form-main']}>
                  Estado
                </label>
                <Controller
                  name="idState"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Dropdown
                      {...(field as any)}
                      id="select-form-survey-end-idState"
                      options={statusSureveyFinaly}
                      optionLabel="description"
                      optionValue="id"
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.idState && (
                  <label className={`${stylesLabelGlobal['label-form-error']}`}>
                    * Campo obligatorio
                  </label>
                )}
              </div>
            </div>
          </form>

          <hr />
          <div className="text-right">
            <button
              onClick={handleShowModalEndSurvey}
              id="button-cancel-form-end-survey"
            >
              Cancelar
            </button>{' '}
            <button
              form="modal-form-end-survey"
              id="button-save-form-end-survey"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>

      <SharedMessageModal {...sharedMessageSucces} />
    </>
  );
};

export default ModalEndSurvey;
