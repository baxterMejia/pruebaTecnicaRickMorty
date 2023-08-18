import stylesCard from '@/StylesGlobal/cards.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ISurvey, ISurveyPaginated } from '../../models/survey.model';
import MenuEllipsis from '@/src/shared/components/shared-menu-ellipsis';
import { useRouter } from 'next/router';
import { MenuItem } from 'primereact/menuitem';
import styles from './styles.module.scss';
import { statesInstrumentsEnum } from '@/src/features/constantsGlobal/statesInstruments';
interface IProps {
  surveyPaginated: ISurveyPaginated;
  loadingData: boolean;
}
const TableResultSurvey = ({ surveyPaginated, loadingData }: IProps) => {
  const router = useRouter();

  const actionMenuEditarSurvey = (d: ISurvey) => {
    router.push(`/Encuestas/EditarEncuesta/${d.id}`);
  };

  const actionTable = (d: ISurvey) => {
    const actions: MenuItem[] = [
      {
        label: 'Ver instrumento',
      },
      {
        label: 'Duplicar',
      },

      {
        label: 'Cambiar estado',
      },
    ];

    if (d.idState !== statesInstrumentsEnum.draft) {
      actions.push({
        label: 'Ver Aplicaciones',
      });
    }
    if (d.idState === statesInstrumentsEnum.draft) {
      actions.push({
        label: 'Borrar',
      });
    }

    if (d.idState === statesInstrumentsEnum.draft) {
      actions.push({
        label: 'Editar',
        command: () => {
          actionMenuEditarSurvey(d);
        },
      });
    }
    return actions;
  };

  return (
    <div className={stylesCard['card-main']}>
      <div className={`${styles['wrapper-title-table']}`}>
        <h1 className={stylesLabel['label-title-form-main']}>
          Resultado de búsqueda - Encuestas
        </h1>
        <div>
          {loadingData && (
            <ProgressSpinner
              strokeWidth="4"
              style={{ width: '50px', height: '50px' }}
            />
          )}
        </div>
      </div>
      <hr />
      {surveyPaginated.items.length ? (
        <div id="table-survey-result">
          <DataTable
            value={surveyPaginated.items}
            paginator
            rows={10}
            sortField="id"
            sortOrder={1}
          >
            <Column field="id" header="ID"></Column>
            <Column field="surveyName" header="Nombre"></Column>
            <Column field="nameCategory" header="Categoría"></Column>
            <Column field="createDate" header="Fecha creación"></Column>
            <Column field="availableDate" header="Fecha disponible"></Column>
            <Column
              field="yearTypeOfInitiative"
              header="Año de la iniciativa a evaluar"
            ></Column>
            <Column
              field="nameTypesOfInitiative"
              header="Tipo de iniciativa"
            ></Column>
            <Column field="nameState" header="Estado"></Column>
            <Column
              header="Acciones"
              body={(d) => <MenuEllipsis actions={actionTable(d)} />}
            ></Column>
          </DataTable>
        </div>
      ) : (
        <div className="text-center">
          <h3>No se encontrarón resultados</h3>
        </div>
      )}
    </div>
  );
};

export default TableResultSurvey;
