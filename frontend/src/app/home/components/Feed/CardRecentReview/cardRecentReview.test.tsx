import { render, screen } from '@testing-library/react';
import CardRecentReview from './cardRecentReview';

describe('CardRecentReview component', () => {
  test('renders with initial state', () => {
    const course = 'Engenharia de Software e Sistemas';
    const review = 'Boa cadeira, trabalhosa!';
    const student = 'cbv2';
    render(<CardRecentReview course={course} review={review} student={student} />);

    //Verificar texto
    const courseElement = screen.getByText(course);
    const reviewElement = screen.getByText(review);
    const studentElement = screen.getByText(student);
    expect(courseElement).toBeInTheDocument();
    expect(reviewElement).toBeInTheDocument();
    expect(studentElement).toBeInTheDocument();
  });
});