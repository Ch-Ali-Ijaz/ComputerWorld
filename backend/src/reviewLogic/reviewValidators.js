
export function isOperationAllowed(userId, reviewedBy) {
    if(userId.toString() !== reviewedBy.toString()){
        throw new Error("Forbiden operation.");
    }
}