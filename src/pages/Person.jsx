import { useQuery } from "react-query";
import { getPersonDetails } from "../services/BetsMoviesAPI";
import { useHistory, useParams } from "react-router";
import styles from "./css/PersonPage.module.css";

const Person = () => {
  const { id } = useParams();
  const history = useHistory();

  //getting information for Person with getPersonDetails function and passing the id of that person with help of useParams
  const { data } = useQuery(["person", id], () => getPersonDetails(id));

  return (
    <div className={styles.container}>
      {/* mobile view */}
      {data && (
        <div className={styles.mobile}>
          <img
            src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
            alt=""
          />
          <section>
            <h1>{data.name}</h1>
            <h5>Place of birth:</h5>
            <p>{data.place_of_birth}</p>
            <h5>Birthday:</h5>
            <p>{data.birthday}</p>
            <h5>Biography:</h5>
            <p>{data.biography}</p>
            <h2>Known for:</h2>
            <div className={styles.moviesContainer}>
              {data.credits.cast.map((movie, i) => (
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
          </section>
        </div>
      )}
      {/* ipad and desktop view */}
      {data && (
        <div className={styles.ipad}>
          <div className={styles.photo}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                alt=""
              />
              <div style={{ marginLeft: "20px" }}>
                <h5>Place of birth:</h5>
                <p>{data.place_of_birth}</p>
                <h5>Birthday:</h5>
                <p>{data.birthday}</p>
              </div>
            </div>

            <div className={styles.info}>
              <h1>{data.name}</h1>
              <h5>Biography:</h5>
              <p>{data.biography}</p>
            </div>
          </div>
          <h2>Known for:</h2>
          <div className={styles.moviesContainer}>
            {data.credits.cast.map((movie, i) => (
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
        </div>
      )}
    </div>
  );
};

export default Person;
