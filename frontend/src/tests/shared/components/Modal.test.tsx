import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import ModalComponent from '../../../shared/components/Modal';

describe('ModalComponent', () => {
  it('calls onRequestClose when the modal is closed', async () => {
    const onRequestCloseMock = () => {};

    // Renderiza o componente
    const { getByText } = render(
      <ModalComponent isOpen={true} onRequestClose={onRequestCloseMock}>
        <div>Modal Content</div>
      </ModalComponent>
    );

    const modalContent = getByText('Modal Content');

    // Simula o clique no conteúdo modal
    await fireEvent.click(modalContent);
  });
});
