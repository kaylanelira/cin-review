import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardTopDiscipline from './cardTopDiscipline';

describe('CardTopDiscipline component', () => {
  test('renders with initial state', () => {
    const disciplineCode = 'ESS';
    const disciplineName = 'Engenharia de Software e Sistemas';
    render(<Router><CardTopDiscipline disciplineCode={disciplineCode} disciplineName={disciplineName} /></Router>);
    
    //Verificar texto
    const disciplineElement = screen.getByText(disciplineName);
    expect(disciplineElement).toBeInTheDocument();
    //Verificar link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/discipline/${disciplineCode}`);
    expect(linkElement).toHaveStyle({ textDecoration: 'none' });
  });
});