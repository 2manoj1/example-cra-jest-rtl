import React from "react";
import { render } from "@testing-library/react";
import ErrorModal from "./ErrorModal";
import userEvent from "@testing-library/user-event";

describe("ErrorModal Component", () => {
	it("renders with title and message", () => {
		const title = "Error Title";
		const message = "Error Message";
		const { getByText } = render(
			<ErrorModal title={title} message={message} />
		);

		expect(getByText(title)).toBeInTheDocument();
		expect(getByText(message)).toBeInTheDocument();
	});

	it("renders without message", () => {
		const title = "Error Title";
		const { queryByText } = render(<ErrorModal title={title} />);

		expect(queryByText(title)).toBeInTheDocument();
		expect(queryByText("Error Message")).not.toBeInTheDocument();
	});

	it("calls onConfirm callback when confirm button is clicked", () => {
		const title = "Error Title";
		const onConfirm = jest.fn();
		const { getByText } = render(
			<ErrorModal title={title} onConfirm={onConfirm} />
		);

		userEvent.click(getByText("確認"));
		expect(onConfirm).toHaveBeenCalled();
	});
});
