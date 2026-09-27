import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("123456789", 4);

export function setDefectId(){
    return "DEF" + `-` + nanoid();
};

export function setFilterObject(queries) {
    const filter = {};

    if(Object.keys(queries).length === 0){
        return filter;
    }

    if(queries.creatorId){
        filter.creator_Id = queries.creatorId;
    }
    if(queries.updatorId){
        filter.updator_Id = queries.updatorId;
    }
    if(queries.unitId){
        filter.unit_Id = queries.unitId;
    }
    if(queries.defectId){
        filter.defectId = queries.defectId;
    }
    if(queries.description){
        filter.description = {
            $regex: queries.description,
            $options: "i"
        };
    }
    return filter;
}