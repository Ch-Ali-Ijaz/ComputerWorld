import * as inventoryUnitServices from "../services/inventoryUnitServices.js";

export async function getAllUnits(req, res) {
    try {
        const queries = req.query;
        const units = await inventoryUnitServices.getAllUnits(queries);

        if (units.length === 0) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "No units found."
            });

        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Units retrieved Successfully.", units: units
            });
        }

    } catch (error) {
        console.log("Error in getAllUnits controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error getting all units."
        });
    }
};

// -------------------------------------------------------------------------
export async function getUnit(req, res) {
    try {
        const id = req.params.id;
        const unit = await inventoryUnitServices.getUnit(id);

        if (!unit) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "Unit not Found."
            });

        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Unit retrieved Successfully.", unit: unit
            });
        }

    } catch (error) {
        console.log("Error in getUnit controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error getting unit."
        });
    }
};

// -------------------------------------------------------------------------
export async function createUnit(req, res) {
    try {
        const variantId = req.params.id;
        const unitInfo = req.body;
        const newUnits = await inventoryUnitServices.createUnit(variantId, unitInfo);

        if (newUnits.length === 0) {
            return res.status(400).json({
                code: "FAILURE", message: "No units to create."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Unit creation Successfull", unit: newUnits
            });
        }

    } catch (error) {
        console.log("Error in createUnit controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error creating unit/units."
        });
    }
};

// -------------------------------------------------------------------------
export async function updateUnit(req, res) {
    try {
        const id = req.params.id;
        const newInfo = req.body;
        const updatedUnit = await inventoryUnitServices.updateUnit(id, queries, newInfo);

        if (!updatedUnit) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "Unit not found to update."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Unit updated successfully.", updatedUnit: updatedUnit
            });
        }
        }catch (error) {
            console.log("Error in updateUnit: ", error);
            return res.status(500).json({
                code: "ERROR", message: "Error updating a Unit."
            });
        }
    };

    // // -------------------------------------------------------------------------
    export async function deleteUnit(req, res) {
        try {
            const id = req.params.id;
            const deletedUnit = await inventoryUnitServices.deleteUnit(id);

            if (!deleteUnit) {
                return res.status(404).json({
                    code: "NOT_FOUND", message: "Unit not found to delete."
                });
            } else {
                return res.status(404).json({
                    code: "SUCCESS", message: "Unit deletion Successfull.", deletedUnit: deletedUnit
                });
            }

        } catch (error) {
            console.log("Error in deleteUnit controller: ", error);
            return res.status(500).json({
                code: "ERROR", message: "Error during deleting a Unit."
            });
        }
    };