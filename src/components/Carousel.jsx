import Slider from "react-slick";
import { Link } from "react-router-dom";
import styles from "./css/Carousel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//getting data as prop from parent element
const Carousel = ({ data }) => {
  //settings for react-slick-carousel
  var settings = {
    draggable: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    speed: 2000,
    autoplaySpeed: 8000,
    autoplay: true,
    infinite: true,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          arrows: false,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: false,
          autoplaySpeed: 7000,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          autoplaySpeed: 7000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplaySpeed: 5000,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {data &&
          data.map((movie, i) => (
            <div className={styles.movieContainer} key={i}>
              <Link
                to={`/movie/${movie.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="Cover"
                />
                <p className="title" style={{ marginLeft: "5px" }}>
                  {i + 1}. {movie.title}
                </p>
              </Link>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Carousel;
