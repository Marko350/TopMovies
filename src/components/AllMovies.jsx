import { Row, Card, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

//getting data, page , setPage, isPreviosData as props from parent element
const AllMovies = ({ data, page, setPage, isPreviousData }) => {
  return (
    <div>
      <Container className="mt-5">
        <Row fluid="md" xs={2} sm={3} md={4} lg={5} className="g-4 ">
          {data &&
            data.results.map((movie, i) => (
              //loop over every component in data.result with help of method map
              <Col key={i}>
                <Card
                  style={{
                    border: "none",
                    background: "#dee2e6",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{ color: "black", paddingBottom: "5px" }}
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
        //passing props to Pagination component
        whichPage={page}
        setPage={setPage}
        data={data}
        isPreviousData={isPreviousData}
      />
    </div>
  );
};

export default AllMovies;
