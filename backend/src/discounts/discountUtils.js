import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("123456789", 4);

export function setDiscountId (targetType){
    let prefix;
    
    switch(targetType){
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
export function setDiscountCode (discountName){
    return discountName + nanoid();
};