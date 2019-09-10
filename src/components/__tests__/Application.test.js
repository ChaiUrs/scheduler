import React from "react";
import axios from "axios";
import Application from "components/Application";
import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	getAllByTestId,
	getByPlaceholderText,
	getByAltText,
	queryByText,
	queryByAltText
} from "@testing-library/react";

afterEach(cleanup);

describe("Appointment", () => {
	it("TEST 1: defaults to Monday and changes the schedule when a new day is selected (promise)", () => {
		const { getByText } = render(<Application />);
		return waitForElement(() => getByText("Monday")).then(() => {
			fireEvent.click(getByText("Tuesday"));
			expect(getByText("Leopold Silvers")).toBeInTheDocument();
		});
	});

	it("TEST 2: changes the schedule when a new day is selected ES2017 (await)", async () => {
		const { getByText } = render(<Application />);
		await waitForElement(() => getByText("Monday"));
		fireEvent.click(getByText("Tuesday"));
		expect(getByText("Leopold Silvers")).toBeInTheDocument();
	});

	it("TEST 3: loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		//console.log(prettyDOM(container));
		const appointments = getAllByTestId(container, "appointment");
		//console.log(prettyDOM(appointments));
		const appointment = appointments[0];
		//console.log(prettyDOM(appointment));
		fireEvent.click(getByAltText(appointment, "Add"));
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" }
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "Saving")).toBeInTheDocument();
		await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);
		expect(getByText(day, "no spots remaining")).toBeInTheDocument();
	});

	it("TEST 4: loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
		// 1. Render the Application.
		const { container } = render(<Application />);
		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, "Archie Cohen"));
		// 3. Click the "Delete" button on the booked appointment.
		const appointment = getAllByTestId(container, "appointment").find(
			appointment => queryByText(appointment, "Archie Cohen")
		);
		fireEvent.click(queryByAltText(appointment, "Delete"));
		// 4. Check that the confirmation message is shown.
		expect(
			getByText(appointment, "ARE YOU SURE YOU WANT TO DELETE THE APPOINTMENT?")
		).toBeInTheDocument();
		// 5. Click the "Confirm" button on the confirmation.
		fireEvent.click(getByText(appointment, "Confirm"));
		// 6. Check that the element with the text "Deleting" is displayed.
		expect(getByText(appointment, "Deleting")).toBeInTheDocument();
		// 7. Wait until the element with the "Add" button is displayed.
		await waitForElement(() => getByAltText(appointment, "Add"));
		// 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);
		expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
	});

	it("TEST 5: loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
		const appointment = getAllByTestId(container, "appointment").find(
			appointment => queryByText(appointment, "Lydia Miller-Jones")
		);
		fireEvent.click(queryByAltText(appointment, "Edit"));
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Archie Cohen" }
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "Saving")).toBeInTheDocument();
		await waitForElement(() => getByText(appointment, "Archie Cohen"));
		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);
		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});

	it("TEST 6: shows the save error when failing to save an appointment", async () => {
		axios.put.mockRejectedValueOnce();
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		//const appointments = getAllByTestId(container, "appointment");
		const appointments = getAllByTestId(container, "appointment");
		const appointment = appointments[0];
		fireEvent.click(getByAltText(appointment, "Edit"));
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" }
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "Saving")).toBeInTheDocument();
		await waitForElement(() =>
			getByText(appointment, "COULD NOT BOOK THE APPOINTMENT.")
		);
		expect(
			getByText(appointment, "COULD NOT BOOK THE APPOINTMENT.")
		).toBeInTheDocument();
	});

	it("TEST 7: shows the delete error when failing to delete an existing appointment", async () => {
		axios.delete.mockRejectedValueOnce();
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment").find(
			appointment => queryByText(appointment, "Archie Cohen")
		);
		fireEvent.click(queryByAltText(appointment, "Delete"));
		expect(
			getByText(appointment, "ARE YOU SURE YOU WANT TO DELETE THE APPOINTMENT?")
		).toBeInTheDocument();
		fireEvent.click(getByText(appointment, "Confirm"));
		expect(getByText(appointment, "Deleting")).toBeInTheDocument();
		await waitForElement(() =>
			getByText(appointment, "COULD NOT CANCEL THE APPOINTMENT.")
		);
		expect(
			getByText(appointment, "COULD NOT CANCEL THE APPOINTMENT.")
		).toBeInTheDocument();
	});
});
