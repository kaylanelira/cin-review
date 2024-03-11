import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ShowLabelValue from "../../../shared/components/ShowLabelValue";

describe('ShowLabelValue component', () => {
  it('renders label and value', () => {
    // Defina os valores de exemplo para o teste
    const label = 'Name';
    const value = 'John Doe';

    // Renderize o componente com os valores
    const { getByText } = render(<ShowLabelValue label={label} value={value} />);

    // Verifique se o texto do label e do valor está presente
    expect(getByText(`${label}:`)).toBeTruthy();
    expect(getByText(value)).toBeTruthy();
  });
});
