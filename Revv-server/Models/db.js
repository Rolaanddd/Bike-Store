const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL;    

mongoose.connect(mongo_url)
.then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log("error connecting to database", err);
});