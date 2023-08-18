import stylesGlobalModal from '@/StylesGlobal/modals.global.module.scss';
import { IMessageModal, ITypeMessageModal } from '../models/shared.model';
import styles from './styles.module.scss';
import stylesButtonGlobal from '@/StylesGlobal/buttons.global.module.scss';
const SharedMessageModal = ({
  title,
  message,
  show,
  buttonActionAccept,
  closeSharedMessageSucces = () => {},
  typeMessage,
}: IMessageModal) => {
  return (
    <>
      {show && (
        <div
          className={`${stylesGlobalModal['wrapper-modal']} ${
            typeMessage === ITypeMessageModal.fail &&
            styles['wrapper-modal--fail']
          } ${
            typeMessage === ITypeMessageModal.success &&
            styles['wrapper-modal--success']
          } ${
            typeMessage === ITypeMessageModal.warning &&
            styles['wrapper-modal--warning']
          }`}
        >
          <div>
            <div
              className={` ${stylesGlobalModal['wrapper-modal__content']} 
              text-center`}
            >
              <div>
                <h1>{title}</h1>
              </div>

              <div>
                <p>{message}</p>
                <hr />
                <div>
                  <button
                    className={stylesButtonGlobal['button-primary']}
                    onClick={() => {
                      closeSharedMessageSucces();
                      buttonActionAccept();
                    }}
                    id="button-accept-modal-generic"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SharedMessageModal;
