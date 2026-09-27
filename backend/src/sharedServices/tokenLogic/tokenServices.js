import jwt from "jsonwebtoken";

export function generateLoginToken(user){
    return jwt.sign(
        {userId: user._id, role: user.userRole},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
};

export function generateOtpToken(email, status){
    return jwt.sign(
        {userEmail: email, verification: status},
        process.env.JWT_SECRET,
        {expiresIn: '10m'}
    );
};