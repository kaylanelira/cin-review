import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "../../../shared/components/Input/input";

describe("Input component", () => {
  it("renders the input", () => {
    const { getByPlaceholderText } = render(<Input text="Enter text" />);
    
    expect(getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders the input with the given value", () => {
    const { getByPlaceholderText } = render(<Input text="Enter text" value="Test Value" />);
    
    expect(getByPlaceholderText("Enter text")).toHaveValue("Test Value");
  });

  it("changes value on input change", () => {
    const setInfo = vi.fn();
    const { getByPlaceholderText } = render(<Input text="Enter text" setInfo={setInfo} />);
    
    fireEvent.change(getByPlaceholderText("Enter text"), { target: { value: "New Value" } });
    
    expect(setInfo).toHaveBeenCalledWith("New Value");
  });

  it("toggles password visibility", () => {
    const { getByPlaceholderText, rerender } = render(<Input text="Password" isPasswordVisible={false} type="password" />);
    
    expect(getByPlaceholderText("Password")).toHaveAttribute("type", "password");
    
    rerender(<Input text="Password" isPasswordVisible={true} type="password" />);
    
    expect(getByPlaceholderText("Password")).toHaveAttribute("type", "text");
  });
});
