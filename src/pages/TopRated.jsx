import { useQuery } from "react-query";
import { getAllTopRatedMovies } from "../services/BetsMoviesAPI";
import { Row, Card, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUrlSearchParams } from "use-url-search-params";
import Pagination from "../components/Pagination";

const TopRated = () => {
  const [searchParams, setSearchParams] = useUrlSearchParams(
    { page: 1 },
    { page: Number }
  );
  const [page, setPage] = useState(searchParams.page);

  //passing id in array for when id is changing that is triggering the useQuery
  const { data, isPreviousData } = useQuery(
    ["topRated", page],
    () => getAllTopRatedMovies(page),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setSearchParams({ ...searchParams, page });
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <Container className="mt-5 pb-5">
        <h1 className="mb-3">Top Rated Movies:</h1>
        <Row fluid="md" xs={2} sm={3} md={4} lg={5} className="g-4">
          {data &&
            data.results.map((movie, i) => (
              <Col key={i}>
                <Card style={{ border: "none", background: "#dee2e6" }}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{ color: "black" }}
                      className="fs-6 title"
                    >
                      {movie.title}
                    </Card.Title>
                    <span>Release date:</span>
                    <Card.Text>{movie.release_date}</Card.Text>
                    <Link to={`/movie/${movie.id}`}>
                      <Button size="sm" variant="dark">
                        Read more
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
      <Pagination
        whichPage={page}
        setPage={setPage}
        data={data}
        isPreviousData={isPreviousData}
      />
    </>
  );
};

export default TopRated;
