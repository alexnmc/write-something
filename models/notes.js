const mongoose = require("mongoose");  
const Schema = mongoose.Schema;

const notesSchema = new Schema({  
    notes: {
        type: String,
        required:true
    },

    userID:{
        type: String
    },

    toggle: {
        type: String,
        default: 'off' 
    },
   
    date: {
        type: Date,
        required: true
    },

    editTime: {
        type: Date,
        default: null
    }
})
    


module.exports = mongoose.model("Notes", notesSchema); //admin model using the admin schema
