import { useState } from 'react';
import axios from 'axios';
import ApiResponse from '../../constantsGlobal/ApiResponse';
import {
  IPoblation,
  IPoblationCreateD,
  IPoblationPaginated,
  PoblationResponse,
} from '../models/poblation.model';

const urlApiPoblation = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MS_POPULATION,
});
const usePoblation = () => {
  const [poblationPaginated, setPobltionPaginated] =
    useState<IPoblationPaginated>({
      items: [],
      total: 0,
      lastKey: '',
    });
  const [poblation, setPoblation] = useState<IPoblation | null>(null);

  const createPoblationService = async (poblationCreate: IPoblationCreateD) => {
    try {    
      // const res = await urlApiPoblation.post<ApiResponse<number>>(
      //   '/post-population-create',
      //   {
      //     ...poblationCreate,
      //   }
      // );
      // return res.data;
      return 1;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const getPoblationById = async (id: string) => {
    try {
      console.log('by id', id);
      const res = await urlApiPoblation.get<ApiResponse<IPoblation | null>>(
        `/get-population-by-id/${id}`
      );
      console.log(res.data.data, 'api get');
      setPoblation(res.data.data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const searchPoblationPaginated = async (page: number) => {
    try {
      const query = {
        query: `{ humans(page: ${page}) }`
      };
      const res = await urlApiPoblation.post<ApiResponse<any>>('', query);     
      // Mapeo de la respuesta al formato esperado
      const humansData = JSON.parse(res.data.data.humans);  // Deserializar el string JSON

      const mappedResponse = {
          items: humansData.data.characters.results,  // Ahora puedes acceder directamente a las propiedades
          total: humansData.data.characters.info.count,
          lastKey: ''  // Si no tienes un valor para esto, lo dejas vacío. Ajusta según tu caso.
      };
  
      setPobltionPaginated(mappedResponse);
      return mappedResponse;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  

  const updatePoblationByIdService = async (dataToUpdate: IPoblation) => {
    try {
      // const res = await urlApiPoblation.put<ApiResponse<number>>(
      //   '/update-population-by-id',
      //   {
      //     ...dataToUpdate,
      //   }
      // );
      // return res;
      return 1;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return {
    poblationPaginated,
    poblation,
    searchPoblationPaginated,
    createPoblationService,
    updatePoblationByIdService,
    getPoblationById,
  };
};

export default usePoblation;
