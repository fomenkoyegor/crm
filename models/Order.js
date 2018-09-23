const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const order = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            quontity: {
                type: Number, require: true
            },
            cost: {
                type: Number
            }
        }
    ],
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});


module.exports = mongoose.model('orders', order);