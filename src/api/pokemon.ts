import axios from "axios";
import type { Pokemon, PaginatedPokemons } from "../types/pokemon"; // Import types

const API_URL = "http://localhost:3000/pokemons";

export const getPokemons = async (page = 1, limit = 10, search = "", type = ""): Promise<PaginatedPokemons> => {
  const response = await axios.get(API_URL, {
    params: { page, limit, search, type }
  });
  return response.data;
};

export const getPokemon = async (id: number): Promise<Pokemon> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPokemon = async (data: Omit<Pokemon, "id">): Promise<Pokemon> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updatePokemon = async (id: number, data: Omit<Pokemon, "id">): Promise<Pokemon> => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deletePokemon = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
