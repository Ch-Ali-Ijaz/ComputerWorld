import express from "express";

// Middlewares
import {authenticate} from "../middleware/authMiddleware.js";
import {authorizeToLogin} from "../middleware/authorizeMiddleware.js";

// Controllers
import * as userController from "../controllers/userController.js";
import * as dealerController from "../controllers/dealerController.js";
import * as productController from "../controllers/productController.js";
import * as variantController from "../controllers/variantController.js";
import * as inventoryUnitController from "../controllers/inventoryUnitController.js";

// import { viewMyProfile, updateMyProfile } from "../controllers/profileController.js";
// import {getAllCarts, getCart, findCart, createCart, updateCart, deleteCart} from "../controllers/cartController.js";
// import {getAllOrders, getOrder, createOrder, updateOrder, deleteOrder} from "../controllers/orderController.js";
// import {getAllDeliveries, getDelivery, createDelivery, updateDelivery, deleteDelivery} from "../controllers/deliveryController.js";
// import {getAllReviews, getReview, createReview, updateReview, deleteReview, getAllReReview} from "../controllers/reviewController.js";

const router = express.Router();
router.use(authenticate, authorizeToLogin('admin'));

// User related routes

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUser);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Dealer related routes

router.get("/dealers", dealerController.getAllDealers);
router.get("/dealers/:id", dealerController.getDealer);
router.post("/dealers", dealerController.createDealer);
router.put("/dealers/:id", dealerController.updateDealer);
router.delete("/dealers/:id", dealerController.deleteDealer);

// Product related routes

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProduct);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// Variant related routes

router.get("/variants", variantController.getAllVariants);
router.get("/variants/:id", variantController.getVariant);
router.post("/variants/:id", variantController.createVariant);
router.put("/variants/:id", variantController.updateVariant);
router.delete("/variants/:id", variantController.deleteVariant);

// Defects related routes

// router.get("/variants", variantController.getAllVariants);
// router.get("/variants/:id", variantController.getVariant);
// router.post("/variants/:id", variantController.createVariant);
// router.put("/variants/:id", variantController.updateVariant);
// router.delete("/variants/:id", variantController.deleteVariant);

// InventoryUnit related routes

// router.get("/InventoryUnits", inventoryUnitController.getAllUnits);
// router.get("/InventoryUnits/:id", inventoryUnitController.getUnit);
// router.post("/InventoryUnits/:id", inventoryUnitController.createUnit);
// router.put("/InventoryUnits/:id", inventoryUnitController.updateUnit);
// router.delete("/InventoryUnits/:id", inventoryUnitController.deleteUnit);

// // Profile related routes
// router.get("/profile", viewMyProfile);
// router.put("/profile/:id", updateMyProfile);



// // Cart related routes
// router.get("/cart", getAllCarts);
// router.get("/cart:id", getCart);
// router.get("/cart", findCart);
// router.post("/cart", createCart);
// router.put("/cart:id", updateCart);
// router.delete("/cart:id", deleteCart);


// // Order related routes
// router.get("/orders", getAllOrders);
// router.get("/orders/:id", getOrder);
// router.post("/orders", createOrder);
// router.put("/orders/:id", updateOrder);
// router.get("/orders/:id", deleteOrder);

// // Delivery related routes
// router.get("/delivery", getAllDeliveries);
// router.get("/delivery/:id", getDelivery);
// router.post("/delivery", createDelivery);
// router.put("/delivery/:id", updateDelivery);
// router.get("/delivery/:id", deleteDelivery);

// // Review related routes
// router.get("/reviews", getAllReviews);
// router.get("/reviews/:id", getReview);
// router.post("/reviews", createReview);
// router.put("/reviews/:id", updateReview);
// router.get("/reviews/:id", deleteReview);

export default router