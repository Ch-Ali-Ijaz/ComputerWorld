import * as discountServices from "./discountServices.js"

export async function updateWorkflow(objectId, data) {
    let updatedDocument;
    switch (data.operation) {

        case "toggleActive":
            updatedDocument = await discountServices.toggleActiveField(objectId);
            break;
        case "updateDocument":
            updatedDocument = await discountServices.updateDiscount(objectId, data);
            break;
        default:
            throw new Error("Invalid operation.");

    }

    return updatedDocument;
};