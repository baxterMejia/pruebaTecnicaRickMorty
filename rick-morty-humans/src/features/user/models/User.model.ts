export interface IUserCreateD {
  id: number;
  firtsName: string;
  secondName: string;
  availableDate : Date;
  mail : string;
  username : string;
  profile : string;
  status : boolean;
}

export interface IUser {
  id: number;
  firtsName: string;
  secondName: string;
  availableDate : Date;
  mail : string;
  username : string;
  profile : string;
  status : boolean;
}

export interface IUserPaginated {
  items: IUser[];
  total: number;
  lastKey: string;
}

export interface ISearchUser {
  id?: number;
  firtsName?: string;
  secondName?: string;
  availableDate? : Date;
  mail? : string;
  username? : string;
  profile? : string;
  status? : boolean;
}