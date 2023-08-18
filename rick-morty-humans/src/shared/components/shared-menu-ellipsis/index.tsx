import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useRef } from 'react';
import styles from './styles.module.scss';
interface IPros {
  actions: MenuItem[];
}

const MenuEllipsis = ({ actions }: IPros) => {
  const menuRef = useRef<Menu>(null);

  return (
    <>
      <Menu model={actions} popup id="popup_menu_left" ref={menuRef} />
      <button
        aria-controls="popup_menu_left"
        id="button-ellipsis-survey-result"
        aria-haspopup="true"
        onClick={(event) => {
          menuRef.current?.toggle(event);
        }}
        className={`${styles['button-ellipsis']}`}
      >
        <i className="pi pi-ellipsis-h"></i>
      </button>
    </>
  );
};

export default MenuEllipsis;
