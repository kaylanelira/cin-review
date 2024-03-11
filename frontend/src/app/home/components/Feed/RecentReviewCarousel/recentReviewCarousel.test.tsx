import { render, screen, waitFor } from '@testing-library/react';
import { vi } from "vitest";
import Carousel from './recentReviewCarousel';

describe('Carousel component', () => {
  test('renders reviews with initial state', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ 
        ok: true,
        json: () => Promise.resolve([{ course: 'ESS', comment: 'Great review', username: 'user1' }]),
      })
      .mockResolvedValueOnce({ 
        ok: true,
        json: () => Promise.resolve(['Engenharia de Software e Sistemas']),
      });

    render(<Carousel />);
    
    await waitFor(() => {
      expect(screen.getByText('Great review')).toBeInTheDocument();
      expect(screen.getByText('user1')).toBeInTheDocument();
    });
  });
});
