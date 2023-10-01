import React, { useEffect, useState } from "react";
import { convertDisplay } from "../../core/constants";

const EventList = ({ list, selected, onClick }) => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    let ll = [...list];
    ll.reverse();
    setEventList(ll);
  }, [list]);
  return (
    <div className="event-list">
      {eventList.map((element, index) => {
        return (
          <div
            onClick={() => onClick(eventList.length - 1 - index)}
            key={index}
            className={`event-list-item ${
              eventList.length - 1 - index == selected ? "select" : ""
            }`}
          >
            {`#${eventList.length - index} ${
              convertDisplay[element] !== undefined
                ? convertDisplay[element]
                : element
            }`}
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
