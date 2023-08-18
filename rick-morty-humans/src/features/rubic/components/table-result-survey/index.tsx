import stylesCard from '@/StylesGlobal/cards.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ISurveyPaginated } from '../../models/survey.model';
import MenuEllipsis from '@/src/shared/components/shared-menu-ellipsis';
interface IProps {
  surveyPaginated: ISurveyPaginated;
  loadingData: boolean;
}
const TableResultSurvey = ({ surveyPaginated, loadingData }: IProps) => {
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
          <Column field="id" header="ID"></Column>
          <Column field="surveyName" header="Nombre"></Column>
          <Column field="idCategory" header="Categoría"></Column>
          <Column field="availableDate" header="Fecha creación"></Column>
          <Column field="availableDate" header="Fecha disponible"></Column>
          <Column
            field="initiativeTypeYear"
            header="Año del tipo de iniciativa"
          ></Column>
          <Column
            field="idTypeOfInitiative"
            header="Tipo de iniciativa"
          ></Column>
          <Column field="idState" header="Estado"></Column>
          <Column
            field="quantity"
            header="Quantity"
            body={(d) => <MenuEllipsis actions={actionTable(d)} />}
          ></Column>
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

export default TableResultSurvey;
