'use client'

import { useState } from 'react';
import HeroImage from "./components/HeroImage";
import HeritageCard from "./components/HeritageCard";
import SearchBar from "./components/SearchBar";
import SearchCard from "./components/SearchCard";
import { fetchHeritageList } from './types/fetchHeritageList';

export default function Culture() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState('');

  const searchHeritage = async (newQuery: string) => {
    if (newQuery.trim() === '') return;
    setQuery(newQuery); 
    const { items } = await fetchHeritageList(1, 25, newQuery);
    setSearchResults(items); 
  };

  return (
    <div>
      <div className="main">
        <HeroImage />
        <SearchCard />
        <div className="mb-10">
          <HeritageCard SearchResult={searchResults}/>
        </div>
        <div className="absolute top-60 left-1/2 transform -translate-x-1/2 z-20">
          <SearchBar searchHeritage={searchHeritage} />
        </div>
      </div>
    </div>
  );
}
