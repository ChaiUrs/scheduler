import { useReducer, useEffect } from "react";
import axios from "axios";
import constants from "reducers/application";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData(props) {
	const { reducer } = constants();
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
		const url = `/api/appointments/${id}`;
		const data = { interview };
		return axios.put(url, data).then(() => {
			dispatch({ type: SET_INTERVIEW, id, interview });
		});
	}

	function cancelInterview(id) {
		const url = `/api/appointments/${id}`;
		const data = null;
		return axios.delete(url, data).then(() => {
			dispatch({ type: SET_INTERVIEW, id, interview: data });
		});
	}

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview
	};
}
