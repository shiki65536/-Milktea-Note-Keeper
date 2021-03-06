const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongooseURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);

        console.log(('Mongodb Connected'));
    } catch (err) {
        console.log(err.message);
        //Exit process
        process.exit(1);
    }
}

module.exports = connectDB