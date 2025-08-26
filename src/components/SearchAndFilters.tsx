import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchAndFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    typeFilter: string;
    setTypeFilter: (value: string) => void;
    limit: number;
    setLimit: (value: number) => void;
}

const pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
                                                               search,
                                                               setSearch,
                                                               typeFilter,
                                                               setTypeFilter,
                                                               limit,
                                                               setLimit,
                                                           }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search Pokemon by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                        >
                            <option value="">All Types</option>
                            {pokemonTypes.map((type) => (
                                <option key={type} value={type} className="capitalize">
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                    >
                        <option value={12}>12 per page</option>
                        <option value={24}>24 per page</option>
                        <option value={36}>36 per page</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilters;