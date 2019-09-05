import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
	const noSpot = props.spots === 0 ? "no spots remaining" : null;
	const oneSpot = props.spots === 1 ? "1 spot remaining" : null;
	const fewSpots = props.spots ? `${props.spots} spots remaining` : null;

	const dayClass = classnames("day-list__item", {
		"day-list__item": true,
		"day-list__item--selected": props.selected,
		"day-list__item--full": props.spots === 0
	});

	return (
		<li className={dayClass} onClick={() => props.setDay(props.name)}>
			<h1>{props.name}</h1>
			<h2>{noSpot || oneSpot || fewSpots}</h2>
		</li>
	);
}
