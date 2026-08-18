import Dealer from "../models/Dealer.js";
import { setDealerId, setFilterObject } from "../utils/dealerUtils.js";

export async function getAllDealers(queries) {
    try {
        const filter = setFilterObject(queries);
        return await Dealer.find(filter);

    } catch (error) {
        console.log("Error in getAllDealers service: ", error);
        throw new Error(error);
    }
};

// -----------------------------------------------------------------------
export async function getDealer(id) {
    try {
        return await Dealer.findById(id);

    } catch (error) {
        console.log("Error in getDealer service: ", error);
        throw new Error(error);
    }
};

// -----------------------------------------------------------------------
export async function createDealer(dealerInfo) {
    try {
        const dealerId = setDealerId(dealerInfo.name);

        const newDealer = new Dealer({
            dealerId: dealerId,
            name: dealerInfo.name,
            contact: dealerInfo.contact,
            address: dealerInfo.address

        });
        return await newDealer.save();


    } catch (error) {
        console.log("Error in createDealer service: ", error);
        throw new Error(error);
    }
};

// -----------------------------------------------------------------------
export async function updateDealer(id, newInfo) {
    try {
        const updatedDealer = {
            dealerId: newInfo.dealerId,
            name: newInfo.name,
            contact: newInfo.contact,
            address: newInfo.address
        };
        return await Dealer.findByIdAndUpdate(id, updatedDealer, { returnDocument: "After" });

    } catch (error) {
        console.log("Error in updateDealer service: ", error);
        throw new Error(error);
    }
};

// -----------------------------------------------------------------------
export async function deleteDealer(id) {
    try {
        return await Dealer.findByIdAndDelete(id);

    } catch (error) {
        console.log("Error in createDealer service: ", error);
        throw new Error(error);
    }
};