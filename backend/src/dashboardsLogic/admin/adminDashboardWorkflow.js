import * as units from "../../inventoryUnitLogic/inventoryUnitServices.js";
import * as user from "../../userLogic/userServices.js";
import * as dashboardUtils from "./adminDashboardUtils.js";

export async function dashboardWorkflow() {
    const availableUnits = await units.getUnits({ currentStatus: "Available" });
    const totalInventory = await units.getInventory();

    const dates = dashboardUtils.setDate();
    const soldInTwoMonths = await units.getUnits({
        currentStatus: "Sold", updatedAtSD: dates.prevDate
    });
    const purchasedInTwoMonths = await units.getUnits({
        createdAtSD: dates.prevDate, currentStatus: {$ne: "Sold"}
    });

    const soldUnitsData = dashboardUtils.extractSoldUnitsData(soldInTwoMonths, dates);
    const purchasedUnitsData = dashboardUtils.extractPurchasedUnitsData(purchasedInTwoMonths, dates);

    const ActiveEmployees = await user.getAllUsers({
        role: "employee", status: "Active"
    });
    
    const employeesData = [];
    
    ActiveEmployees.map(employee=>{
        employeesData.push({
            employeeId: employee.userId,
            employeeName: employee.userName
        });
    });

    return {soldUnitsData, purchasedUnitsData, employeesData};
};