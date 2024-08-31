export interface Movie {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    image: string;
    language: string;
    cast: { name: string; image: string }[];
  }
  