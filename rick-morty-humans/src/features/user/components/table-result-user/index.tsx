import stylesCard from '@/StylesGlobal/cards.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ISurveyPaginated } from '@/src/features/survey/models/survey.model';
import { IUser, IUserPaginated } from '../../models/User.model';
import MenuEllipsis from '@/src/shared/components/shared-menu-ellipsis';
import ModalCreateUser from '../modal-create-user';
interface IProps {
  surveyPaginated: IUserPaginated;
  loadingData: boolean;
}
const TableResultUser = ({ surveyPaginated, loadingData }: IProps) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [showCreateInstrument, setShowCreateInstrument] = useState(false);
  const [initialData, setInitialData] = useState<IUser | undefined>(undefined);

  const onSetShowCreateInstrument = (data : any) => {
    setShowCreateInstrument(!showCreateInstrument);
    setInitialData(data);
  };

  const actionMenu = (d: any) => {    
    onSetShowCreateInstrument(d);
  };

  const actionTable = (d: any) => {
    return [
      {
        label: 'Editar',
        command: () => {
          actionMenu(d);
        },
      },
      { label: 'Borrar' },
    ];
  };
  console.log(surveyPaginated, 'sss');

  const onPageChange = (event: any) => {
    console.log(event);
    setFirst(event.first);
    setRows(event.rows);
  };
  return (
    <div className={stylesCard['card-main']}>
      <h1 className={stylesLabel['label-title-form-main']}>
        Resultado de búsqueda
      </h1>
      {loadingData && <ProgressSpinner />}
      <hr />
      <div>
        <DataTable value={surveyPaginated.items}>    
          <Column field="firtsName" header="Nombre del Usuario"></Column>  
          <Column field="secondName" header="Apellido del Usuario"></Column>  
          <Column field="mail" header="Correo"></Column>         
          <Column field="username" header="Usuario"></Column>    
          <Column field="profile" header="Perfil Asociado"></Column>    
          <Column field="status" header="Estado" body={(rowData) => (
            <span>{rowData.status ? 'Activado' : 'Desactivado'}</span>
          )} />            
          <Column
            field="quantity"
            header="Acción"
            body={(d) => <MenuEllipsis actions={actionTable(d)} />}
          ></Column>    
        </DataTable>
        <Paginator
          first={first}
          rows={10}
          totalRecords={surveyPaginated.total}
          onPageChange={onPageChange}
        />
         {showCreateInstrument && (
        <ModalCreateUser
          onSetShowCreateInstrument={onSetShowCreateInstrument}
          initialData={initialData}
        />
      )}
      </div>
    </div>
  );
};

export default TableResultUser;
