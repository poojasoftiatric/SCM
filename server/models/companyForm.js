const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const companyFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    mobileNumber: String,
    gstinNumber: {
        type: String,
        required: true,
    },
    panNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    logo: String,
    website: String,

    warehouses: [{
        code: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        keeper: {
            type: String,
            ref: 'Staff'
        },
    }],
}, {
    timestamps: true,
});

// Add auto-increment plugin to the schema
companyFormSchema.plugin(AutoIncrement, { inc_field: 'companyFormId' });

const CompanyForm = mongoose.model('CompanyForm', companyFormSchema);

module.exports = CompanyForm;
