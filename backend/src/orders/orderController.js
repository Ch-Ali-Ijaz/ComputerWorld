import * as orderWorkflow from "./orderWorkflow.js";

export async function getOrders(req, res) {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: "FAILURE", message: "Internal Server Error."
        });
    }
};

export async function placeOrder(req, res) {
    try {
        const user = req.user;
        const orderInfo = req.body;

        const order = await orderWorkflow.placeOrder(user, orderInfo);

        return res.status(200).json({
            code: "SUCCESS", message: "Order Placed Successfully.", order: order
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: "FAILURE", message: "Internal Server Error."
        });
    }
};

export async function updateOrder(req, res) {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: "FAILURE", message: "Internal Server Error."
        });
    }
};

export async function deleteOrder(req, res) {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: "FAILURE", message: "Internal Server Error."
        });
    }
};
