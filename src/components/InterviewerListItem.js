import React from "react";
import classnames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
	const listItemClass = classnames("li", {
		interviewers__item: true,
		"interviewers__item--selected": props.selected === true
	});

	return (
		<li className={listItemClass} onClick={props.setInterviewer}>
			<img
				className="interviewers__item-image"
				src={props.avatar}
				alt={props.name}
			/>
			{props.selected ? props.name : ""}
		</li>
	);
}
