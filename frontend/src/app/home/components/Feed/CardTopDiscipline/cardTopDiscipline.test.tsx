import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardTopCourse from './cardTopDiscipline';

describe('CardTopCourse component', () => {
  test('renders with initial state', () => {
    const courseCode = 'ESS';
    const courseName = 'Engenharia de Software e Sistemas';
    render(<Router><CardTopCourse courseCode={courseCode} courseName={courseName} /></Router>);
    
    //Verificar texto
    const courseElement = screen.getByText(courseName);
    expect(courseElement).toBeInTheDocument();
    //Verificar link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/course/${courseCode}`);
    expect(linkElement).toHaveStyle({ textDecoration: 'none' });
  });
});