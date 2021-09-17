//importing axios for fetching data
import axios from "axios";

//apiKey from TMDB for fetching data
const apiKey = "ddda3324b0276eddcbe109d70d5be2cc";

//putting axios starting url
axios.defaults.baseURL = "https://api.themoviedb.org/3/movie";

//making new date-time
//im using time for getting the latest movies
let time = new Date();
time = time.toISOString().slice(0, 10);

//starting get function for fetching data with axios which i can use in many places
//asyncronous function for fetching data with async and await
const get = async (endPoint) => {
  const result = await axios.get(endPoint);
  return result.data;
};

//getting one specifik movie with passed movie id
export const getMovie = async (id) => {
  const result = await get(`/${id}?api_key=${apiKey}&language=en-US`);
  return result;
};

//getting all popular movies
export const getAllPopularMovies = async () => {
  const result = await get(`/popular?api_key=${apiKey}&language=en-US&page=1`);
  return result;
};

//getting all top rated movies and passing page for changing pages(paginering)
export const getAllTopRatedMovies = async (page) => {
  const result = await get(
    `/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
  );
  return result;
};

//getting all movies if there is no id passed
//if there is id then is getting specifik movies with genre id
export const getAllMovies = async (page, id) => {
  if (!id) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&page=${page}`
    );

    return result.data;
  } else {
    const result = await get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&page=${page}&with_genres=${id}`
    );

    return result;
  }
};

//getting all persons from one movie with movie id
export const getPersons = async (id) => {
  const result = await get(`/${id}/credits?api_key=${apiKey}`);
  return result;
};

//getting all details about one person
export const getPersonDetails = async (id) => {
  const result = await get(
    `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits`
  );
  return result;
};

//getting recomended movies to one movie
export const getRecomendedMovies = async (id) => {
  const result = await get(
    `/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`
  );
  return result;
};

//getting all genres
export const getGenres = async () => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  );
  return result.data;
};

//if there is no search(text) getting all movies, otherwise is getting all movies that are matching the search(text)
export const getMovieSearch = async ({ page, search }) => {
  if (search === "") {
    return getAllMovies(page);
  }

  const result = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${page}&include_adult=false`
  );
  return result.json();
};

//getting trending movies by day and week by passing time parameter wich will be "day" or "week"
export const getTrendingMovies = async (time) => {
  const result = await fetch(
    `https://api.themoviedb.org/3/trending/movie/${time}?api_key=${apiKey}`
  );
  return result.json();
};

//getting latest movies by time wich is changing by every page starting
export const getLatestMovies = async () => {
  const result = await fetch(`
  https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&primary_release_date.lte=${time}&sort_by=primary_release_date.desc&with_original_language=en`);
  return result.json();
};
