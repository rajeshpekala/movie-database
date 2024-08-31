import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  language: string;
  cast: { name: string; image: string }[];
}

interface MovieState {
  movies: Movie[];
  watchlist: Movie[];
  selectedMovie: Movie | null;
}

const initialState: MovieState = {
  movies: [],
  watchlist: [],
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setSelectedMovie(state, action: PayloadAction<Movie | null>) {
      state.selectedMovie = action.payload;
    },
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { setMovies, addToWatchlist,setSelectedMovie, removeFromWatchlist } =
  movieSlice.actions;
export default movieSlice.reducer;
