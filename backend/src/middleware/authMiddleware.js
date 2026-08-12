import jwt from "jsonwebtoken";

export function authenticate (req, res, next) {
    try {
        const token = req.cookies.accessToken;

        if(!token){
            return res.status(401).json({msg: "No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        console.log("Error in authenticate middleware: ", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};