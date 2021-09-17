import { useQuery } from "react-query";
import { getLatestMovies } from "../services/BetsMoviesAPI";
import styles from "./css/MovieHistory.module.css";
import { useHistory } from "react-router";

const LatestMovies = () => {
  //getting data with useQuery  and passing function for calling the fetch method from BestsMovieApi file.
  const { data } = useQuery("latestMovies", getLatestMovies);
  //useHistory for going to another page
  const history = useHistory();

  if (!data) return null;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto 4rem auto" }}>
      <h1 className="mb-3">Latest movies</h1>
      <div className={styles.headContainer}>
        <div className={styles.container}>
          {data.results.map((movie, i) => (
            <div className={styles.movies} key={i}>
              <img
                onClick={() => history.push(`/movie/${movie.id}`)}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Poster"
              />

              <p className="title">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestMovies;
