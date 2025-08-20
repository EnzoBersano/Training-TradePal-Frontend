import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPokemons, deletePokemon } from "../api/pokemon";
import type { Pokemon, PaginatedPokemons } from "../types/pokemon";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  
  const { data, isLoading, isError } = useQuery<PaginatedPokemons>({
    queryKey: ["pokemons", page, limit, search, typeFilter],
    queryFn: () => getPokemons(page, limit, search, typeFilter),
    placeholderData: (previousData) => previousData
  });

  
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePokemon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching Pokémon</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <input
            placeholder="Search by name"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded px-2"
          >
            <option value="">All Types</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            
          </select>
          <button 
            onClick={() => navigate("/pokemon/create")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.data.map((pokemon: Pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onEdit={() => navigate(`/pokemon/edit/${pokemon.id}`)}
            onDelete={() => deleteMutation.mutate(pokemon.id)}
            onView={() => navigate(`/pokemon/${pokemon.id}`)}
          />
        ))}
      </div>

      
      <div className="flex justify-center gap-2 mt-6">
        <button 
          disabled={page === 1} 
          onClick={() => setPage((p) => p - 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={data && data.data.length < limit}
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
