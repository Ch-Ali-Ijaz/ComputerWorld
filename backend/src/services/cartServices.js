import Cart from "../models/Cart.js";
import { generateCartId } from "../utils/cartUtils.js";
import { isItemInputValid } from "../validators/cartValidators.js";

export async function getCart(userId) {
    try {
        return await Cart.find({ userId: userId }).populate(
            {
                path: "items.variantId",
                populate: {
                    path: "product_Id"
                }
            }
        );
    } catch (error) {
        console.log(error);
        throw new Error("Error in getCart service");
    }
};

// ----------------------------------------------------------------------------
export async function createCart(userInfo) {
    try {
        const cartId = generateCartId(userInfo.userRole);
        const newCart = new Cart({
            cartId: cartId,
            userId: userInfo._id
        });
        return await newCart.save();

    } catch (error) {
        console.log(error);
        throw new Error("Error in createCart service.");
    }
};

// ----------------------------------------------------------------------------
export async function addToCart(userId, variantId, quantity) {
    try {
        isItemInputValid(variantId, quantity);
        return await Cart.findOneAndUpdate(
            { userId: userId },
            {
                $push: {
                    items: {
                        variantId: variantId,
                        quantity: Number(quantity)
                    }
                }
            },
            { returnDocument: "after" }
        );


    } catch (error) {
        console.log(error)
        throw new Error("Error in addToCart Service.");
    }
};

// ----------------------------------------------------------------------------
export async function updateItemQuantity(userId, variantId, quantity) {
    try {
        isItemInputValid(variantId, quantity);
        return await Cart.findOneAndUpdate(
            {
                userId: userId,
                "items.variantId": variantId
            },
            {
                $set: {
                    "items.$.quantity": Number(quantity)
                }
            },
            { returnDocument: "after" }
        );

    } catch (error) {
        console.log(error)
        throw new Error("Error in updateItemQuantity Service.");
    }
};

// ----------------------------------------------------------------------------
export async function removeFromCart(userId, variantId) {
    try {

        return await Cart.findOneAndUpdate(
            { userId: userId },
            {
                $pull: {
                    items: { variantId: variantId }
                }
            },
            {returnDocument: "after"}
        );


    } catch (error) {
        console.log(error)
        throw new Error("Error in removeFromCart service.");
    }
};

// ----------------------------------------------------------------------------
export async function clearCart(userId) {
    try {

        return await Cart.findOneAndUpdate(
            { userId: userId },
            { $set: { items: [] } },
            { returnDocument: "after" }
        );


    } catch (error) {
        console.log(error)
        throw new Error("Error in clearCart service.");
    }
};