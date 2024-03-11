import { render, screen, fireEvent } from '@testing-library/react';
import MyReviewCard from './MyReviewCard';

describe('MyReviewCard component', () => {

  it('renders the card', () => {
    render(<MyReviewCard course="exampleCourse"/>);

    expect(screen.getByText('Meu Review')).toBeInTheDocument();

  });

  it('renders "No review" message when no reviews are available', () => {
    render(<MyReviewCard course="exampleCourse" />);

    expect(screen.getByText('Nenhum review cadastrado pelo usuário.')).toBeInTheDocument();
  });

});