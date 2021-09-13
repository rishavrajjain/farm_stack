const mongoose = require('mongoose');


const resourceSchema = new mongoose.Schema({

    owner:{
        type:String
    },
    title:{
        type:String
    },
    content:{
        type:String
    },
    status:{
        type:String
    }
},{
    timestamps:true
})

const Resource = new mongoose.model('Resource',resourceSchema);
module.exports = Resource;