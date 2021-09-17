import { useQuery } from "react-query";
import { getTrendingMovies } from "../services/BetsMoviesAPI";
import { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styles from "./css/MovieHistory.module.css";
import { useHistory } from "react-router";

const TrendingMovies = () => {
  const history = useHistory();
  //using hook useState for changing day and week for fetching data
  const [time, setTime] = useState("day");
  const [day, setDay] = useState(true);
  const { data } = useQuery(["trending", time], () => getTrendingMovies(time), {
    keepPreviousData: true,
  });

  //function for changing class names when clicking on a button
  function toggleDayClass() {
    setDay(!day);
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto 4rem auto" }}>
      <div className="d-flex align-items-center mb-3">
        <h1>Trending movies</h1>

        <ButtonGroup style={{ marginLeft: "30px" }}>
          <ToggleButton
            onClick={() => {
              toggleDayClass();
              setTime("day");
            }}
            className={day ? "day" : null}
            variant="secondary"
          >
            Day
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              toggleDayClass();
              setTime("week");
            }}
            className={!day ? "week" : null}
            variant="secondary"
          >
            Week
          </ToggleButton>
        </ButtonGroup>
      </div>

      <div className={styles.headContainer}>
        <div className={styles.container}>
          {data &&
            data.results.map((movie, i) => (
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

export default TrendingMovies;
