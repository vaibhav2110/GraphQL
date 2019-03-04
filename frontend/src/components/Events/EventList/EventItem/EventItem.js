import React from "react";
import "./EventItem.css";

const eventItem = ({ eventId, title, userId, creatorId, price, date, onDetail }) => {
  return (
    <li key={eventId} className="events__list-item">
      <div>
        <h1>{title}</h1>
        <h2>
          ${price} - {new Date(date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {userId === creatorId ? (
          <p>You are the owner</p>
        ) : (
          <button className="btn" onClick={onDetail.bind(this, eventId)}>View Details</button>
        )}
      </div>
    </li>
  );
};

export default eventItem;
