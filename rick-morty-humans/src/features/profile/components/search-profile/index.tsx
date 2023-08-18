import stylesCard from '@/StylesGlobal/cards.global.module.scss';
import stylesLabel from '@/StylesGlobal/labels.global.module.scss';
import stylesInputs from '@/StylesGlobal/inputs.global.module.scss';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import styles from './styles.module.scss';
import stylesButton from '@/StylesGlobal/buttons.global.module.scss';
import { useState } from 'react';
import useSurvey from '@/src/features/survey/hooks/useSurver';
import { months } from '@/src/features/constantsGlobal/months';
import { years } from '../../constants/years';
import { CategoryStatus } from '../../constants/categoryStatus';
import TableResultProfile from '../table-result-profile';

const SearchProfile = () => {
  const { surveyPaginated, searchSurveyPaginated } = useSurvey();
  const [loadingData, setLoadingData] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      setLoadingData(true);
      //  await searchSurveyPaginated();
      setLoadingData(false);
    } catch {
      setLoadingData(false);
      console.log('error');
    }
  };

  return (
    <>
      <div className={stylesCard['card-main']}>
        <h1 className={stylesLabel['label-title-form-main']}>Buscar por</h1>
        <hr />
        <form id="form-search-instrument" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>
                ID Perfil
              </label>
              <input
                type="text"
                className={stylesInputs['input-form-main']}
                {...register('idProfile')}
              />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>Perfil</label>
              <input
                type="text"
                className={stylesInputs['input-form-main']}
                {...register('profile')}
              />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>
                Fecha Creación (Mes - Año)
              </label>
              <div className={styles['wrapper-group-dropdown']}>
                <Dropdown
                  options={months}
                  optionLabel="description"
                  optionValue="id"
                  placeholder="Seleccionar"
                  {...register('createDateMonth')}
                  className={styles['p-dropdown--width']}
                />
                <Dropdown
                  options={years}
                  optionLabel="description"
                  optionValue="id"
                  placeholder="Seleccionar"
                  {...register('createDateYear')}
                  className={styles['p-dropdown--width']}
                />
              </div>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>
                Fecha Modificación (Mes - Año)
              </label>
              <div className={styles['wrapper-group-dropdown']}>
                <Dropdown
                  options={months}
                  optionLabel="description"
                  optionValue="id"
                  placeholder="Seleccionar"
                  {...register('modifyDateMonth')}
                  className={styles['p-dropdown--width']}
                />
                <Dropdown
                  options={years}
                  optionLabel="description"
                  optionValue="id"
                  placeholder="Seleccionar"
                  {...register('modifyDateYear')}
                  className={styles['p-dropdown--width']}
                />
              </div>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3 ">
              <label className={stylesLabel['label-form-main']}>Estado</label>

              <Dropdown
                options={CategoryStatus}
                optionLabel="description"
                optionValue="id"
                placeholder="Seleccionar"
                {...register('state')}
              />
            </div>
          </div>
        </form>
        <hr />
        <div className="text-right">
          <button className={stylesButton['button-tertiary']}>
            Limpiar campos
          </button>
          <button
            form="form-search-instrument"
            id="button-search-survey"
            className={stylesButton['button-primary']}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Tabla de resultados encuestas */}
      <div className="mt-25">
        <TableResultProfile
          surveyPaginated={surveyPaginated}
          loadingData={loadingData}
        />
      </div>
    </>
  );
};

export default SearchProfile;
