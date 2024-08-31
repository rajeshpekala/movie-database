import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import movieReducer, { setMovies } from "../redux/slices/movieSlice";
import authReducer from "../redux/slices/authSlice";
import themeReducer from "../redux/slices/themeSlice";
import MovieList from "../MovieList";
import React from "react";
import { TextField } from "@mui/material";


const movieData = [
  {
    id: 1,
    title: "Bahubali",
    description: "It is a Telugu Film",
    releaseDate: "August 24",
    language: "Telugu",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9e081727685123.56369171b80b1.jpg",
    cast: [
      {
        name: "Prabash",
        image: "https://i.pinimg.com/originals/d9/f0/88/d9f08864dc441c8a4a905dbc916f65cd.jpg"
      },
      {
        name: "Anushka",
        image: "https://m.media-amazon.com/images/M/MV5BMjI2MzkwNzg5M15BMl5BanBnXkFtZTgwMDk4MDAwNDE@._V1_.jpg"
      }
    ]
  },
  {
    id: 2,
    title: "Bahubali-2",
    description: "It is a Telugu Film",
    releaseDate: "August 17",
    language: "Telugu",
    image: "https://origin-staticv2.sonyliv.com/0/bahubali_2_12dec_landscape_thumb.jpg",
    cast: [
      {
        name: "Prabash",
        image: "https://i.pinimg.com/originals/d9/f0/88/d9f08864dc441c8a4a905dbc916f65cd.jpg"
      },
      {
        name: "Anushka",
        image: "https://m.media-amazon.com/images/M/MV5BMjI2MzkwNzg5M15BMl5BanBnXkFtZTgwMDk4MDAwNDE@._V1_.jpg"
      }
    ]
  }
];


describe("MovieList Component", () => {
  let store;
  const setLoading = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");

  beforeEach(() => {
    useStateSpy.mockImplementation(() => [false, setLoading]);
    store = configureStore({
      reducer: {
        auth: authReducer,
        movie: movieReducer,
        theme: themeReducer,
      },
    });
  });

 

  // test("renders Loading State", () => {
  //   useStateSpy.mockImplementation(() => [true, setLoading]);
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MovieList />
  //     </Provider>
  //   );
  //   expect(wrapper.find("div").text()).toContain("Loading");
  // });

  // test("renders if no movies found", () => {
  //   useStateSpy.mockImplementation(() => [false, setLoading]);
  //   store.dispatch(setMovies([]));
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MovieList />
  //     </Provider>
  //   );
  //   console.log(wrapper.debug())
  //   expect(wrapper.find("h6").text()).toContain("no_movies_found");
  // });

  test("renders Non-Loading State with Movie Data", async () => {
    useStateSpy.mockImplementation(() => [false, setLoading]);
    await store.dispatch(setMovies(movieData));
    const state = store.getState();
    console.log(state.movie.movies)
    expect(state.movie.movies).toEqual(movieData);

    const wrapper = mount(
      <Provider store={store}>
        <MovieList />
      </Provider>
    );

    expect(wrapper.find(TextField).exists()).toBe(true);
    expect(wrapper.find(TextField).prop("label")).toContain("search_movies");

    movieData.forEach((movie) => {
      expect(wrapper.text()).toContain(movie.title);
      expect(wrapper.text()).toContain(movie.description);
      expect(wrapper.find("img").some((img) => img.prop("src") === movie.image)).toBe(true);
    });

    expect(wrapper.find(Select).exists()).toBe(true);
    expect(wrapper.find(Button).text()).toContain("view_details");
  });
});
