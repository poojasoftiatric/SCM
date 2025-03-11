const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const staffFormSchema = new mongoose.Schema({
    designation: {
        type: String,
        unique: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    }
});

staffFormSchema.plugin(AutoIncrement, { inc_field: 'staffFormId' });

const StaffForm = mongoose.model('StaffForm', staffFormSchema);

module.exports = StaffForm;