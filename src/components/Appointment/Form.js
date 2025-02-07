import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
	const [name, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState("");

	const { onSave, onCancel } = props;

	function reset() {
		setName("");
		setInterviewer(null);
	}

	function validate() {
		if (name === "") {
			setError("Student name cannot be blank");
			return;
		}
		if (interviewer === null) {
			setError("Please select an interviewer");
			return;
		}
		setError("");
		onSave(name, interviewer, props.isEdit ? true : false);
	}

	function cancel() {
		reset();
		onCancel();
	}

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={event => event.preventDefault()}>
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						value={name}
						onChange={event => {
							setName(event.target.value);
						}}
						data-testid="student-name-input"
					/>
					<section className="appointment__validation">{error}</section>
					<InterviewerList
						interviewers={props.interviewers}
						value={interviewer}
						onChange={setInterviewer}
					/>
				</form>
			</section>

			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
