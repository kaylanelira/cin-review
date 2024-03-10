import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from "vitest";
import Carousel from './topDisciplinesCarousel';

describe('Carousel component', () => {
    test('renders with initial state', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({ 
            ok: true,
            json: () => Promise.resolve(['ESS']),
        }).mockResolvedValueOnce({ 
            ok: true,
            json: () => Promise.resolve({ code: 'ESS', name: 'Engenharia de Software e Sistemas' }),
        }); 

        render(<Router><Carousel /></Router>);
        
        await waitFor(() => {
            expect(screen.getByText(/Em Alta/i)).toBeInTheDocument();
            expect(screen.getByText(/Engenharia de Software e Sistemas/i)).toBeInTheDocument();
            //verificar filtro null
            expect(screen.queryByText(/NAO/i)).toBeNull(); 
            expect(screen.queryByText(/EXISTE/i)).toBeNull(); 
        });
    });

    test('renders nothing when no disciplines are fetched', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([]),
        });
        
        render(<Router><Carousel /></Router>);
        
        expect(screen.queryByText('Em Alta')).toBeNull();
    });
});
