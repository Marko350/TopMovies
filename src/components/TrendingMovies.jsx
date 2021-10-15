import { useQuery } from "react-query";
import { getTrendingMovies } from "../services/BetsMoviesAPI";
import { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styles from "./css/MovieHistory.module.css";
import { useHistory } from "react-router";
import { useUrlSearchParams } from "use-url-search-params";

const TrendingMovies = () => {
  const [searchParams, setSearchParams] = useUrlSearchParams(
    { trending: "day" },
  );
  const history = useHistory();
  //using hook useState for changing day and week for fetching data
  const [trending, setTrending] = useState(searchParams.trending);
  const [day, setDay] = useState(true);
  const { data } = useQuery(["trending", searchParams], () => getTrendingMovies(trending), {
    keepPreviousData: true,
  });

  useEffect(() => {
    setSearchParams({ ...searchParams, trending});

    //checking if trending is day after Refresh page so that style of day and week is correct
    if(trending === "day") {
      setDay(true);
    } else {
      setDay(false)
    }
  }, [trending]);


  //when clicks on day button
  function toggleDayClass() {
    if(day) {
      return;
    } else {
      setTrending("day");
      setDay(!day);
    }
  }

  //when clicks on week button
  function toggleWeekClass() {
    if(day) {
      setTrending("week");
      setDay(!day);
      } else {
        return;
      }
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto 4rem auto" }}>
      <div className="d-flex align-items-center mb-3">
        <h1>Trending movies</h1>
        <ButtonGroup style={{ marginLeft: "30px" }}>
          <ToggleButton
            onClick={toggleDayClass}
            className={day ? "day" : null}
            variant="secondary"
          >
            Day
          </ToggleButton>
          <ToggleButton
            onClick={toggleWeekClass}
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
