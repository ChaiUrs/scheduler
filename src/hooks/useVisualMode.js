import { useState } from "react";

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	function transition(newMode, replace = false) {
		if (replace) {
			const newHist = history.slice(0, history.length - 1);
			setHistory([...newHist, newMode]);
		} else {
			setHistory([...history, newMode]);
		}
		setMode(newMode);
	}

	function back() {
		const newHist = history.slice(0, history.length - 1);
		const prevMode = history.slice(history.length - 2)[0];
		setHistory(newHist);
		setMode(prevMode);
	}

	return { mode, transition, back };
}
