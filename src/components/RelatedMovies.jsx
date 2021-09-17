import { useQuery } from "react-query";
import { getRecomendedMovies } from "../services/BetsMoviesAPI";
import { useHistory } from "react-router";
import styles from "./css/Related.module.css";

//getting id direct with help of {}, without using props.id
const RelatedMovies = ({ id }) => {
  const history = useHistory();
  const { data } = useQuery("recomended", () => getRecomendedMovies(id));

  return (
    <div style={{ width: "90%", margin: "0 auto 3rem auto" }}>
      {data?.total_results !== 0 ? (
        <>
          <h1>Related movies:</h1>
          <div className={styles.container}>
            {data &&
              data.results.map((movie, i) => (
                <div className={styles.movies} key={i}>
                  <img
                    onClick={() => history.push(`/movie/${movie.id}`)}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="Poster"
                  />

                  <p>{movie.title}</p>
                </div>
              ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RelatedMovies;
