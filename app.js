require("./config/familyDB")
const express = require( 'express' );
const studentRouter=require('./routes/familyRouter')

const app = express();
app.use( express.json() );
app.use('/uploads',express.static("uploads"));
app.use('/api',studentRouter)

module.exports=app;