const gym = require('../../modals/gym');
const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    try{
        const token = req.cookies.cookietoken;
        if(!token){
            return res.status(401).json({error:'no token provided'});
        }
        const decode = jwt.verify(token,process.env.jwtsecretkey);
        req.gym = await gym.findById(decode.isexistid).select('-password');
    }catch(err){
        res.status(401).json({error:'token not valid'});
    }
    next();
};

module.exports = auth;