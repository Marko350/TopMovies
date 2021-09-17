import useLocalStorage from "../hooks/useLocalStorage";
import styles from "./css/MovieHistory.module.css";
import { useHistory } from "react-router";

const MoviesHistory = () => {
  //using customHook useLocalStorage for getting value-data that is stored in LocalStorage
  const { value } = useLocalStorage("popularmovie", "");
  const history = useHistory();

  //getting out the dupplicates with filter method wich return new array
  const filter = value.filter(
    (movie, index, self) => index === self.findIndex((t) => t.id === movie.id)
  );

  //getting the first 10 objects from filter array and setting in newArray
  const newArray = filter.slice(0, 10);

  return (
    <div className={styles.headContainer}>
      {/* checking if there is something in newArray, if there is nothing there it will render null */}
      {newArray.length !== 0 ? (
        <>
          <h1>Latest visited movies</h1>
          <div className={styles.container}>
            {newArray.map((movie, i) => (
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
        </>
      ) : null}
    </div>
  );
};

export default MoviesHistory;
