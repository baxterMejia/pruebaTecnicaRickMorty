// Importar las dependencias necesarias
import { useRouter } from 'next/router'; // Importar el enrutador de Next.js para redireccionar a las vistas
import styles from './styles.module.scss'; // Importar los estilos CSS del componente
import { useState } from 'react'; // Importar el hook useState de React para manejar el estado

interface IProps {
  closeMenu: () => void; // Propiedad de tipo función para cerrar el menú
}

const Menu = ({ closeMenu }: IProps) => {
  // Definir el estado para controlar la visibilidad de los menús
  const [showMenuTools, setShowMenuTools] = useState(false);
  const [showMenuMaintainers, setShowMenuMaintainers] = useState(false);

  const router = useRouter(); // Obtener la instancia del enrutador de Next.js

  // Manejar el clic en los enlaces del menú
  const handleLinkClick = (path: string) => {
    router.push(path); // Redireccionar a la ruta especificada utilizando el enrutador de Next.js
    closeMenu(); // Cerrar el menú llamando a la función closeMenu pasada como prop
  };

  return (
    <>
      <nav className={styles['wrapper-menu']}>
        <ul className={styles['wrapper-menu__ul']}>
          <li className={styles['wrapper-menu__li-first']}>
            <a
              onClick={() => {
                setShowMenuTools(!showMenuTools);
                setShowMenuMaintainers(false); // Cerrar el otro menú
              }}
            >
              Instrumentos
            </a>
            <ul
              className={`${styles['wrapper-menu__ul-second']} ${
                showMenuTools
                  ? styles['wrapper-menu__ul-second--show']
                  : styles['wrapper-menu__ul-second--close']
              }`}
            >
              <li>
                <a onClick={() => handleLinkClick('/Instrumentos')}>Encuestas</a>
              </li>
              <li>
                <a onClick={() => handleLinkClick('/Rubrica')}>Rúbricas</a>
              </li>
            </ul>
          </li>
          <li>
            <a onClick={() => handleLinkClick('/Contactos')}>Contactos</a>
          </li>
          <li className={styles['wrapper-menu__li-first']}>
            <a
              onClick={() => {
                setShowMenuMaintainers(!showMenuMaintainers);
                setShowMenuTools(false); // Cerrar el otro menú
              }}
            >
              Mantenedores
            </a>
            <ul
              className={`${styles['wrapper-menu__ul-second']} ${
                showMenuMaintainers
                  ? styles['wrapper-menu__ul-second--show']
                  : styles['wrapper-menu__ul-second--close']
              }`}
            >
              <li>
                <a onClick={() => handleLinkClick('/Poblacion')}>Población Objetivo</a>
              </li>
              <li>
                <a onClick={() => handleLinkClick('/Usuarios')}>Usuarios</a>
              </li>
              <li>
                <a onClick={() => handleLinkClick('/Perfiles')}>Perfiles</a>
              </li>
            </ul>
          </li>
        </ul>
        <button
          className={styles['wrapper-menu__button-close']}
          onClick={closeMenu}
        >
          Close
        </button>
      </nav>
    </>
  );
};

export default Menu;
