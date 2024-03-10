import { render, screen } from '@testing-library/react';
import CardRecentReview from './cardRecentReview';

describe('CardRecentReview component', () => {
  test('renders with initial state', () => {
    const discipline = 'Engenharia de Software e Sistemas';
    const review = 'Boa cadeira, trabalhosa!';
    const student = 'cbv2';
    render(<CardRecentReview discipline={discipline} review={review} student={student} />);

    //Verificar texto
    const disciplineElement = screen.getByText(discipline);
    const reviewElement = screen.getByText(review);
    const studentElement = screen.getByText(student);
    expect(disciplineElement).toBeInTheDocument();
    expect(reviewElement).toBeInTheDocument();
    expect(studentElement).toBeInTheDocument();
  });
});