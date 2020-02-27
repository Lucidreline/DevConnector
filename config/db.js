const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async ()=>{
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDb Connected!')
    }catch(err){
        //We want to exit the program
        process.exit(1)
    }
}

module.exports = connectDB;
