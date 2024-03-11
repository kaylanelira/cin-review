import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditLabelValue from "../../../shared/components/EditLabelValue";

describe("EditLabelValue component", () => {
  it("renders label and input", () => {
    const { getByText, getByDisplayValue } = render(
      <EditLabelValue
        label="Name"
        propertyName="name"
        editedUser={{ name: "Não informado" }}
        setEditedUser={() => {}}
      />
    );

    expect(getByText("Name:")).toBeTruthy();
    expect(getByDisplayValue("Não informado")).toBeTruthy();
  });

  it("updates editedUser state on input change", () => {
    const setEditedUserMock = vi.fn();
    const { getByDisplayValue } = render(
      <EditLabelValue
        label="Name"
        propertyName="name"
        editedUser={{ name: "Não informado" }}
        setEditedUser={setEditedUserMock}
      />
    );

    fireEvent.change(getByDisplayValue("Não informado"), {
      target: { value: "New Name" },
    });

    expect(setEditedUserMock).toHaveBeenCalledWith({ name: "New Name" });
  });

  it("toggles password visibility if type is password", () => {
    const { getByDisplayValue } = render(
      <EditLabelValue
        label="Password"
        type="password"
        propertyName="password"
        editedUser={{ password: "securePassword" }}
        setEditedUser={() => {}}
      />
    );

    const inputElement = getByDisplayValue("Não informado");

    expect(inputElement.getAttribute("type")).toBe("password");
  });
});
