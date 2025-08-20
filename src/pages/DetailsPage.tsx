import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPokemon, deletePokemon } from "../api/pokemon";
import type { Pokemon } from "../types/pokemon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch Pokémon data
  const { data: pokemon, isLoading, isError } = useQuery<Pokemon>({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemon(Number(id))
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => deletePokemon(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
      alert("Pokémon deleted!");
      navigate("/");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !pokemon) return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Pokémon Not Found</h1>
      <Button onClick={() => navigate("/")}>Back to List</Button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{pokemon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <p><strong>Type:</strong> {pokemon.type}</p>
          <p><strong>Height:</strong> {pokemon.height} m</p>
          <p><strong>Weight:</strong> {pokemon.weight} kg</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => navigate(`/pokemon/edit/${pokemon.id}`)}>Edit</Button>
            <Button variant="destructive" onClick={() => deleteMutation.mutate()}>
              Delete
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsPage;
