import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { removeFromWatchlist } from "./redux/slices/movieSlice";

const WatchList = () => {
  const watchlist = useSelector((state: RootState) => state.movie.watchlist);
  const dispatch = useDispatch();

  const handleRemoveFromWatchlist = (id: number) => {
    dispatch(removeFromWatchlist(id));
  };

  return (
    <Box sx={{ paddingTop: "80px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginBottom: 2, textAlign: "center" }}
      >
        My Watchlist
      </Typography>
      <Grid container spacing={3}>
        {watchlist.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", width: "100%", paddingTop: "40px" }}
          >
            No movies in your watchlist.
          </Typography>
        ) : (
          watchlist.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card sx={{ elevation: 3 }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={movie.image}
                  alt={movie.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFromWatchlist(movie.id)}
                    sx={{ mt: 2 }}
                  >
                    Remove from Watchlist
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default WatchList;
