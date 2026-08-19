import Defect from "../models/Defect.js";
import { setDefectId, setFilterObject } from "../utils/defectUtils.js";

export async function getAllDefects(queries) {
    try {
        const filter = setFilterObject(queries);
        return await Defect.find(filter);

    }catch(error) {
        console.log("Error in getAllDefect service: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------
export async function getDefect(id) {
    try {
        return await Defect.findById(id);

    }catch(error) {
        console.log("Error in getDefect service: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------
export async function createDefect(userId, unitId, defectInfo) {
    try {
        const defectId = setDefectId();
        const newDefect = new Defect({
            creator_Id: userId,
            unit_Id: unitId,
            defectId: defectId,
            status: "Pending",
            description: defectInfo.description
        });
        return await newDefect.save();

    }catch(error) {
        console.log("Error in createDefect service: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------
export async function updateDefect(id, userId, newInfo) {
    try {
        const defect = {
            updator_Id: userId,
            creator_Id: newInfo.creatorId,
            unit_Id: newInfo.unitId,
            defectId: newInfo.defectId,
            description: newInfo.description,
            status: newInfo.status

        }
        return await Defect.findByIdAndUpdate(id, defect, { returnDocument: "after" });

    }catch(error) {
        console.log("Error in updateDefect service: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------
export async function deleteDefect(id) {
    try {
        return await Defect.findByIdAndDelete(id);

    }catch(error) {
        console.log("Error in deleteDefect service: ", error);
        throw new Error(error);
    }
};