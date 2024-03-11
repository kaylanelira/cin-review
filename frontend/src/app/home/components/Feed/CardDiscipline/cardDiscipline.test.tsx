import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardCourse from './cardDiscipline';

describe('CardCourse component', () => {
  test('renders with initial state with added course', () => {
    const courseCode = 'ESS';
    const courseName = 'Engenharia de Software e Sistemas';  
    const semester = 6;
    const added = true;
    render(<Router><CardCourse courseCode={courseCode} courseName={courseName} semester={semester} added={added} /></Router>);
    
    //Verificar texto
    const courseElement = screen.getByText(courseName);
    const semesterElement = screen.getByText(semester);
    const minusIconElement = screen.getByAltText('Disciplina Adicionada');
    expect(courseElement).toBeInTheDocument();
    expect(semesterElement).toBeInTheDocument();
    expect(minusIconElement).toBeInTheDocument();
    
    //Verificar link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/course/${courseCode}`);  
    expect(linkElement).toHaveStyle({ textDecoration: 'none' });
  });

  test('renders with initial state with not added course', () => {
    const courseCode = 'ESS';
    const courseName = 'Engenharia de Software e Sistemas';  
    const semester = 6;
    const added = false;

    render(<Router><CardCourse courseCode={courseCode} courseName={courseName} semester={semester} added={added} /></Router>);
    
    //Verificar texto
    const courseElement = screen.getByText(courseName);
    const semesterElement = screen.getByText(semester);
    const minusIconElement = screen.getByAltText('Disciplina Não Adicionada');
    expect(courseElement).toBeInTheDocument();
    expect(semesterElement).toBeInTheDocument();
    expect(minusIconElement).toBeInTheDocument();
    
    //Verificar link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/course/${courseCode}`);  
    expect(linkElement).toHaveStyle({ textDecoration: 'none' });
  });
});