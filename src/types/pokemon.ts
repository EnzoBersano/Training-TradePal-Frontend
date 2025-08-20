export interface Pokemon {
    id: number;
    name: string;
    type: string;
    height: number;
    weight: number;
    imageUrl: string;
  }
  
  export interface PaginatedPokemons {
    data: Pokemon[];
    total: number;
  }
  