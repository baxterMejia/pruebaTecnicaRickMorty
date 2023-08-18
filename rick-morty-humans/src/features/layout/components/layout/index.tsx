import React, { ReactNode, useState } from 'react';
import styles from './styles.module.scss';
import Menu from '@/src/features/layout/components/menu';

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles['wrapper-layout']}>
      <nav className={styles['wrapper-layout__navigation']}>
        <div className="centered-image">
          <img src="/rickmorty.png" />
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
