import stylesCard from '@/StylesGlobal/cards.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import stylesInputs from '@/StylesGlobal/inputs.global.module.scss';
import { useForm } from 'react-hook-form';
import stylesButton from '@/StylesGlobal/buttons.global.module.scss';
import { useState } from 'react';
import useSurvey from '@/src/features/survey/hooks/useSurver';
import TableResultUser from '../table-result-user';
import { Dropdown } from 'primereact/dropdown';
import { CategoryStatus } from '../../constants/categoryStatus';
import useUser from '../../hooks/UseUser';
import { ISearchUser } from '../../models/User.model';

const SearchUser = () => {
  const { userPaginated, searchUserPaginated } = useUser();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);  
    //Ajustar Filtros
    var searchUser: ISearchUser = {
      id: 1,
      firtsName: data.nombre,
      secondName: data.nombre,
      availableDate: new Date(),
      mail: data.correo,
      username: data.username,
      profile: "admin",
      status: data.categoryStatus == "Activado" ? true : data.categoryStatus == "Desactivado" ? false: data.categoryStatus == undefined ? undefined : undefined,
    };
    try {
      setLoadingData(true);
      await searchUserPaginated(searchUser);
      setLoadingData(false);
    } catch {
      setLoadingData(false);
      console.log('error');
    }
  };

  const clearFields = () => {
    const form = document.getElementById('form-search-user') as HTMLFormElement;
    form.reset();
    setSelectedCategory(null);
  };

  return (
    <>
      <div className={stylesCard['card-main']}>
        <h1 className={stylesLabel['label-title-form-main']}>Buscar Por</h1>
        <hr />
        <form id="form-search-user" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">

            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>
                Busqueda
              </label>
              <input
                type="text"
                className={stylesInputs['input-form-main']}
                {...register('busqueda')}
              />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>
                Nombre
              </label>
              <input
                type="text"
                className={stylesInputs['input-form-main']}
                {...register('nombre')}
              />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>
                Correo
              </label>
              <input
                type="text"
                className={stylesInputs['input-form-main']}
                {...register('correo')}
              />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>
                Usuario
              </label>
              <input
                type="text"
                className={stylesInputs['input-form-main']}
                {...register('usuario')}
              />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>
                Estado
              </label>
              <Dropdown
                options={CategoryStatus}
                optionLabel="description"
                optionValue="id"
                placeholder="Seleccionar"
                value={selectedCategory} 
                {...register('categoryStatus')}
                onChange={(e) => setSelectedCategory(e.value)}
              />
            </div>

          </div>
        </form>
        <hr />
        <div className="text-right">
          <button className={stylesButton['button-tertiary']} onClick={clearFields}>
            Limpiar campos
          </button>
          <button
            form="form-search-user"
            id="button-search-survey"
            className={stylesButton['button-primary']}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Tabla de resultados encuestas */}
      <div className="mt-25">
        <TableResultUser
          surveyPaginated={userPaginated}
          loadingData={loadingData}
        />
      </div>
    </>
  );
};

export default SearchUser;
