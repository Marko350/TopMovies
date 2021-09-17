import { Button, Container } from "react-bootstrap";

const Pagination = ({ data, isPreviousData, whichPage, setPage }) => {
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
            if (!isPreviousData && data.total_pages) {
              //adding 1 to the currentvalue of page
              setPage((currentPage) => currentPage + 1);
            }
          }}
          //if both options are false button will be disabled
          //isPreviousData is element from useQuery passed with props
          disabled={isPreviousData || !data?.total_pages}
        >
          Next Page
        </Button>
      </div>
    </Container>
  );
};

export default Pagination;
