import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './navbar';

describe('Navbar component', () => {
  test('renders navbar with initial state', () => {
    render(<Router><Navbar/></Router>);

    //Verificar texto
    const cinReviewsText = screen.getByText('Cin Reviews');
    expect(cinReviewsText).toBeInTheDocument();
    //Verificar link
    const cinReviewsLink = cinReviewsText.closest('a');
    expect(cinReviewsLink).toHaveAttribute('href', `/feed`);
    expect(cinReviewsLink).toHaveStyle({ textDecoration: 'none' });
    
    //Verificar texto
    const bibliotecaText = screen.getByText('Biblioteca');
    expect(bibliotecaText).toBeInTheDocument();
    //Verificar link
    const bibliotecaLink = bibliotecaText.closest('a');
    expect(bibliotecaLink).toHaveAttribute('href', `/feed`);

    //Verificar texto
    const profileText = screen.getByText('Perfil');
    expect(profileText).toBeInTheDocument();
    //Verificar link
    const profileLink = profileText.closest('a');
    expect(profileLink).toHaveAttribute('href', `/profile`);

    expect(screen.getByPlaceholderText('Pesquise por cadeira')).toBeInTheDocument();
    expect(screen.getByAltText('Lupa de pesquisa')).toBeInTheDocument();
  });

  test('searching with button', () => {
    delete window.location;
    window.location = { href: '' };

    render(<Router><Navbar /></Router>);

    const searchInput = screen.getByPlaceholderText('Pesquise por cadeira');
    const searchButton = screen.getByAltText('Lupa de pesquisa');
    fireEvent.change(searchInput, { target: { value: 'Engenharia de Software e Sistemas' } });
    fireEvent.click(searchButton);
    expect(searchInput.value).toBe('Engenharia de Software e Sistemas');
    expect(window.location.href).toBe('/search/Engenharia de Software e Sistemas');
  });

  test('searching with button if searchQuery is empty', () => {
    delete window.location;
    window.location = { href: '' };

    render(<Router><Navbar /></Router>);

    const searchInput = screen.getByPlaceholderText('Pesquise por cadeira');
    const searchButton = screen.getByAltText('Lupa de pesquisa');
    fireEvent.click(searchButton);
    expect(searchInput.value).toBe('');
    expect(window.location.href).toBe('');
  });

  test('searching with key press', () => {
    delete window.location;
    window.location = { href: '' };

    render(<Router><Navbar /></Router>);

    const searchInput = screen.getByPlaceholderText('Pesquise por cadeira');
    fireEvent.change(searchInput, { target: { value: 'Engenharia de Software e Sistemas' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    expect(searchInput.value).toBe('Engenharia de Software e Sistemas');
    expect(window.location.href).toBe('/search/Engenharia de Software e Sistemas');
  });

  test('searching with key press if searchQuery is empty', () => {
    delete window.location;
    window.location = { href: '' };

    render(<Router><Navbar /></Router>);

    const searchInput = screen.getByPlaceholderText('Pesquise por cadeira');
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    expect(searchInput.value).toBe('');
    expect(window.location.href).toBe('');
  });
});
