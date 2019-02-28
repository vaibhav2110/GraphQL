const Booking = require('../../models/booking');
const Event = require('../../models/event');
const {
    dateToString
} = require('../../helpers/date');
const { user, singleEvent, transformEvent, transformBooking } = require('./merge');



module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async ({
        eventId
    }) => {
        const event = await Event.findOne({
            _id: eventId
        });
        const booking = new Booking({
            user: '5c75207c46345015f8a1497c',
            event
        });
        const result = await booking.save();
        return transformBooking(result);
    },
    cancelBooking: async ({
        bookingId
    }) => {
        try {
            const booking = await Booking.findById(bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({
                _id: bookingId
            });
            return event;
        } catch (err) {
            throw err;
        }
    }
};
