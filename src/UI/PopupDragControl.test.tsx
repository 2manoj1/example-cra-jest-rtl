import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PopupDragControl from "./PopupDragControl";

describe("PopupDragControl Component", () => {
	it("renders children", () => {
		const { getByText } = render(
			<PopupDragControl>
				<div>Test Children</div>
			</PopupDragControl>
		);

		expect(getByText("Test Children")).toBeInTheDocument();
	});

	it("allows dragging the popup", () => {
		const { getByText } = render(
			<PopupDragControl>
				<div>Test Children</div>
			</PopupDragControl>
		);

		const modal = getByText("Test Children").closest(".modal") as HTMLElement;

		fireEvent.mouseDown(modal);
		fireEvent.mouseMove(window);
		fireEvent.mouseUp(window);

		// Assert that the modal has moved significantly after dragging
		expect(modal.style.top).not.toBe("");
		expect(modal.style.left).not.toBe("");
	});
});
