import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { ParamEditor } from "./ParamEditor";

const mockParams = [
  { id: 1, name: "Назначение", type: "string" as const },
  { id: 2, name: "Длина", type: "string" as const },
];

const mockModel = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

describe("ParamEditor Component", () => {
  it("должен корректно инициализироваться из модели", () => {
    render(<ParamEditor params={mockParams} model={mockModel} />);

    // Проверяем, что инпуты содержат начальные значения
    expect(screen.getByDisplayValue("повседневное")).toBeDefined();
    expect(screen.getByDisplayValue("макси")).toBeDefined();
  });

  it("должен обновлять состояние при вводе текста", () => {
    render(<ParamEditor params={mockParams} model={mockModel} />);

    const input = screen.getByDisplayValue("повседневное") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "праздничное" } });

    expect(input.value).toBe("праздничное");
  });

  it("метод getModel должен возвращать актуальные данные", async () => {
    const ref = React.createRef<ParamEditor>();
    render(<ParamEditor ref={ref} params={mockParams} model={mockModel} />);

    const input = screen.getByDisplayValue("макси") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "мини" } });

    // Даем React возможность завершить цикл обновления состояния
    await new Promise((resolve) => setTimeout(resolve, 0));

    const resultModel = ref.current?.getModel();
    const updatedValue = resultModel?.paramValues.find((p) => p.paramId === 2);

    expect(updatedValue?.value).toBe("мини");
  });
});
