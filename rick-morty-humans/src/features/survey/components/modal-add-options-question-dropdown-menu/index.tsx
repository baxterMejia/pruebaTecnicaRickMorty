import Modal from '@/src/shared/components/shared-modal/modal';
import stylesInputGlobal from '@/StylesGlobal/inputs.global.module.scss';
import { useState } from 'react';
import { ITypeSelectionOptions } from '../../models/survey.model';
import { v4 as uuidv4 } from 'uuid';
interface IProps {
  handleShowModalAddOptions: () => void;
  options: Array<ITypeSelectionOptions>;
  handleOptionsLocalNew: (options: Array<ITypeSelectionOptions>) => void;
}
const ModalAddOptionsQuestionDropdownMenu = ({
  handleShowModalAddOptions,
  options,
  handleOptionsLocalNew,
}: IProps) => {
  const [optionsLocal, setOptionsLocal] = useState(
    options.map((d) => d.option).join('\n')
  );

  const handleSaveOptions = () => {
    let optionsFinal = null;
    if (optionsLocal.trim() === '') {
      optionsFinal = [
        {
          id: uuidv4(),
          option: 'Opción...',
        },
      ];
    } else {
      optionsFinal = optionsLocal.split('\n').map((d) => {
        return {
          id: uuidv4(),
          option: d,
        };
      });
    }

    handleOptionsLocalNew(optionsFinal);
    handleShowModalAddOptions();
  };
  return (
    <Modal widthClass="w-50" onCloseModal={handleShowModalAddOptions}>
      <div>
        <h1>Agregar opciones</h1>
        <p>Por favor por cada nueva opción presionar ENTER</p>
        <textarea
          onChange={(e) => {
            setOptionsLocal(e.target.value);
          }}
          value={optionsLocal}
          className={`${stylesInputGlobal['input-form-main-textarea']}`}
          id="textarea-options-questions-dropdown-menu"
          maxLength={200}
        ></textarea>
        <hr />
        <div className="text-right">
          <button
            onClick={handleShowModalAddOptions}
            id="button-cancel-add-option-dropdown"
          >
            Cancelar
          </button>{' '}
          <button
            onClick={handleSaveOptions}
            id="button-save-add-option-dropdown"
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddOptionsQuestionDropdownMenu;
