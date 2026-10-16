import { dashboardWorkflow } from "./adminDashboardWorkflow.js";

export async function dashBoardData(req, res){
    try {

        const dashboardData = await dashboardWorkflow();

        return res.status(200).json({
            code: "SUCCESS", message: "Dashboard Data successfully Retrieved.", dashboardData
        });

    } catch (error) {
        console.log("Error in adminDashboardController: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
}