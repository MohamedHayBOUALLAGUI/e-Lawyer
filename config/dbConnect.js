const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false,
        });
        console.log("database is successfully Connected ");
    } catch (error) {
        console.error("database is not connected");
    }
};
module.exports = dbConnect;