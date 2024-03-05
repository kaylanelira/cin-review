import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './navbar.module.css';
import search_icon from '../../assets/search-icon.svg';

const Navbar: React.FC = () => {
  return (
  <nav className={styles.navbar}>
    <div className={styles.navbarLeft}>
      <span className={styles.brand}>Cin Reviews</span>
    </div>
    <div className={styles.navbarCenter}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Pesquise por cadeira" />
        <Link to="/tests" className={styles.searchButton}>
        <img className={styles.searchIcon} src={search_icon} alt="Lupa de pesquisa" />
        </Link>
      </div>
    </div>
    <div className={styles.navbarRight}>
      <div className={styles.anim}>
        <Link to="/tests" className={styles.tab}>Biblioteca</Link>
      </div>
      <div className={styles.anim}>
        <Link to="/tests" className={styles.tab}>Perfil</Link>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;