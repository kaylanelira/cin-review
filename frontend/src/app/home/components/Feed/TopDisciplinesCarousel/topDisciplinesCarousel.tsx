import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardTopDiscipline from '../CardTopDiscipline/cardTopDiscipline'; 
import styles from "./topDisciplinesCarousel.module.css";


const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings} className={styles.carousel}>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 1" />
      </Link>
      </div>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 2" />
      </Link>
      </div>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 3" />
      </Link>
      </div>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 4" />
      </Link>
      </div>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 5" />
      </Link>
      </div>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 6" />
      </Link>
      </div>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 7" />
      </Link>
      </div>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 8" />
      </Link>
      </div>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 9" />
      </Link>
      </div>
      <div>
      <Link to="/pagina-turma-1" style={{ textDecoration: 'none' }}>
      <CardTopDiscipline discipline="Turma 10" />
      </Link>
      </div>
    </Slider>
  );
};

export default Carousel;