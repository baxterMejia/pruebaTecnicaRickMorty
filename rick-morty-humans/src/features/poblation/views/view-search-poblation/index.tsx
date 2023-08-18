import stylesPage from '@/StylesGlobal/pages.global.module.scss';
import { useState } from 'react';
import SearchPoblation from '../../components/search-poblation';
import ModalCreatePoblation from '../../components/modal-create-poblation';
const ViewSearchPoblation = () => {
  const [showCreateInstrument, setShowCreateInstrument] = useState(false);
  const onSetShowCreateInstrument = () => {
    setShowCreateInstrument(!showCreateInstrument);
  };
  return (
    <div className={stylesPage['wrapper-page']}>      
      <SearchPoblation />
      <div>
        {showCreateInstrument && (
          <ModalCreatePoblation
            onSetShowCreateInstrument={onSetShowCreateInstrument}
          />
        )}
      </div>
    </div>
  );
};

export default ViewSearchPoblation;
