import stylesPage from '@/StylesGlobal/pages.global.module.scss';
import { useState } from 'react';
import ModalCreateProfile from '../../components/modal-create-profile';
import SearchProfile from '../../components/search-profile';
const ViewSearchProfile = () => {
  const [showCreateInstrument, setShowCreateInstrument] = useState(false);
  const onSetShowCreateInstrument = () => {
    setShowCreateInstrument(!showCreateInstrument);
  };
  return (
    <div className={stylesPage['wrapper-page']}>
      <div>
        <button onClick={onSetShowCreateInstrument}>Crear</button>
      </div>
      <SearchProfile />
      <div>
        {showCreateInstrument && (
          <ModalCreateProfile
            onSetShowCreateInstrument={onSetShowCreateInstrument}
          />
        )}
      </div>
    </div>
  );
};

export default ViewSearchProfile;
