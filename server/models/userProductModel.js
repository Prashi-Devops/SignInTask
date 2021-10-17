const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
     type: String,
     required: true,
     trim: true
    },
    color: {
     type: String,
     enum: ['black','white','red'],
     required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    username1:{
        type: String,
        ref : 'User'

    }
   });

const Cars = mongoose.model('car', ProductSchema);
module.exports = Cars; 
//
