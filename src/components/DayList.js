
import React from "react";

import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  
const dayList = props.days.map(eachDay => (
<DayListItem
key={eachDay.id}
name={eachDay.name}
spots={eachDay.spots}
selected={eachDay.name === props.day}
setDay={props.setDay}
/>
));
return <ul>{dayList}</ul>;
}
