import styles from "./index.module.css";
import Navbar from '../../components/Navbar/navbar'; 
import CardDiscipline from '../../components/Feed/CardDiscipline/cardDiscipline'; 
import RecentReviewCarousel from '../../components/Feed/RecentReviewCarousel/recentReviewCarousel'; 
import TopDisciplinesCarousel from '../../components/Feed/TopDisciplinesCarousel/topDisciplinesCarousel'; 
import SemesterFilter from '../../components/Feed/SemesterFilter/semesterFilter'

const Feed = () => {

  return (
    <div>
      <section className={styles.container}>
      <Navbar />
      <div className={styles.carousel}>
        <RecentReviewCarousel />
      </div>
      <h2 className={styles.heading}>Em Alta</h2>
      <div className={styles.carousel}>
        <TopDisciplinesCarousel />
      </div>
      <h2 className={styles.heading}>Cadeiras</h2>
      <div className={styles.disciplines}>
        <SemesterFilter />
        <CardDiscipline discipline="Turma 1" semester="1° Período" added={true}/>
      </div>
      </section>
    </div>
  );
};

export default Feed;