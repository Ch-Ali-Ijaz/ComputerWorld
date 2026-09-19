import { getProductIds } from "../services/productServices.js";
import { getVariantIds } from "../services/variantServices.js";
import { getUnitIds } from "../services/inventoryUnitServices.js";
import { getUserIds } from "../services/userServices.js";

export async function resolveTargetIds(targetType, targetCriteria) {
    let targetIds;
    switch (targetType) {
        case "All":
            targetIds = [];
            break;
        case "Product":
            targetIds = await getProductIds(targetCriteria);
            break;
        case "Variant":
            targetIds = await getVariantIds(targetCriteria);
            break;
        case "InventoryUnit":
            targetIds = await getUnitIds(targetCriteria);
            break;
        default:
            throw new Error(`Target type ${targetType}`);
            // throw new Error("Invalid targetType.");
    }

    return targetIds;

};

// ---------------------------------------------------------------------
export async function resolveUserIds(applicableTo, userCriteria) {
    let userIds;
    switch (applicableTo) {
        case "All":
            userIds = [];
            break;
        case "SpecificUsers":
            userIds = await getUserIds(userCriteria);
            break;
        default:
            throw new Error("Invalid applicableTo");
    }

    return userIds;
};