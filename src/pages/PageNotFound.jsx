import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const PageNotFound = () => {
    return ( <div style={{display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center", marginTop: "10rem"}}>
        <h1>Oops! There is nothing on this page</h1>
        <Link to="/">
            <Button variant="dark">Go back to Start Page</Button>
        </Link>
    </div> );
}
 
export default PageNotFound;