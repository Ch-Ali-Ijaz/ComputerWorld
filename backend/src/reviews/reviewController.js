import * as reviewService from "./reviewServices.js";

export async function getReviews(req, res) {
    try {
        const queries = req.query;
    
        const reviews = await reviewService.getReviews(queries);
    
        if(reviews.length === 0) {
            return res.status(404).json({
                code: "FAILURE", message: "No reviews found."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Retrieved Reviews.", reviews: reviews
            });
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// ----------------------------------------------------------------------------------------------------
export async function createReview(req, res) {
    try {
        const user = req.user;
        const variantId = req.params.id;
        const review = req.body;
    
        const newReview = await reviewService.createReview(user.userId, variantId, review);
    
        return res.status(200).json({
            code: "SUCCESS", message: "Creation Successfull.", newReview: newReview
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// ----------------------------------------------------------------------------------------------------
export async function updateReview(req, res) {
    try {
        const user = req.user;
        const objectId = req.params.id;
        const newInfo = req.body;
        const updatedReview = await reviewService.updateReview(user.userId, objectId, newInfo);
    
        if(!updatedReview) {
            return res.status(404).json({
                code: "FAILURE", message: "Review not found."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Update Successfull.", updatedReview: updatedReview
            });
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// ----------------------------------------------------------------------------------------------------
export async function deleteReview(req, res) {
    try {
        const user = req.user;
        const objectId = req.params.id;
        const deletedReview = await reviewService.deleteReview(user.userId, objectId);
    
        if(!deletedReview) {
            return res.status(404).json({
                code: "FAILURE", message: "Review not found."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Deletion Successfull.", deletedReview: deletedReview
            });
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};