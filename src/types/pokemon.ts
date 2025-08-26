
export type PokemonType =
    | 'NORMAL'
    | 'FIRE'
    | 'WATER'
    | 'GRASS'
    | 'ELECTRIC'
    | 'ICE'
    | 'FIGHTING'
    | 'POISON'
    | 'GROUND'
    | 'FLYING'
    | 'PSYCHIC'
    | 'BUG'
    | 'ROCK'
    | 'GHOST'
    | 'DARK'
    | 'DRAGON'
    | 'STEEL'
    | 'FAIRY';

export const POKEMON_TYPES = {
    NORMAL: 'NORMAL',
    FIRE: 'FIRE',
    WATER: 'WATER',
    GRASS: 'GRASS',
    ELECTRIC: 'ELECTRIC',
    ICE: 'ICE',
    FIGHTING: 'FIGHTING',
    POISON: 'POISON',
    GROUND: 'GROUND',
    FLYING: 'FLYING',
    PSYCHIC: 'PSYCHIC',
    BUG: 'BUG',
    ROCK: 'ROCK',
    GHOST: 'GHOST',
    DARK: 'DARK',
    DRAGON: 'DRAGON',
    STEEL: 'STEEL',
    FAIRY: 'FAIRY'
} as const;


export interface CreatePokemonRequest {
    name: string;
    type: PokemonType;
    height: number;
    weight: number;
    imageUrl?: string;
}


export interface Pokemon {
    id: number;
    name: string;
    type: PokemonType;
    height: number;
    weight: number;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;

}


export interface PaginatedPokemons {
    data: Pokemon[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}


export interface Ability {
    id: number;
    name: string;
    description?: string;
}

export interface AbilityResponse {
    id: number;
    name: string;
    description?: string;
}