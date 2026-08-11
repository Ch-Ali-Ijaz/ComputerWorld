

export function authorizeToLogin (...roles) {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({msg: "Access Denied!"});
        }

        next();
    }
};

export function authorizeToChangePassword (verification) {
    return (req, res, next) => {
        if(verification !== req.user.verification   ){
            return res.status(403).json({msg: "Access Denied!"});
        }

        next();
    }
};