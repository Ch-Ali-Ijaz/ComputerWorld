import { isDiscountQueryValid } from "./discountValidators.js";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("123456789", 4);

export function setDiscountId(targetType) {
    let prefix;

    switch (targetType) {
        case "All":
            prefix = "ALL";
            break
        case "Product":
            prefix = "PRD";
            break;
        case "Variant":
            prefix = "VRT";
            break;
        case "InventoryUnit":
            prefix = "UNT";
            break;
        case "Dealer":
            prefix = "DLR";
            break;
            default:
                throw new Error("Invalid targetType.");
            }

    return prefix + "-" + nanoid();
};

// ------------------------------------------------------------
export function setDiscountCode(discountName) {
    return discountName + nanoid();
};

// ------------------------------------------------------------
export function setDiscountFilter(queries) {
    const filter = {};
    if (Object.keys(queries).length === 0) {
        return filter;
    }

    isDiscountQueryValid(queries);
    if (queries.objectId) {
        filter._id = queries.objectId;
    }
    if (queries.discountId) {
        filter.discountId = queries.discountId;
    }
    if (queries.discountCode) {
        filter.discountCode = queries.discountCode;
    }
    if (queries.name) {
        filter.name = {
            $regex: queries.name,
            $options: "i"
        };
    }
    if (queries.description) {
        filter.description = {
            $regex: queries.description,
            $options: "i"
        };
    }
    if (queries.targetType) {
        filter.targetType = {
            $regex: queries.targetType,
            $options: "i"
        };
    }
    if (queries.targetId) {
        filter.targetIds = queries.targetId;
    }
    if (queries.applicableTo) {
        filter.applicableTo = queries.applicableTo;
    }
    if (queries.userId) {
        filter.userIds = queries.userId;
    }
    if (queries.discountType) {
        filter.discountType = queries.discountType;
    }
    if (queries.value) {
        filter.value = queries.value;
    }
    if (queries.discountSD) {
        filter.startDate = {
            $gte: new Date(queries.discountSD)
        }
    }
    if (queries.discountED) {
        filter.endDate = {
            $lte: new Date(queries.discountED)
        }
    }
    if (queries.maxQuantity) {
        filter.maxQuantity = queries.maxQuantity;
    }
    if (queries.isActive) {
        filter.isActive = queries.isActive;
    }

    return filter;
};