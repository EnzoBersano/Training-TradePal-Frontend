import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPokemons, deletePokemon } from '../api/pokemon';
import type { PaginatedPokemons } from '../types/pokemon';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import SearchAndFilters from '../components/SearchAndFilters';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { AlertTriangle } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');


  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, limit]);

  const { data, isLoading, isError } = useQuery<PaginatedPokemons>({
    queryKey: ['pokemons', page, limit, search, typeFilter],
    queryFn: () => getPokemons(page, limit, search, typeFilter),
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePokemon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemons'] });
    },
    onError: (error) => {
      console.error('Failed to delete Pokemon:', error);
    },
  });

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isError) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">
            We couldn't fetch the Pokémon data. Please check your connection and try again.
          </p>
          <button
              onClick={() => queryClient.invalidateQueries({ queryKey: ['pokemons'] })}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
    );
  }

  return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pokémon Collection</h1>
          <p className="text-gray-600">Discover and manage your favorite Pokémon</p>
        </div>

        <SearchAndFilters
            search={search}
            setSearch={setSearch}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            limit={limit}
            setLimit={setLimit}
        />

        {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <LoadingSpinner size="lg" />
            </div>
        ) : data?.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Pokémon Found</h2>
              <p className="text-gray-600 mb-4">
                {search || typeFilter
                    ? "Try adjusting your search or filter criteria"
                    : "No Pokémon available at the moment"}
              </p>
              {(search || typeFilter) && (
                  <button
                      onClick={() => {
                        setSearch('');
                        setTypeFilter('');
                      }}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
              )}
            </div>
        ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {data?.data.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onEdit={() => navigate(`/pokemon/edit/${pokemon.id}`)}
                        onDelete={() => handleDelete(pokemon.id, pokemon.name)}
                        onView={() => navigate(`/pokemon/${pokemon.id}`)}
                    />
                ))}
              </div>

              {data && (
                  <Pagination
                      currentPage={page}
                      totalPages={data.totalPages}
                      onPageChange={setPage}
                      isLoading={isLoading}
                  />
              )}
            </>
        )}

        {deleteMutation.isPending && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <LoadingSpinner className="mb-4" />
                <p className="text-gray-700">Deleting Pokémon...</p>
              </div>
            </div>
        )}
      </div>
  );
};

export default HomePage;