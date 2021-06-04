const mongoose = require('mongoose');



const schema = () => ({

    "Title": {
        type: String,
        required: true,
    },
    "Year": {
        type: Number,
        required: true,
    },
    "Genre": {
        type: Array,
        required: true,
    },
    "Director": {
        type: String,
        required: true,
    },
    
    "Plot": {
        type: String,
        required: true,
    },
    "Language": {
        type: Array,
        required: true,
    },
    "Country": {
        type: String,
        required: true,
    },
    "createAt" : {
        type: Date,
        default : new Date()
    }
})


const filmeSchema = new mongoose.Schema(schema())


module.exports =[schema(), mongoose.model('filme', filmeSchema) ]