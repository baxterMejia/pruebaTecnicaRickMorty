import stylesCard from '@/StylesGlobal/cards.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ISurveyPaginated } from '@/src/features/survey/models/survey.model';
interface IProps {
  surveyPaginated: ISurveyPaginated;
  loadingData: boolean;
}
const TableResultProfile = ({ surveyPaginated, loadingData }: IProps) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const actionMenu = (d: any) => {
    console.log(d, 'de');
  };

  const actionTable = (d: any) => {
    return [
      {
        label: 'New',

        command: () => {
          actionMenu(d);
        },
      },
      { label: 'Delete' },
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
          <Column field="description" header="Descripción"></Column>
  
          <Column field="availableDate" header="Fecha creación"></Column>         
          <Column field="idState" header="Estado"></Column>    
        </DataTable>
        <Paginator
          first={first}
          rows={10}
          totalRecords={surveyPaginated.total}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default TableResultProfile;
