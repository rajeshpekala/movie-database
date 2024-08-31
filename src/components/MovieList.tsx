import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
  setMovies,
} from "./redux/slices/movieSlice";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import { RootState } from "./redux/store";
import { useTranslation } from "react-i18next";

interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  language: string;
  cast: { name: string; image: string }[];
  genre : string
}

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movie.movies);
  const watchlist = useSelector((state: RootState) => state.movie.watchlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isValidData, setIsValidData] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/data");
        setLoading(false);

        if (Array.isArray(response.data)) {
          const movieList: Movie[] = response.data;
          dispatch(setMovies(movieList));
        } else {
          setIsValidData(false);
          dispatch(setMovies([]));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsValidData(false);
        dispatch(setMovies([]));
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [dispatch]);

  useEffect(() => {
    const filterMovies = () => {
      let filtered = movies;

      if (debouncedSearchTerm) {
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      }

      if (selectedLanguage) {
        filtered = filtered.filter(
          (movie) =>
            movie.language.toLowerCase() === selectedLanguage.toLowerCase()
        );
      }

      if (selectedGenre) {
        filtered = filtered.filter(
          (movie) =>
            movie.genre.toLowerCase() === selectedGenre.toLowerCase()
        );
      }

      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [movies, debouncedSearchTerm, selectedLanguage,selectedGenre]);

  const handleMovieLanguageChange = (e: SelectChangeEvent<string>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleGenreChange = (e:SelectChangeEvent<string>) =>{
    setSelectedGenre(e.target.value)
  }

  const handleAddToWatchlist = (movie: Movie) => {
    const isAlreadyInWatchlist = watchlist.some(
      (watchlistMovie) => watchlistMovie.id === movie.id
    );

    if (isAlreadyInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
      toast.success(t("movie_removed_from_watchlist"));
    } else {
      dispatch(addToWatchlist(movie));
      toast.success(t("movie_added_to_watchlist"));
    }
  };

  if (loading) {
    return (
      <Box
        sx={{ paddingTop: "80px", display: "flex", justifyContent: "center" }}
      >
        Loading
        {/* <CircularProgress/> */}
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: "80px" }}>
      <TextField
        label={t("search_movies")}
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      {isValidData && movies.length > 0 && (
        <Box sx={{ width: 400, mb: 3 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="movie-language-select-label">
              {t("movie_language")}
            </InputLabel>
            <Select
              labelId="movie-language-select-label"
              id="movie-language-select"
              value={selectedLanguage}
              label={t("movie_language")}
              onChange={handleMovieLanguageChange}
            >
              <MenuItem value="">All Languages</MenuItem>
              <MenuItem value="Telugu">Telugu</MenuItem>
              <MenuItem value="Hindi">Hindi</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Tamil">Tamil</MenuItem>
              <MenuItem value="Kannada">Kannada</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: 200 }}>
            <InputLabel id="movie-genre-select-label">
              {t("genre")}
            </InputLabel>
            <Select
              labelId="movie-genre-select-label"
              id="movie-genre-select"
              value={selectedLanguage}
              label={t("genre")}
              onChange={handleGenreChange}
            >
              <MenuItem value="">All Genres</MenuItem>
              <MenuItem value="Thriller">Thriller</MenuItem>
              <MenuItem value="Drama">Drama</MenuItem>
              <MenuItem value="Action">Action</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
             
            </Select>
          </FormControl>
         
        </Box>
        
        
      )}
      {filteredMovies.length > 0 ? (
        <Grid container spacing={2}>
          {filteredMovies.map((movie) => {
            const isInWatchlist = watchlist.some(
              (watchlistMovie) => watchlistMovie.id === movie.id
            );

            return (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.image}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.description}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/movies/${movie.id}`}
                      variant="contained"
                      sx={{ mt: 1 }}
                    >
                      {t("view_details")}
                    </Button>
                    <Button
                      onClick={() => handleAddToWatchlist(movie)}
                      variant="contained"
                      sx={{ mt: 1, ml: 1 }}
                    >
                      {isInWatchlist
                        ? t("remove_from_watchlist")
                        : t("add_to_watchlist")}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 3 }}>
          {t("no_movies_found")}
        </Typography>
      )}
      <ToastContainer autoClose={3000} position="bottom-left" />
    </Box>
  );
};

export default MovieList;
