import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardDiscipline from './cardDiscipline';

describe('CardDiscipline component', () => {
  test('renders with initial state with added discipline', () => {
    const disciplineCode = 'ESS';
    const disciplineName = 'Engenharia de Software e Sistemas';  
    const semester = 6;
    const added = true;
    render(<Router><CardDiscipline disciplineCode={disciplineCode} disciplineName={disciplineName} semester={semester} added={added} /></Router>);
    
    //Verificar texto
    const disciplineElement = screen.getByText(disciplineName);
    const semesterElement = screen.getByText(semester);
    const minusIconElement = screen.getByAltText('Disciplina Adicionada');
    expect(disciplineElement).toBeInTheDocument();
    expect(semesterElement).toBeInTheDocument();
    expect(minusIconElement).toBeInTheDocument();
    
    //Verificar link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/discipline/${disciplineCode}`);  
    expect(linkElement).toHaveStyle({ textDecoration: 'none' });
  });

  test('renders with initial state with not added discipline', () => {
    const disciplineCode = 'ESS';
    const disciplineName = 'Engenharia de Software e Sistemas';  
    const semester = 6;
    const added = false;

    render(<Router><CardDiscipline disciplineCode={disciplineCode} disciplineName={disciplineName} semester={semester} added={added} /></Router>);
    
    //Verificar texto
    const disciplineElement = screen.getByText(disciplineName);
    const semesterElement = screen.getByText(semester);
    const minusIconElement = screen.getByAltText('Disciplina Não Adicionada');
    expect(disciplineElement).toBeInTheDocument();
    expect(semesterElement).toBeInTheDocument();
    expect(minusIconElement).toBeInTheDocument();
    
    //Verificar link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/discipline/${disciplineCode}`);  
    expect(linkElement).toHaveStyle({ textDecoration: 'none' });
  });
});