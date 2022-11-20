var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(process.env.SQL_DATABASE || './image.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Getting error " + err);
        return (1);
    } else {
        if (process.env.NODE_ENV === "development") {
            console.log('access to database enabled. ', process.env.SQL_DATABASE || './image.db')
        }

    }

});

module.exports = { db }