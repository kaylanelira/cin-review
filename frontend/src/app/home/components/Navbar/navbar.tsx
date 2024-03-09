import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './navbar.module.css';
import search_icon from '../../assets/search-icon.svg';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      window.location.href = `/search/${searchQuery}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
  <nav className={styles.navbar}>
    <div className={styles.navbarLeft}>
      <Link to="/feed" style={{ textDecoration: 'none', color: "var(--white)"}}>
        <span className={styles.brand}>Cin Reviews</span>
      </Link>
    </div>
    <div className={styles.navbarCenter}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Pesquise por cadeira" 
        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress}/>
        <Link to="/search" className={styles.searchButton} onClick={handleSearch}>
        <img className={styles.searchIcon} src={search_icon} alt="Lupa de pesquisa" />
        </Link>
      </div>
    </div>
    <div className={styles.navbarRight}>
      <div className={styles.anim}>
        <Link to="/tests" className={styles.tab}>Biblioteca</Link>
      </div>
      <div className={styles.anim}>
        <Link to="/profile" className={styles.tab}>Perfil</Link>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;