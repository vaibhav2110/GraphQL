import React from 'react';
import './EventList.css';
import EventItem from './EventItem/EventItem';

const eventList = props => {
    const events = props.events.map(event => {
        return (
            <EventItem
                userId={props.authUserId}
                key={event._id}
                eventId={event._id}
                title={event.title}
                price={event.price}
                date={event.date}
                creatorId={event.creator._id}
                onDetail={props.onViewDetail}
            />);
    })
    return (
        <ul className="event__list">
            {events}
        </ul>
    );
}

export default eventList;