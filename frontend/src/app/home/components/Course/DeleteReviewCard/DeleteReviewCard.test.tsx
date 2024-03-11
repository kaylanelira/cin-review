import { render, screen } from '@testing-library/react';
import DeleteReviewCard from './DeleteReviewCard';

describe('DeleteReviewCard component', () => {
  it('renders confirmation message and buttons', () => {
    render(<DeleteReviewCard course="exampleCourse" onCancel={() => {}} />);
    
    // Check if confirmation message and buttons are rendered
    expect(screen.getByText('Tem certeza que deseja deletar este review?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Não' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sim' })).toBeInTheDocument();
  });
});
