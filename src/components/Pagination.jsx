import { Button, Container } from "react-bootstrap";

const Pagination = ({ data, isPreviousData, whichPage, setPage }) => {
  console.log(whichPage);
  console.log(data);
  return (
    <Container>
      <div className="pagination d-flex justify-content-between align-items-center mt-5 pb-5 text-white">
        <Button
          variant="dark"
          //with Math.max calculating and returning the bigger number
          onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
          disabled={whichPage === 1}
        >
          Previous Page
        </Button>

        <span style={{ color: "white", fontWeight: "700", fontSize: "1.2rem" }}>
          Page: {whichPage}
        </span>

        <Button
          variant="dark"
          onClick={() => {
            //isPreviousData is element from useQuery passed with props
            if (!isPreviousData) {
              //adding 1 to the currentvalue of page
              setPage((currentPage) => currentPage + 1);
            }
          }}
          //if total_pages is the same number withe the current page, button will be disabled
          disabled={data?.total_pages === whichPage}
        >
          Next Page
        </Button>
      </div>
    </Container>
  );
};

export default Pagination;
