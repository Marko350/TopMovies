import { useQuery } from "react-query";
import { useParams } from "react-router";
import PersonsList from "../components/PersonsList";
import RelatedMovies from "../components/RelatedMovies";
import { getMovie } from "../services/BetsMoviesAPI";
import styles from "./css/Movie.module.css";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

const Movie = () => {
  const { id } = useParams();
  const { data } = useQuery(["movie", id], () => getMovie(id));

  //using custom hook to store every movie that is clicked by the user
  //key is popularmovie
  const { setValue, value } = useLocalStorage("popularmovie", "");

  useEffect(() => {
    if (!data) return null;
    //setting first new object in the array and then the rest of the objects
    setValue(() => [data, ...value]);
  }, [data]);

  return (
    <div>
      {data && (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
              alt="bigPoster"
            />

            <div className={styles.posterImage}>
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt="poster"
              />
              <div className={styles.posterInfo}>
                <span className={styles.firstSpan}>{data.title}</span>
                <div>
                  {data.genres.map((genre, i) => (
                    <span key={i}>{genre.name}, </span>
                  ))}
                </div>
                <span>{data.runtime} min</span>
              </div>
            </div>
          </div>

          <h1 className={styles.mobile}>{data.title}</h1>
          <section>
            <h5>Overview</h5>
            <p>{data.overview}</p>
            <h5>Release date:</h5>
            <p>{data.release_date}</p>
            <h5 className={styles.mobile}>Genres:</h5>
            {data.genres.map((genre, i) => (
              <span className={styles.mobile} key={i}>
                {genre.name},{" "}
              </span>
            ))}
            <h5 className={styles.mobile}>Runtime:</h5>
            <p className={styles.mobile}>{data.runtime} min</p>
            <h5>Status:</h5>
            <p>{data.status}</p>
            <h5>Country:</h5>
            {data.production_countries.map((country, i) => (
              <span key={i}>{country.name}, </span>
            ))}
            <h5 style={{ marginTop: "1rem" }}>Spoken languages:</h5>
            {data.spoken_languages.map((language, i) => (
              <span key={i}>{language.english_name}, </span>
            ))}
            <h5 style={{ marginTop: "1rem" }}>Production companies:</h5>
            {data.production_companies.map((compani, i) => (
              <span key={i}>{compani.name}, </span>
            ))}
          </section>
          <PersonsList />
          <RelatedMovies id={id} />
        </div>
      )}
    </div>
  );
};

export default Movie;
