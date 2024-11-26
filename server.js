const app = require("./app");
const mongoose = require('mongoose');

process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("uncaughtException Shutting down application");
    process.exit(1);
});

// require('dotenv/config');
require('dotenv').config();

const DB = process.env.DB_CONNECTION.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
    .connect( DB, { 
        // useMongoClient: true, 
        // useFindAndModify: false, 
        // useNewUrlParser: true, 
    })
    .then((con) => {
        // console.log(con.connection),
        console.log('DB Connected Successfully');
    })
    .catch((err) => console.log('DB Connection ERROR'))

const port = process.env.PORT || 3500; 

app.listen(port, () => {
    console.log(`App running on port ${port}....`);
});

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("unhandledRejection Shutting down application");
    server.close(() => {
        process.exit(1);
    });
    
});

