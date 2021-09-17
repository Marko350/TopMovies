import { useQuery } from "react-query";
import { getAllPopularMovies } from "../services/BetsMoviesAPI";
import Carousel from "./Carousel";

const PopularMovies = () => {
  const { data } = useQuery("popularMovies", getAllPopularMovies);

  if (!data) return null;
  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto 0 auto" }}>
      <h1 className="mb-3">Popular movies</h1>
      {/* using Carousel component for rendering data */}
      <Carousel data={data.results} />
    </div>
  );
};

export default PopularMovies;
