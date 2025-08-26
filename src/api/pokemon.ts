import axios from 'axios';
import type { Pokemon, PaginatedPokemons, CreatePokemonRequest } from '../types/pokemon';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPokemons = async (
    page = 1,
    limit = 12,
    search = '',
    typeFilter = ''
): Promise<PaginatedPokemons> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(typeFilter && { type: typeFilter }),
  });

  const response = await api.get(`/pokemons?${params}`);
  return response.data;
};

export const getPokemon = async (id: number): Promise<Pokemon> => {
  const response = await api.get(`/pokemons/${id}`);
  return response.data;
};

export const createPokemon = async (pokemon: CreatePokemonRequest): Promise<Pokemon> => {
  const response = await api.post('/pokemons', pokemon);
  return response.data;
};

export const updatePokemon = async (id: number, pokemon: Partial<CreatePokemonRequest>): Promise<Pokemon> => {
  const response = await api.patch(`/pokemons/${id}`, pokemon);
  return response.data;
};

export const deletePokemon = async (id: number): Promise<void> => {
  await api.delete(`/pokemons/${id}`);
};

export const getPokemonTypes = async () => {
  const response = await api.get('/pokemon/types');
  return response.data;
};

export const getPokemonsByAbility = async (ability: string): Promise<Pokemon[]> => {
  const response = await api.get(`/abilities/pokemons?ability=${ability}`);
  return response.data;
};

export const getAbilities = async (name?: string): Promise<any[]> => {
  const params = name ? `?name=${name}` : '';
  const response = await api.get(`/abilities${params}`);
  return response.data;
};