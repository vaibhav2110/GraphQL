const Event = require('../../models/event');
const { user, transformEvent } = require('./merge');
const {
    dateToString
} = require('../../helpers/date');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        };
    },
    createEvent: async ({
        eventInput
    }) => {
        /*const event = {
            ...eventInput,
            price: +eventInput.price,
            _id: Math.random().toString()
        }*/
        try {
            const event = new Event({
                ...eventInput,
                price: +eventInput.price,
                date: dateToString(eventInput.date),
                creator: '5c75207c46345015f8a1497c'
            });
            let createdEvent;

            const res = await event.save();
            createdEvent = transformEvent(res);
            const creator = await User.findById('5c75207c46345015f8a1497c')
            if (!user) {
                throw new Error('User not found');
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        };
    }
};
