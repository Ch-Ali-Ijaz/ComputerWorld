import Discount from "./discountModel.js";
import * as discountUtils from "./discountUtils.js";
import { isDiscountInputValid } from "./discountValidators.js";
import { resolveTargetIds, resolveUserIds } from "./disountResolvers.js";

export async function createDiscount(discountInfo){
    try{
        isDiscountInputValid(discountInfo);
        const discountId = discountUtils.setDiscountId(discountInfo.targetType);
        const discountCode = discountUtils.setDiscountCode(discountInfo.name);
        const userIds = await resolveUserIds(discountInfo.applicableTo, discountInfo.userCriteria);
        const targetIds = await resolveTargetIds(discountInfo.targetType, discountInfo.targetCriteria);
        
        const newDiscount = new Discount({
            discountId: discountId,
            discountCode: discountCode,
            name: discountInfo.name,
            description: discountInfo.discription,
            targetType: discountInfo.targetType,
            targetIds: targetIds,
            applicableTo: discountInfo.applicableTo,
            userIds: userIds,
            discountType: discountInfo.discountType,
            value: discountInfo.value,
            startDate:  discountInfo.startDate,
            endDate:  discountInfo.endDate,
            maxQuantity:  discountInfo.maxQuantity
        });

        return await newDiscount.save();

    } catch (error){
        console.log("Error in createDiscount service.");
        throw new Error(error);
    }
}