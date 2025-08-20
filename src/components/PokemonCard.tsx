import React from "react";
import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onEdit, onDelete, onView }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition">
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        className="w-full h-32 object-cover mb-2 rounded"
      />
      <h2 className="text-lg font-bold">{pokemon.name}</h2>
      <p>Type: {pokemon.type}</p>
      <p>Height: {pokemon.height} m</p>
      <p>Weight: {pokemon.weight} kg</p>
      <div className="flex gap-2 mt-2">
        <button 
          onClick={onView}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          View
        </button>
        <button 
          onClick={onEdit}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
        >
          Edit
        </button>
        <button 
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
