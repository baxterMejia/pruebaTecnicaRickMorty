import Modal from '@/src/shared/components/shared-modal/modal';
import stylesLabelGloba from '@/StylesGlobal/labels.global.module.scss';
import { Dropdown } from 'primereact/dropdown';
import { useForm } from 'react-hook-form';
import { instrumentsCategory } from '../../constants/instrumentsCategory';
import SharedMessageModal from '@/src/shared/components/shared-message-modal';
import { useState } from 'react';
import {
  IMessageModal,
  ITypeMessageModal,
} from '@/src/shared/components/models/shared.model';
import { typesOfInitiativeDummy } from '@/src/features/constantsGlobal/typesOfInitiativeDummy';
import { statesInstruments } from '@/src/features/constantsGlobal/statesInstruments';
interface IProps {
  handleShowModalEndSurvey: () => void;
}
const ModalEndSurvey = ({ handleShowModalEndSurvey }: IProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <Modal onCloseModal={handleShowModalEndSurvey} widthClass="w-50">
        <div>
          <form onSubmit={onSubmit} id="modal-form-end-survey">
            <h1 className="text-center">Tipo de encuesta</h1>
            <div className="row">
              <div className="col-sm-12">
                <label className={stylesLabelGloba['label-form-main']}>
                  Tipo de instrumento
                </label>
                <Dropdown
                  options={instrumentsCategory}
                  optionLabel="description"
                  optionValue="id"
                  placeholder="Seleccionar"
                  {...register('typeInstrument')}
                />
              </div>

              <div className="col-sm-12">
                <label className={stylesLabelGloba['label-form-main']}>
                  Tipo de iniciativa
                </label>
                <Dropdown
                  options={typesOfInitiativeDummy}
                  optionLabel="description"
                  optionValue="id"
                  placeholder="Seleccionar"
                  {...register('typeInstrument')}
                />
              </div>

              <div className="col-sm-12">
                <label className={stylesLabelGloba['label-form-main']}>
                  Año tipo de iniciativa
                </label>
                <Dropdown
                  options={typesOfInitiativeDummy}
                  optionLabel="description"
                  optionValue="id"
                  placeholder="Seleccionar"
                  {...register('typeInstrument')}
                />
              </div>

              <div className="col-sm-12">
                <label className={stylesLabelGloba['label-form-main']}>
                  Población objetivo
                </label>
                <Dropdown
                  options={typesOfInitiativeDummy}
                  optionLabel="description"
                  optionValue="id"
                  placeholder="Seleccionar"
                  {...register('typeInstrument')}
                />
              </div>

              <div className="col-sm-12">
                <label
                  className={stylesLabelGloba['label-form-main']}
                  style={{ marginBottom: 0 }}
                >
                  <input type="checkbox" /> Solicitar rut del encuestado
                </label>
              </div>

              <div className="col-sm-12">
                <label className={stylesLabelGloba['label-form-main']}>
                  Estado
                </label>
                <Dropdown
                  options={statesInstruments}
                  optionLabel="description"
                  optionValue="id"
                  placeholder="Seleccionar"
                  {...register('idState')}
                />
              </div>
            </div>
          </form>

          <hr />
          <div className="text-right">
            <button>Cancelar</button>{' '}
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
