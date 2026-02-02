import jwt from 'jsonwebtoken'
export function verifyToken(req,res,next){
    //token verification logic
    //1.get token from req(using cookie-parser)
    let signedToken=req.cookies.token;
    if(!signedToken){
        return res.status(401).json({message:"please login first"})
    }
    //2.verify token(decode)
    let decodedToken= jwt.verify(signedToken,'secret')
    console.log("decode token:",decodedToken)
    next()
}