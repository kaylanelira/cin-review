import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from "vitest";
import Filter from './semesterFilter';

describe('Filter component', () => {
  test('renders with initial state', () => {
    const mockHandleSelectChange = vi.fn();
    render(<Filter onSelectChange={mockHandleSelectChange} />);
    
    const filterElement = screen.getByRole('combobox');
    expect(filterElement).toBeInTheDocument();
    expect(filterElement).toHaveLength(11);
    expect(filterElement[0]).toHaveTextContent('Filtre por semestre...');
    for (let i = 1; i <= 10; i++) {
      expect(filterElement[i]).toHaveTextContent(`${i}° Semestre`);
    }
  });

  test('option selected', () => {
    const mockHandleSelectChange = vi.fn();
    render(<Filter onSelectChange={mockHandleSelectChange} />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: '3' } });
    expect(mockHandleSelectChange).toHaveBeenCalledWith('3');
    expect(selectElement.value).toBe('3');
    
    fireEvent.change(selectElement, { target: { value: '7' } });
    expect(mockHandleSelectChange).toHaveBeenCalledWith('7');
    expect(selectElement.value).toBe('7');
  });
});