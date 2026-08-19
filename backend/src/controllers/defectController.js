import * as defectServices from "../services/defectServices.js";

export async function getAllDefects(req, res) {
    try {
        const queries = req.query;
        const defects = await defectServices.getAllDefects(queries);

        if(defects.length === 0) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "No defects found."
            });
        }else {
            return res.status(200).json({
                code: "SUCCESS", message: "Defects retrieved Successfully.", defects: defects
            });
        }
    }catch(error) {
        console.log("Error in getAllDefect controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error retrieving Defect"
        });
    }
};

// ------------------------------------------------------------------------------------------------------------
export async function getDefect(req, res) {
    try {
        const id = req.params.id;
        const defect = await defectServices.getDefect(id);

        if(!defect) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "Defect not Found"
            });
        }else {
            return res.status(200).json({
                code: "SUCCESS", message: "Defect retrieved Successfully.", defect: defect
            });
        }
    }catch(error) {
        console.log("Error in getDefect controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error retrieving Defect"
        });
    }
};

// // ------------------------------------------------------------------------------------------------------------
export async function createDefect(req, res) {
    try {
        const userId = req.user.userId;
        const unitId = req.params.id;
        const defectInfo = req.body;
        const createdDefect = await defectServices.createDefect(userId, unitId, defectInfo);

        if(!createdDefect) {
            return res.status(400).json({
                code: "FAILURE", message: "Defect creation Failure"
            });
        }else {
            return res.status(200).json({
                code: "SUCCESS", message: "Defect creation Successfull.", createdDefect: createdDefect
            });
        }
    }catch(error) {
        console.log("Error in createDefect controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error creating Defect"
        });
    }
};

// // ------------------------------------------------------------------------------------------------------------
export async function updateDefect(req, res) {
    try {
        const userId = req.user.userId;
        const id = req.params.id;
        const newInfo = req.body;
        const updatedDefect = await defectServices.updateDefect(id, userId, newInfo);

        if(!updatedDefect) {
            return res.status(400).json({
                code: "NOT_FOUND", message: "Defect not found."
            });
        }else {
            return res.status(200).json({
                code: "SUCCESS", message: "Defect updated Successfully.", updatedDefect: updatedDefect
            });
        }
    }catch(error) {
        console.log("Error in updateDefect controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error updating Defect"
        });
    }
};

// ------------------------------------------------------------------------------------------------------------
export async function deleteDefect(req, res) {
    try {
        const id = req.params.id;
        const deletedDefect = await defectServices.deleteDefect(id);

        if(!deletedDefect) {
            return res.status(400).json({
                code: "NOT_FOUND", message: "Defect not found."
            });
        }else {
            return res.status(200).json({
                code: "SUCCESS", message: "Defect deleted Successfully.", deletedDefect: deletedDefect
            });
        }
    }catch(error) {
        console.log("Error in deleteDefect controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error deleting Defect."
        });
    }
};