import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPokemon } from '../api/pokemon';
import { getTypeColor } from '../utils/typeColors';
import LoadingSpinner from '../components/LoadingSpinner';
import { Edit2, ArrowLeft } from 'lucide-react';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
    );
  }

  if (isError || !pokemon) {
    return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pokemon not found</h2>
          <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
    );
  }


  return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-2 text-white hover:text-red-200 transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span>Back to Pokédex</span>
              </button>
              <button
                  onClick={() => navigate(`/pokemon/edit/${pokemon.id}`)}
                  className="flex items-center space-x-2 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Edit2 size={18} />
                <span>Edit</span>
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold capitalize mb-2">
                {pokemon.name}
              </h1>
              <p className="text-red-200 text-lg">
                #{pokemon.id.toString().padStart(3, '0')}
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-gray-50 rounded-xl p-8 mb-6">
                  <img
                      src={pokemon.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                      alt={pokemon.name}
                      className="w-64 h-64 mx-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/256x256?text=Pokemon';
                      }}
                  />
                </div>
                <div className="flex justify-center space-x-2 mb-4">
                  <span
                      className="px-4 py-2 rounded-full text-white font-medium capitalize"
                      style={{ backgroundColor: getTypeColor(pokemon.type) }}
                  >
                    {pokemon.type.toLowerCase()}
                  </span>
                </div>
              </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Physical Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">{pokemon.height / 10}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">{pokemon.weight / 10}kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default PokemonDetail;
