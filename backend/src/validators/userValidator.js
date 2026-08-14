
export function roleValidator(role) {

    const allowedRoles = ["employee", "customer"];
    if (!allowedRoles.includes(role)) {
        throw new Error("Role is not allowed.");
    }
    else {
        return;
    }
};

export function cnicValidator(cnic) {

    if(!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
        throw new Error("Invalid CNIC format.");
    }
    else {
        return;
    }
};

export function phoneValidator(phoneNo) {

    if(!/^\d{11}$/.test(phoneNo)){
        throw new Error("Invalid phone number format.");
    }
    else{
        return;
    }
};