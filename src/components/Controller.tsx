import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import WatchList from "./WatchList";
import MovieDetails from "./MovieDetails";
import Login from "./Login";
import Menu from "./Pages/Menu";
import PreLogin from "../components/Pages/Routes/Prelogin";
import PostLogin from "../components/Pages/Routes/PostLogin";

const Controller = () => {
  return (
    <Routes>
   
      <Route element={<PreLogin />}>
        <Route path="/" element={<Login />} />
      </Route>

 
      <Route element={<PostLogin />}>
        <Route path="/home" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/menu" element={<Menu />} />
      </Route>


      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Controller;
