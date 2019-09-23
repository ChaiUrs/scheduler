import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRM";
	const EDIT = "EDIT";
	const ERROR_DELETE = "ERROR_DELETE";
	const ERROR_SAVE = "ERROR_SAVE";

	// Tracks initial mode, submits SHOW or EMPTY based on (interview === null)?
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	// Creates an interview object
	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING);
		props
			.bookInterview(props.id, interview)
			.then(() => transition(SHOW))
			.catch(error => {
				transition(ERROR_SAVE, true);
			});
		return interview;
	}

	// Deletes an interview object
	function destroy() {
		transition(DELETING, true);
		props
			.cancelInterview(props.id)
			.then(() => transition(EMPTY))
			.catch(error => {
				transition(ERROR_DELETE, true);
			});
	}

	// Outputs a single Appointment
	return (
		<article className="appointment" data-testid="appointment">
			<Header time={props.time} />

			{(mode === EMPTY || mode === SHOW) && props.interview && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}

			{(mode === EMPTY || mode === SHOW) && !props.interview && (
				<Empty onAdd={() => transition(CREATE)} />
			)}

			{mode === CREATE && (
				<Form interviewers={props.interviewers} onSave={save} onCancel={back} />
			)}

			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interviewer={props.interview.interviewer.id}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={back}
				/>
			)}

			{mode === CONFIRM && (
				<Confirm
					message="ARE YOU SURE YOU WANT TO DELETE THE APPOINTMENT?"
					onCancel={() => transition(SHOW)}
					onConfirm={destroy}
				/>
			)}

			{mode === SAVING && <Status message="Saving" />}

			{mode === DELETING && <Status message="Deleting" />}

			{mode === ERROR_SAVE && (
				<Error message="COULD NOT BOOK THE APPOINTMENT." onClose={back} />
			)}

			{mode === ERROR_DELETE && (
				<Error message="COULD NOT CANCEL THE APPOINTMENT." onClose={back} />
			)}
		</article>
	);
}
