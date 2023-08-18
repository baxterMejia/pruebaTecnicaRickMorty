import { useState } from 'react';
import axios from 'axios';
import ApiResponse from '../../constantsGlobal/ApiResponse';
import { ISearchUser, IUser, IUserCreateD, IUserPaginated } from '../models/User.model';

const urlApiUser = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MS_USER,
});
const useUser = () => {
  const [userPaginated, setuserPaginated] =
    useState<IUserPaginated>({
      items: [],
      total: 0,
      lastKey: '',
    });
  const [user, setUser] = useState<IUser | null>(null);

  const createUserService = async (userCreate: IUserCreateD) => {
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

  const getUserById = async (id: string) => {
    try {
      console.log('by id', id);
      const res = await urlApiUser.get<ApiResponse<IUser | null>>(
        `/get-population-by-id/${id}`
      );
      console.log(res.data.data, 'api get');
      setUser(res.data.data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const searchUserPaginated = async (
    filter : ISearchUser
  ) => {
    try {
      const objeto1: IUserPaginated = {
        items: [
          {
            id: 1,
            firtsName: "John",
            secondName: "Queve",
            availableDate: new Date(),
            mail: "john@example.com",
            username: "john123",
            profile: "Academico",
            status: true,
          },
          {
            id: 2,
            firtsName: "Jane",
            secondName: "Cardozo",
            availableDate: new Date(),
            mail: "jane@example.com",
            username: "jane456",
            profile: "SuperAdministrador",
            status: true,
          },
        ],
        total: 2,
        lastKey: "some_key",
      };      
      //Ajustar con post
      // const res = await urlApiPoblation.get<ApiResponse<IPoblationPaginated>>(
      //   '/get-population-paginated'
      // );
      // console.log(res.data.data);
      //setPobltionPaginated(res.data.data);
      setuserPaginated(objeto1);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const updateUserByIdService = async (dataToUpdate: IUser) => {
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
    userPaginated,
    user,
    searchUserPaginated,
    createUserService,
    updateUserByIdService,
    getUserById,
  };
};

export default useUser;
