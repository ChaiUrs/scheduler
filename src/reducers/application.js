function reducer(state, action) {
	switch (action.type) {
		case "SET_DAY":
			return { ...state, day: action.day };
		case "SET_APPLICATION_DATA":
			return {
				...state,
				days: action.days,
				appointments: action.appointments,
				interviewers: action.interviewers
			};
		case "SET_INTERVIEW": {
			const newAppointment = state["appointments"];
			const newDays = state.days.map(item => {
				if (item.appointments.includes(action.id)) {
					let newSpots = item.spots;
					if (!state.appointments[action.id].interview && action.interview) {
						newSpots--;
					} else if (
						state.appointments[action.id].interview &&
						!action.interview
					) {
						newSpots++;
					}
					return {
						...item,
						spots: newSpots
					};
				}
				return item;
			});
			newAppointment[action.id]["interview"] = action.interview;
			return { ...state, appointments: newAppointment, days: newDays };
		}
		default:
			throw new Error(`tried to reduce with unsupported action type`);
	}
}

export default function constants() {
	return {
		reducer
	};
}
