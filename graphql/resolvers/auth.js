const bcrypt = require('bcryptjs');
const User = require('../../models/user');

module.exports = {
    createUser: async ({
        userInput
    }) => {
        try {
            const existingUser = await User.findOne({
                email: userInput.email
            })
            if (existingUser) {
                throw new Error('User exists already.')
            }
            const hashedPassword = await bcrypt.hash(userInput.password, 12)
            const user = new User({
                email: userInput.email,
                password: hashedPassword
            });
            const result = await user.save()
            return {
                ...result._doc,
                password: null,
                _id: result.id
            };
        } catch (err) {
            throw err;
        };
    }
};