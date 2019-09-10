import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
	switch (action.type) {
		case SET_DAY:
			return { ...state, day: action.day };
		case SET_APPLICATION_DATA:
			return {
				...state,
				appointments: action.appointments,
				days: action.days,
				interviewers: action.interviewers
			};
		case SET_INTERVIEW: {
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
			throw new Error(
				`Tried to reduce with unsupported action type: ${action.type}`
			);
	}
}

export default function useApplicationData(props) {
	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {}
	});

	const setDay = day => dispatch({ type: SET_DAY, day });

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers")
		])
			.then(all => {
				dispatch({
					type: SET_APPLICATION_DATA,
					days: all[0].data,
					appointments: all[1].data,
					interviewers: all[2].data
				});
			})
			.catch(error => console.log(error));
	}, []);

	function bookInterview(id, interview) {
		return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
			dispatch({ type: SET_INTERVIEW, id, interview });
		});
	}

	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`).then(() => {
			dispatch({ type: SET_INTERVIEW, id, interview: null });
		});
	}

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview
	};
}
