import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPersons } from "../services/BetsMoviesAPI";
import { useHistory } from "react-router";
import styles from "./css/PersonList.module.css";

const PersonsList = () => {
  //getting url id with help of useParams for sending to getPersons function for fetching data with that id
  const { id } = useParams();
  const history = useHistory();
  const { data } = useQuery(["persons", id], () => getPersons(id));

  if (!data) return null;

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <h1>Cast:</h1>
      <div className={styles.container}>
        {data &&
          data.cast.map((actors, i) => (
            <div className={styles.person} key={i}>
              <img
                onClick={() => history.push(`/person/${actors.id}`)}
                src={`https://image.tmdb.org/t/p/w500/${actors.profile_path}`}
                alt="Actor"
              />
              <p>{actors.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PersonsList;
