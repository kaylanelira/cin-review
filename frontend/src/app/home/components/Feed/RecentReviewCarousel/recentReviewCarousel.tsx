import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./recentReviewCarousel.module.css";
import CardRecentReview from '../CardRecentReview/cardRecentReview'; 

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: window.innerWidth < 900 ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings} className={styles.carousel}>
      <div>
      <CardRecentReview discipline="Turma 1" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
      <div>
      <CardRecentReview discipline="Turma 2" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
      <div>
      <CardRecentReview discipline="Turma 3" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
      <div>
      <CardRecentReview discipline="Turma 4" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
      <div>
      <CardRecentReview discipline="Turma 5" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
      <div>
      <CardRecentReview discipline="Turma 6" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
      <div>
      <CardRecentReview discipline="Turma 7" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
      <div>
      <CardRecentReview discipline="Turma 8" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
      <div>
      <CardRecentReview discipline="Turma 9" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
      <div>
      <CardRecentReview discipline="Turma 10" review="Comentário sobre a turma" student="Nome do Aluno" />
      </div>
    </Slider>
  );
};

export default Carousel;