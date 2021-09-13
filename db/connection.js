const mongoose=require('mongoose')
require('dotenv').config()
//connection to the database

mongoose.connect(`mongodb+srv://abhay:${process.env.DB_PASSWORD}@cluster0.h7ryz.mongodb.net/db?retryWrites=true&w=majority`,{
    
    
    useNewUrlParser:true,
})

console.log('connected');

