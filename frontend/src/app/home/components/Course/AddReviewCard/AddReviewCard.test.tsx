import { render, screen } from '@testing-library/react';
import AddReviewCard from './AddReviewCard';

describe('AddReviewCard component', () => {
  it('renders input fields and buttons', () => {
    render(<AddReviewCard course="exampleCourse" onCancel={() => {}} />);
    
    // Check if input fields and buttons are rendered
    expect(screen.getByLabelText('Nota:')).toBeInTheDocument();
    expect(screen.getByLabelText('Comentário:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });
});
