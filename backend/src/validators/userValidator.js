
export function roleValidator(role) {

    const allowedRoles = ["employee", "customer"];
    if (!allowedRoles.includes(role)) {
        return false;
    }
    else {
        return true;
    }
};