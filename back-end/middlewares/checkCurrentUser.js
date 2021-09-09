const jwt = require('jsonwebtoken');

exports.checkCurrentUser = (req,res,next) =>{

    const Authorization = req.header("authorization");
    console.log('authorization',Authorization);
    if(!Authorization) {
        req.user = null;
        next();

    }else{
        const token = Authorization.replace("Bearer ","");
        console.log('token',token)
        try{
            const {userId} = jwt.verify(token,process.env.APP_SECRET);
            req.user = {userId};
            next();
        }catch(err){
            req.user = null;
            next();
        }
    }
}
