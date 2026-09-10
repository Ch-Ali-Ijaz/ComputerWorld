import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 6);

export function setVariantId(ram, memory) {
    const id = "VAR" + `-` + nanoid() + `-` + ram + `-` + memory;
    return id;
};

export function setFilterObject(queries) {
    const filter = {};

    if (Object.keys(queries).length === 0) {
        return filter;
    }

    if (queries.objecId) {
        filter._id = queries.objecId;
    }
    if (queries.productId) {
        filter.product_Id = queries.productId;
    }
    if (queries.variantId) {
        filter.variantId = queries.variantId;
    }
    if (queries.minDisplaySize || queries.maxDisplaySize) {
        filter.displaySize = {};
        if (queries.minDisplaySize) {
            filter.displaySize.$gte = Number(queries.minDisplaySize);
        }
        if (queries.maxDisplaySize) {
            filter.displaySize.$lte = Number(queries.maxDisplaySize);
        }
    }
    if (queries.displayType) {
        filter.displayType = {
            $regex: queries.displayType,
            $option: "i"
        };
    }
    if (queries.minRAM || queries.maxRAM) {
        filter.RAM = {};
        if (queries.minRAM) {
            filter.RAM.$gte = Number(queries.minRAM);
        }
        if (queries.maxRAM) {
            filter.RAM.$lte = Number(queries.maxRAM);
        }
    }
    if (queries.processor) {
        filter.processor = {
            $regex: queries.processor,
            $option: "i"
        };
    }
    if (queries.graphicCardStatus) {
        filter.graphicCardStatus = queries.graphicCardStatus;
    }
    if (queries.minGraphicCardMemory || queries.maxGraphicCardMemory) {
        filter.graphicCardMemory = {};
        if (queries.minGraphicCardMemory) {
            filter.graphicCardMemory.$gte = Number(queries.minGraphicCardMemory);
        }
        if (queries.maxGraphicCardMemory) {
            filter.graphicCardMemory.$lte = Number(queries.maxGraphicCardMemory);
        }
    }
    if (queries.storageType) {
        filter.storageType = {
            $regex: queries.storageType,
            $option: "i"
        };
    }
    if (queries.minQuantity || queries.maxQuantity) {
        filter.availableUnits = {};
        if (queries.minQuantity) {
            filter.availableUnits.$gte = Number(queries.minQuantity);
        }
        if (queries.maxQuantity) {
            filter.availableUnits.$lte = Number(queries.maxQuantity);
        }
    }
    if (queries.minMemory || queries.maxMemory) {
        filter.memory = {};
        if (queries.minMemory) {
            filter.memory.$gte = Number(queries.minMemory);
        }
        if (queries.maxMemory) {
            filter.memory.$lte = Number(queries.maxMemory);
        }
    }
    if (queries.minPrice || queries.maxPrice) {
        filter.sellingPrice = {};
        if (queries.minPrice) {
            filter.sellingPrice.$gte = Number(queries.minPrice);
        }
        if (queries.maxPrice) {
            filter.sellingPrice.$lte = Number(queries.maxPrice);
        }
    }

    return filter;
};