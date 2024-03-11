import { render, screen, fireEvent } from '@testing-library/react';
import EditReviewCard from './EditReviewCard';

describe('EditReviewCard component', () => {
  it('renders input fields and buttons', () => {
    render(<EditReviewCard course="exampleCourse" onCancel={() => {}} />);
    
    // Check if input fields and buttons are rendered
    expect(screen.getByLabelText('Nota:')).toBeInTheDocument();
    expect(screen.getByLabelText('Comentário:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Atualizar' })).toBeInTheDocument();
  });

});
