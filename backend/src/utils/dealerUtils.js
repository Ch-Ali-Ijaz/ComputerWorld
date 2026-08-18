import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("123456789", 3);

export function setDealerId (name){
    const prefix = name.slice(0,3).toUpperCase();;
    return "DLR" + `-` + prefix + nanoid();
};

export function setFilterObject(queries){
    const filter = {};

    if(Object.keys(queries).length === 0){
        return filter;
    }

    if(queries.dealerId){
        filter.dealerId = queries.dealerId;
    }
    if(queries.name){
        filter.name = {
            $regex: "^" + queries.name + "$",
            $options: "i"
        };
    }
    if(queries.contact){
        filter.contact = queries.contact;
    }
    if(queries.address){
        filter.address = queries.address;
    }
    return filter;
};