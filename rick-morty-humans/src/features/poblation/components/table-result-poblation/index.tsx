import stylesCard from '@/StylesGlobal/cards.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { IPoblation, IPoblationPaginated } from '../../models/poblation.model';
import ModalCreatePoblation from '../modal-create-poblation';
interface IProps {
  surveyPaginated: IPoblationPaginated;
  loadingData: boolean;
  onPageChange: (event: any) => void;
}
const TableResultPoblation = ({ surveyPaginated, loadingData, onPageChange }: IProps) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [showCreateInstrument, setShowCreateInstrument] = useState(false);
  const [initialData, setInitialData] = useState<IPoblation | undefined>(undefined);
  const onSetShowCreateInstrument = (data: any) => {   
    setShowCreateInstrument(!showCreateInstrument);
    setInitialData(data);
  };



  const actionMenu = (d: any) => { 
    onSetShowCreateInstrument(d);
  };

  const actionTable = (data: any) => {
    return [
      {
        label: 'Editar',
        command: () => {
          actionMenu(data);
        },
      },
      { label: 'Borrar' },
    ];
  };
  console.log(surveyPaginated, 'sss');

  const handlePaginatorChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    if (onPageChange) {
      onPageChange(event.page + 1);
    }
  };

  const imageTemplate = (rowData: any) => {
    return (
      <div style={{
        position: 'relative',
        width: '250px',
        height: '250px',
        marginRight: '15px',
        border: '2px solid #0099cc',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <img
          src={rowData.image}
          alt={rowData.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
        <span style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)'
        }}>
          {rowData.name}
        </span>
      </div>
    );
  }


  return (
    <div className={stylesCard['card-main']}>

      <div>
        <DataTable value={surveyPaginated.items}>
          <Column field="name" header="Personajes Humanos" body={imageTemplate}></Column>
        </DataTable>
        <Paginator
          first={first}
          rows={10}
          totalRecords={surveyPaginated.total}
          onPageChange={handlePaginatorChange}
        />
      </div>
    </div>
  );
};

export default TableResultPoblation;
