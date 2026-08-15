import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 4);

// ------------------------------------------------------
export function setFilterObject(queries) {
    const filter = {};

    if(Object.keys(queries).length === 0){
        return filter;
    }

    if (queries.id) {
        filter.productId = queries.id;
    }
    if (queries.brand) {
        filter.brand = {
            $regex: queries.brand,
            $options: "i"
        };
    }
    if (queries.series) {
        filter.series = {
            $regex: queries.series,
            $options: "i"
        };
    }
    if(queries.model){
        filter.modelNo = {
            $regex: `^` + queries.model + `$`,
            $options: "i"
        }
    }

    return filter;
};

// ------------------------------------------------------
export function setProductId(brand, series) {
    let prefix;

    switch (brand) {
        case "DELL":
            prefix = "DELL";
            break;
        case "HP":
            prefix = "HP";
            break;
        case "ACER":
            prefix = "ACR";
            break;
        case "MACBOOK":
            prefix = "MB";
            break;
        case "LENOVO":
            prefix = "LEN";
            break;
        case "MSI":
            prefix = "MSI";
            break;
        case "RAZER":
            prefix = "RZR";
            break;
        default:
            throw new Error("Invalid Name provided");
    }
    return prefix + series + nanoid();
};

// // ------------------------------------------------------
// export function setVariantId(name, model, ram, memory) {
//     const id = name + `-` + model + `-` + ram + `-` + memory;
//     return id;
// };

// // ------------------------------------------------------
// export function setDefectId(status, name, series) {

//     if (status !== "Defect") {
//         return undefined;
//     }

//     let prefix;
//     switch (name) {
//         case "DELL":
//             prefix = "DELL";
//             break;
//         case "HP":
//             prefix = "HP";
//             break;
//         case "ACER":
//             prefix = "ACR";
//             break;
//         case "MACBOOK":
//             prefix = "MB";
//             break;
//         case "LENOVO":
//             prefix = "LEN";
//             break;
//         case "MSI":
//             prefix = "MSI";
//             break;
//         case "RAZER":
//             prefix = "RZR";
//             break;
//         default:
//             throw new Error("Invalid Name provided");
//     }
//     return prefix + series + nanoid();
// };

