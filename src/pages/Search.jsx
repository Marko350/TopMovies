import { useQuery } from "react-query";
import { getMovieSearch } from "../services/BetsMoviesAPI";
import { Button, Row, Form, Col, Container } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";
import AllMovies from "../components/AllMovies";
import { useUrlSearchParams } from "use-url-search-params";

const Search = () => {
  const [searchParams, setSearchParams] = useUrlSearchParams(
    { page: 1, search: "" },
    { page: Number }
  );
  const [page, setPage] = useState(searchParams.page);
  const [text, setText] = useState(searchParams.search);
  const reference = useRef();
  const { data, isLoading, isPreviousData } = useQuery(
    ["search", searchParams],
    () => getMovieSearch(searchParams),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    //focus on search bar on rendering
    reference.current.focus();
  }, []);

  const handleSubmit = (e) => {
    //preventing refresh page
    e.preventDefault();

    //putting value from
    setText(reference.current.value);
    setPage(1);
  };

  useEffect(() => {
    setSearchParams({ ...searchParams, page, search: text });
    window.scrollTo(0, 0);
  }, [page, text]);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Row className="align-items-center">
          <Col>
            <Form.Control
              ref={reference}
              type="text"
              placeholder="Search for movie"
              aria-label="Search movie"
            />
          </Col>

          <Col xs="auto" className="me-3">
            <Button
              variant="dark"
              type="submit"
              disabled={isLoading}
              className="me-4"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
            <Button
              variant="danger"
              type="reset"
              onClick={() => {
                setText("");
                setPage(1);
              }}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
      {text && (
        <h2 style={{ marginLeft: "10px", color: "#dee2e6" }}>
          Result for: {text}
        </h2>
      )}
      {data && data.results.length === 0 ? (
        <h1 className="noResult">No results found :(</h1>
      ) : (
        <div>
          <AllMovies
            data={data}
            page={page}
            setPage={setPage}
            isPreviousData={isPreviousData}
          />
        </div>
      )}
    </Container>
  );
};

export default Search;
