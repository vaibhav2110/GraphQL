const Event = require('../../models/event');
const User = require('../../models/user');
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
    }, req) => {
        /*const event = {
            ...eventInput,
            price: +eventInput.price,
            _id: Math.random().toString()
        }*/
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        try {
            const event = new Event({
                ...eventInput,
                price: +eventInput.price,
                date: dateToString(eventInput.date),
                creator: req.userId
            });
            let createdEvent;

            const res = await event.save();
            createdEvent = transformEvent(res);
            const creator = await User.findById(req.userId)
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
