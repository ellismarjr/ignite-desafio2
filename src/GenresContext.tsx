import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from './services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenresProviderProps {
  children: ReactNode;
}

interface GenresContextDate {
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export const GenresContext = createContext<GenresContextDate>({} as GenresContextDate);

export function GenresProvider({ children }: GenresProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenresContext.Provider value={{genres, handleClickButton, selectedGenreId}}>
      {children}
    </GenresContext.Provider>
  );
}

export function useGenres() {
  const context = useContext(GenresContext);
  return context;
}