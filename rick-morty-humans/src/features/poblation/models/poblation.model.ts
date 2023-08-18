export interface IPoblationCreateD {
  id: number;
  description: string;
  status: boolean;
  availableDate : Date;
}

export interface IPoblation {
  id: number;
  description: string;
  status: boolean;
  availableDate : Date;
}

export interface IPoblationPaginated {
  items: CharacterResponse[];
  total: number;
  lastKey: string;
}

export interface CharacterResponse  {
  name: string;
  image: string;
  status: string;  // Puedes considerar usar un tipo más restrictivo, por ejemplo, un tipo de unión si solo hay ciertos estados válidos: "Alive" | "Dead" | "Unknown"
  gender: string;  // Similar al estado, si solo hay ciertos géneros válidos puedes usar: "Male" | "Female" | "Unknown"
  origin: {
    name: string;   // Parece que "origin" es un objeto con una propiedad "name". Si hay más propiedades, agrégalas aquí.
  };
};

export interface CharactersData  {
  info: {
    count: number;
  };
  results: CharacterResponse[];
};

export interface PoblationResponse  {
  data: {
    characters: CharactersData;
  };
};

// Actualiza tu llamada axios

