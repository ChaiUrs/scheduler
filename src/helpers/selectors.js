export function getAppointmentsForDay(state, day) {
	const appointmentsThisDay = state.days.find(weekday => weekday.name === day);
	if (appointmentsThisDay === undefined) {
		return [];
	}
	const appointmentsData = [];
	appointmentsThisDay.appointments.forEach(appointmentID => {
		state.appointments[appointmentID] &&
			appointmentsData.push(state.appointments[appointmentID]);
	});
	return appointmentsData;
}

export function getInterview(state, interview) {
	if (interview === null) {
		return null;
	}
	const interviewData = {};
	interviewData.student = interview.student;
	interviewData.interviewer = state.interviewers[interview.interviewer];
	return interviewData;
}

export function getInterviewersForDay(state, day) {
	const interviewersThisDay = state.days.find(weekday => weekday.name === day);
	if (interviewersThisDay === undefined) {
		return [];
	}
	const interviewersData = [];
	interviewersThisDay.interviewers.forEach(interviewerID => {
		state.interviewers[interviewerID] &&
			interviewersData.push(state.interviewers[interviewerID]);
	});
	return interviewersData;
}
