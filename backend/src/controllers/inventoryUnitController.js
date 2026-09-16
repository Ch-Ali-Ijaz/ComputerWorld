import * as inventoryUnitServices from "../services/inventoryUnitServices.js";

export async function getUnits(req, res) {
    try {
        const queries = req.query;
        const units = await inventoryUnitServices.getUnits(queries);

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
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// -------------------------------------------------------------------------
export async function createUnit(req, res) {
    try {
        const unitInfo = req.body;

        const newUnits = await inventoryUnitServices.createUnit(unitInfo.quantity, unitInfo);

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
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// -------------------------------------------------------------------------
export async function updateUnit(req, res) {
    try {
        const userRole = req.user.userRole;
        const queries = req.query;
        const newInfo = req.body;
        const numOfUpdatedUnits = await inventoryUnitServices.updateUnits(userRole, queries, newInfo);

        if (numOfUpdatedUnits.matchedCount === 0) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "Unit(s) not found."
            });
        }
        else if (numOfUpdatedUnits.modifiedCount === 0) {
            return res.status(404).json({
                code: "UPTODATE", message: "Unit(s) are already up to date."
            });
        }
        else {
            return res.status(200).json({
                code: "SUCCESS", message: "Number of Modified Units: " + numOfUpdatedUnits.modifiedCount
            });
        }
    } catch (error) {
        console.log("Error in updateUnit: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// -------------------------------------------------------------------------
export async function sellUnits(req, res) {
    try {
        const items = req.body.items;
        const numOfSoldUnits = await inventoryUnitServices.sellUnits(items);

        if (numOfSoldUnits.matchedCount === 0) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "Units not found to sell."
            });
        }
        else {
            return res.status(200).json({
                code: "SUCCESS", message: "Number of units sold successfully: " + numOfSoldUnits.modifiedCount
            });
        }

    } catch (error) {
        console.log("Error in sellUnits controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// -------------------------------------------------------------------------
export async function deleteUnit(req, res) {
    try {
        const queries = req.query;
        const numOfDeletedUnits = await inventoryUnitServices.deleteUnits(queries);

        if (numOfDeletedUnits.deletedCount === 0) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "Unit not found to delete."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Number of successfull deletions: " + numOfDeletedUnits.deletedCount
            });
        }

    } catch (error) {
        console.log("Error in deleteUnit controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};