import { useQuery } from "react-query";
import { getAllMovies, getGenres } from "../services/BetsMoviesAPI";
import AllMovies from "../components/AllMovies";
import styles from "./css/Genre.module.css";
import { useState, useEffect } from "react";
import { useUrlSearchParams } from "use-url-search-params";

const Genre = () => {
  //useUrlSearchParams is changing the url wit given value
  const [searchParams, setSearchParams] = useUrlSearchParams(
    { page: 1, id: null },
    { page: Number, id: Number }
  );
  const [page, setPage] = useState(searchParams.page);
  const [id, setId] = useState(searchParams.id);

  //getGenres function is getting all genres with useQuery and storing in data
  const { data } = useQuery("genre", getGenres);

  //getting allMovies and data is renamed with allData because data is declared when getting all genres
  //useQuery is activating on first rendering and every time when page and id is changed
  const { data: allData, isPreviousData } = useQuery(
    ["moviesID", searchParams],
    () => {
      return getAllMovies(page, id);
    },
    {
      //option from useQuery to keppPreviosData
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    //putting searchParams elements and then setting page and id in that object
    setSearchParams({ ...searchParams, page, id });

    //scrollToTop
    window.scrollTo(0, 0);

    //when id or page are changing value, useEffect is triggered
  }, [id, page]);

  return (
    <>
      <div className={styles.container}>
        <label htmlFor="genre">Choose genre:</label>
        <select
          name="genre"
          id="genre"
          onChange={(e) => {
            if (e.target.value === "Choose") {
              setId(null);
              return;
            }
            setId(e.target.value);
            setPage(1);
          }}
        >
          <option value="Choose">Choose</option>
          {data &&
            data.genres.map((genre, i) => (
              <option key={i} value={genre.id}>
                {genre.name}
              </option>
            ))}
        </select>
      </div>
      {data && (
        <AllMovies
          id={id}
          data={allData}
          page={searchParams.page}
          setPage={setPage}
          isPreviousData={isPreviousData}
        />
      )}
    </>
  );
};

export default Genre;
