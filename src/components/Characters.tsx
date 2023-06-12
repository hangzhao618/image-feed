"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import "./Characters.css";

interface Character {
  id: number;
  name: string;
  image: string;
}
const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beginCharactersPos, setBeginCharactersPos] = useState(0);
  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setCharacters(data.results);
    };
    fetchCharacters();
  }, []);

  const onPageChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrentPage(page);
    setBeginCharactersPos((page - 1) * 10);
  };

  return (
    <div className="container">
      <div className="title">Rick and Morty Characters</div>
      <div className="characters-list">
        {[...characters.slice(beginCharactersPos, beginCharactersPos + 10)].map(
          (character) => (
            <div className="character" key={character.id}>
              <img className="img" src={character.image} alt={character.name} />
              <h2 className="name">{character.name}</h2>
            </div>
          )
        )}
      </div>
      <div className="characters-footer">
        <Pagination
          current={currentPage}
          onChange={onPageChange}
          total={characters.length}
        />
      </div>
    </div>
  );
};

export default Characters;
