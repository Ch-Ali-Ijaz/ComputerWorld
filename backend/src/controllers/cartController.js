import * as cartServices from "../services/cartServices.js";

export async function getCart(req, res) {
    try {
        const userId = req.user.userId;
        const carts = await cartServices.getCart(userId);

        if (carts.length === 0) {
            return res.status(404).json({
                code: "NOT_FOUND", message: "No carts found"
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "retrived carts: ", carts
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
}

// -------------------------------------------------------------------------------------------------
export async function addToCart(req, res) {
    try {
        const userId = req.user.userId;
        const variantId = req.params.variantId;
        const { quantity } = req.body;
        const updatedCart = await cartServices.addToCart(userId, variantId, quantity);

        return res.status(200).json({
            code: "SUCCESS", message: "Item added Successfully.", updatedCart: updatedCart
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// -------------------------------------------------------------------------------------------------
export async function updateItemQuantity(req, res) {
    try {
        const userId = req.user.userId;
        const variantId = req.params.variantId;
        const { quantity } = req.body;
        const updatedCart = await cartServices.updateItemQuantity(userId, variantId, quantity);

        return res.status(200).json({
            code: "SUCCESS", message: "Quantity Updated Successfully.", updatedCart: updatedCart
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// -------------------------------------------------------------------------------------------------
export async function removeFromCart(req, res) {
    try {
        const userId = req.user.userId;
        const variantId = req.params.variantId;
        const updatedCart = await cartServices.removeFromCart(userId, variantId);

        return res.status(200).json({
            code: "SUCCESS", message: "Item removed Successfully.", updatedCart: updatedCart
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// -------------------------------------------------------------------------------------------------
export async function clearCart(req, res) {
    try {
        const userId = req.user.userId;
        const cart = await cartServices.clearCart(userId);

        if (cart.items.length != 0) {
            return res.status(400).json({
                code: "FAILURE", message: "Attemt to clear Cart failed."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Cart cleared Successfully.", Cart: cart
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};