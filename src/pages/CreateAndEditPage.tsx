import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPokemon, createPokemon, updatePokemon } from "../api/pokemon";
import type { Pokemon } from "../types/pokemon";

const CreateEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    type: "",
    height: "",
    weight: "",
    imageUrl: "",
  });

  
  const { data: pokemonData, isLoading } = useQuery<Pokemon>({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemon(Number(id)),
    enabled: isEdit
  });

  
  useEffect(() => {
    if (pokemonData) {
      setForm({
        name: pokemonData.name,
        type: pokemonData.type,
        height: String(pokemonData.height),
        weight: String(pokemonData.weight),
        imageUrl: pokemonData.imageUrl,
      });
    }
  }, [pokemonData]);

  
  const mutation = useMutation({
    mutationFn: (payload: Omit<Pokemon, "id">) =>
      isEdit ? updatePokemon(Number(id), payload) : createPokemon(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
      alert(isEdit ? "Pokémon updated!" : "Pokémon created!");
      navigate("/"); 
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      name: form.name,
      type: form.type,
      height: Number(form.height),
      weight: Number(form.weight),
      imageUrl: form.imageUrl,
    };
    mutation.mutate(payload);
  };

  if (isEdit && isLoading) return <div>Loading Pokémon...</div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Pokémon" : "Create Pokémon"}
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded p-2"
          required
        >
          <option value="">Select Type</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          
        </select>
        <input
          name="height"
          type="number"
          placeholder="Height (m)"
          value={form.height}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <input
          name="weight"
          type="number"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEdit ? "Update" : "Create"}
        </button>
        <button 
          type="button" 
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateEditPage;
