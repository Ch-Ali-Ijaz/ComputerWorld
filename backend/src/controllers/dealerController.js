import * as dealerServices from "../services/dealerServices.js";

export async function getAllDealers(req, res) {
    try {
        const queries = req.query;
        const dealers = await dealerServices.getAllDealers(queries);

        if (dealers.length === 0) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "No dealers found."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Dealers retrieved Successfully.", dealers: dealers
            });
        }

    } catch (error) {
        console.log("Error in getAllDealers controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error getting dealers."
        });
    }
};

// -----------------------------------------------------------------------
export async function getDealer(req, res) {
    try {
        const id = req.params.id;
        const dealer = await dealerServices.getDealer(id);

        if (!dealer) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "Dealer not found"
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Dealer retrieved Successfully.", dealer: dealer
            });
        }

    } catch (error) {
        console.log("Error in getDealer controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error getting a dealer."
        });
    }
};

// -----------------------------------------------------------------------
export async function createDealer(req, res) {
    try {
        const dealerInfo = req.body;
        const createdDealer = await dealerServices.createDealer(dealerInfo);

        if (!createdDealer) {
            return res.status(400).json({
                code: "FAILURE", message: "Failed to create a dealer."
            });

        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Dealer created Successfully.", createDealer: createDealer
            });

        }


    } catch (error) {
        console.log("Error in createDealer controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error creating a dealer."
        });
    }
};

// -----------------------------------------------------------------------
export async function updateDealer(req, res) {
    try {
        const id = req.params.id;
        const newInfo = req.body;
        const updatedDealer = await dealerServices.updateDealer(id, newInfo);

        if (!updatedDealer) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "Dealer not found."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Dealer updated Successfully.", updatedDealer: updatedDealer
            });
        }

    } catch (error) {
        console.log("Error in updateDealer controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error updating dealer."
        });
    }
};

// -----------------------------------------------------------------------
export async function deleteDealer(req, res) {
    try {
        const id = req.params.id;
        const deletedDealer = await dealerServices.deleteDealer(id);

        if (!deletedDealer) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "Dealer not found."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Dealer deleted Successfully.", deletedDealer: deletedDealer
            });
        }

    } catch (error) {
        console.log("Error in createDealer controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error deleting a dealer."
        });
    }
};