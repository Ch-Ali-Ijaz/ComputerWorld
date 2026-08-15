import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890ABCDEF", 8);

export function setInventoryUnitId(quantity){
    let count;
    let Id = [];

    for(count = 0; count < quantity; count++){
        Id[count] = "IU" + nanoid();
    }

    return Id;
};

export function setFilterObject(queries) {
    const filter = {};

    if (queries.id) {
        filter.productId = queries.id;
    }
    if (queries.defectId) {
        filter["productDefect.defectId"] = queries.defectId;
    }
    if (defectType) {
        filter["productDefect.defectType"] = defectType;
    }
    if (name) {
        filter.productName = {
            $regex: name,
            $options: "i"
        };
    }
    if (series) {
        filter.productSeries = {
            $regex: series,
            $options: "i"
        };
    }
    if (display) {
        filter["productSpecs.display"] = display;
    }
    if (ram) {
        filter["productSpecs.RAM"] = Number(ram);
    }
    if (processor) {
        filter["productSpecs.processor"] = processor;
    }
    if (graphicCard) {
        filter["productSpecs.graphicCard"] = graphicCard;
    }
    if (memory) {
        filter["productSpecs.memory"] = memory;
    }
    if (status) {
        filter.productStatus = status;
    }
    if (minPrice || maxPrice) {
        filter.productPrice = {};

        if (minPrice) {
            filter.productPrice.$gte = Number(minPrice);
        }
        if (maxPrice) {
            filter.productPrice.$lte = Number(maxPrice);
        }
    }

    return filter;
};