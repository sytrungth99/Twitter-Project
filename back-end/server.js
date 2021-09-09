 //dotenv
 require('dotenv').config();
 //connectDB
 const {connectDB} = require('./configs/db');
 connectDB();

 const express = require('express');
 
 const cors = require('cors');
 const app = express();
 
 const authRoute = require('./routes/authRoute');

 const postRoute = require('./routes/postRoute');
 
 //import errorhandler
 const {errorHandler} = require('./middlewares/errorHandler');
 app.use(cors());//Middleware cho phep client giao tiep voi server
 
 app.use(express.json());//Middleware chuyen doi du lieu sang json
 app.use(express.static('models'));

// moute the route
 app.use('/api/v1/auth',authRoute);
 app.use('/api/v1/posts',postRoute);
//unhandler Router
app.all('*',(req,res,next) =>{
    const err = new Error('the rounte can not be found');
    err.statusCode = 404;
    next(err);
})
app.use(errorHandler);
 
 const port = process.env.APP_PORT;
 app.listen(port,() =>{
     console.log(`server is running on port: ${port}`);
 })