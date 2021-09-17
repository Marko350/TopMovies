import { Container } from "react-bootstrap";
import LatestMovies from "../components/LatestMovies";
import MoviesHistory from "../components/MoviesHistory";
import PopularMovies from "../components/PopularMovies";
import TrendingMovies from "../components/TrendingMovies";

const Home = () => {
  return (
    <Container style={{ maxWidth: "1200px" }}>
      <PopularMovies />
      <LatestMovies />
      <TrendingMovies />
      <MoviesHistory />
    </Container>
  );
};

export default Home;
