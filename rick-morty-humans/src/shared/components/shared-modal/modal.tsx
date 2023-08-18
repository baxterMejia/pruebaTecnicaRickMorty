import stylesGlobalModal from '@/StylesGlobal/modals.global.module.scss';

interface IProps {
  children: React.ReactNode;
  title?: string;
  widthClass?: string;
  onCloseModal: () => void | null;
}
const Modal = ({
  children,
  title = '',
  widthClass = '',
  onCloseModal,
}: IProps) => {
  return (
    <div className={stylesGlobalModal['wrapper-modal']}>
      <div className={widthClass}>
        <div className={`${stylesGlobalModal['wrapper-modal__content']}`}>
          <div
            className={`${stylesGlobalModal['wrapper-modal__content__header']}`}
          >
            <h1>{title}</h1>
            <div onClick={onCloseModal} id="button-close-modal-generic">
              <i className="pi pi-times" style={{ fontSize: '13px' }}></i>
            </div>
          </div>
          <hr />
          <div style={{ position: 'relative' }}> {children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
