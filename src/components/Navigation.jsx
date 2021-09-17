import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    //using ReactBootstrap elements
    <Navbar
      collapseOnSelect
      className="nav"
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
    >
      {/* inline react styling in Container element */}
      <Container style={{ maxWidth: "1200px" }}>
        <Link to="/" className="navbar-brand">
          <span className="brand" role="img">
            TF
          </span>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to={"/topRated"} as={Link} className="ms-4" eventKey="1">
              <span>Top Rated</span>
            </Nav.Link>
            <Nav.Link to={"/genre"} as={Link} className="ms-4" eventKey="2">
              <span>Genre</span>
            </Nav.Link>
            <Nav.Link to={"/search"} as={Link} className="ms-4" eventKey="3">
              <span>Search</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
