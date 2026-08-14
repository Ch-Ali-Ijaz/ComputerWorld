import express from "express";

// Middlewares
import {authenticate} from "../middleware/authMiddleware.js";
import {authorizeToLogin} from "../middleware/authorizeMiddleware.js";

// Controllers
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js";

// import { viewMyProfile, updateMyProfile } from "../controllers/profileController.js";
// import { getAllProducts, getProduct, findProduct, createProduct, updateProduct, deleteProduct} from "../controllers/productsController.js";
// import {getAllCarts, getCart, findCart, createCart, updateCart, deleteCart} from "../controllers/cartController.js";
// import {getAllOrders, getOrder, createOrder, updateOrder, deleteOrder} from "../controllers/orderController.js";
// import {getAllDeliveries, getDelivery, createDelivery, updateDelivery, deleteDelivery} from "../controllers/deliveryController.js";
// import {getAllReviews, getReview, createReview, updateReview, deleteReview, getAllReReview} from "../controllers/reviewController.js";

const router = express.Router();
router.use(authenticate, authorizeToLogin('admin'));

// // Profile related routes
// router.get("/profile", viewMyProfile);
// router.put("/profile/:id", updateMyProfile);

// User related routes

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// // Product related routes

// router.get("/products", getAllProducts);
// router.get("/products/:id", getProduct);
// router.get("/products", findProduct);
// router.post("/products", createProduct);
// router.put("/products/:id", updateProduct);
// router.delete("/products/:id", deleteProduct);

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