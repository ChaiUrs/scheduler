import { useState } from "react";

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	function transition(mode, replace = false) {
		if (replace) {
			history.pop();
			setHistory(history);
			setMode(mode);
			setHistory(prev => [...prev, mode]);
		} else {
			setMode(mode);
			setHistory(prev => [...prev, mode]);
		}
	}

	function back() {
		if (history.length > 1) {
			history.pop();
			setHistory(history);
			setMode(history.slice(-1)[0]);
		} else {
			setMode(history[0]);
		}
	}

	return { mode, transition, back };
}
