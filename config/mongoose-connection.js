const mongoose = require('mongoose');
const config = require('config');

const dbgr = require('debug')('developement:mongoose');
mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(() => {
    dbgr("connection sucessfull");
})
.catch((err)=>{
    dbgr(err);
})
module.exports = mongoose.connection;