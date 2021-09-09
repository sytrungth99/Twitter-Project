const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) =>{
    const Authorization = req.header('authorization');
    

    if(!Authorization){
        const err = new Error('Unauthorization');
        err.statusCode = 400;
        return next(err);
    }
    // get tocken
    const token = Authorization.replace('Bearer ','');
    console.log('token',token);


    //verify token
    jwt.verify(token,process.env.APP_SECRET,(err,user) =>{
    
    //Assign req gán vào req
    req.user = user;
    console.log('req.user',req.user);
    next();
    });


}