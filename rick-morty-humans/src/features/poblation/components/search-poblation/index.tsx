import { useForm } from 'react-hook-form';
import { useState } from 'react';
import TableResultPoblation from '../table-result-poblation';
import usePoblation from '../../hooks/UsePoblation';
import { useEffect } from 'react';

const SearchPoblation = () => {
  const { poblationPaginated, searchPoblationPaginated } = usePoblation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const onSubmit = async (page: number, isFirstRun = false) => {  
    // Puedes usar isFirstRun aquí para hacer lógica condicional si es necesario
    // Por ejemplo:
    if (isFirstRun) {
      console.log("Primera ejecución");
      // Puedes enviar este valor como parte de "data" si es necesario
      page = 1; // Solo un ejemplo
    }
    try {
      setLoadingData(true);
      await searchPoblationPaginated(page);
      setLoadingData(false);
    } catch {
      setLoadingData(false);
      console.log('error');
    }
  };

  useEffect(() => {
    onSubmit(1, true);  // El segundo parámetro es true, indicando que es la primera ejecución
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onSubmit(newPage);
  };

  const clearFields = () => {
    const form = document.getElementById(
      'form-search-poblation'
    ) as HTMLFormElement;
    form.reset();
    setSelectedCategory(null);
  };

  return (
    <>      
      {/* Tabla de resultados encuestas */}
      <div className="mt-25">
        <TableResultPoblation
          surveyPaginated={poblationPaginated}
          loadingData={loadingData}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default SearchPoblation;
