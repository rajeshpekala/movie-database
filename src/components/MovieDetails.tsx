import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Card, CardMedia, CardContent, Grid, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { RootState } from "./redux/store";
import {setSelectedMovie}  from "./redux/slices/movieSlice"; // Ensure correct import

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const movie = useSelector((state: RootState) => state.movie.selectedMovie);
  const loading = !movie;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/data");
        const movies = response.data;

        if (movies && Array.isArray(movies)) {
          const foundMovie = movies.find((movie) => movie.id === parseInt(id || ""));
          dispatch(setSelectedMovie(foundMovie || null));
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        dispatch(setSelectedMovie(null));
      }
    };

    fetchMovie();
  }, [id, dispatch]);

  if (loading) {
    return (
      <Box sx={{ paddingTop: "40px", display: "flex", justifyContent: "center" }}>
        {/* <CircularProgress /> */}
        Loading
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box sx={{ paddingTop: "80px", display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">Movie not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: "80px" }}>
      <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CardMedia
          component="img"
          height="620"
          image={movie.image}
          alt={movie.title}
          sx={{ width: "100%" }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h4" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {movie.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {t('release_date')}: {movie.releaseDate}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ paddingLeft: 2 }}>
          {t("cast")}
        </Typography>
        <Grid container spacing={2}>
          {movie.cast && movie.cast.length > 0 ? (
            movie.cast.map((actor) => (
              <Grid item xs={12} sm={6} md={3} key={actor.name}>
                <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <CardMedia
                    component="img"
                    height="500"
                    image={actor.image}
                    alt={actor.name}
                    sx={{ width: "100%" }}
                    style={{ borderRadius: "2px" }}
                  />
                  <CardContent>
                    <Typography variant="body1" align="center">
                      {actor.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center">
              No cast information available.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default MovieDetails;
