import stylesPage from '@/StylesGlobal/pages.global.module.scss';
import { useState } from 'react';
import ModalCreateUser from '../components/modal-create-user';
import SearchUser from '../components/search-user';
const ViewSearchUser = () => {
  const [showCreateInstrument, setShowCreateInstrument] = useState(false);
  const onSetShowCreateInstrument = () => {
    setShowCreateInstrument(!showCreateInstrument);
  };
  return (
    <div className={stylesPage['wrapper-page']}>
      <div>
        <button onClick={onSetShowCreateInstrument}>Crear</button>
      </div>
      <SearchUser />
      <div>
        {showCreateInstrument && (
          <ModalCreateUser
            onSetShowCreateInstrument={onSetShowCreateInstrument}
          />
        )}
      </div>
    </div>
  );
};

export default ViewSearchUser;