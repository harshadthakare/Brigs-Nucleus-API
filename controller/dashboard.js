const express = require("express");
const db = require("../db/database");
const Dashboard = require("../model/dashboard_model");
const { verifyToken } = require("../config/verifyJwtToken");
const { superVerifyToken } = require("../config/superVerifyJwtToken");
const router = express.Router();

/**
 * @swagger
 * /dashboard/home:
 *   get:
 *     tags:
 *       -  Dashboard
 *     description: Returns List all Asset And Documents
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */

router.get("/home", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Dashboard.getAllCounts(tokendata.organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        "dashboard": data,
                        message: "Total Counts"
                    });
                } else {
                    res.status(404).json({
                        message: "Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /dashboard/getMaintenanceNotDoneAssets/{pageNo}:
 *   get:
 *     tags:
 *       -  Dashboard
 *     description: List of Assets Whose Maintainece not done
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pageNo
 *         description: "Page Number always starts with 0"
 *         in: path
 *         required: true
 *       - name: Authorization
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */

router.get("/getMaintenanceNotDoneAssets/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount = 0;
        db.query(Dashboard.getMaintenanceNotDoneAssetCount(tokendata.organizationIdFK), (err2, data2) => {

            let totalMaintenceRemainingAssets = data2[0].totalMaintenceRemainingAssets;

            if (data2) {
                db.query(Dashboard.getAllNotDoneMaintenceAssets(tokendata.organizationIdFK), (err1, data1) => {
                    if (data1) {

                        pageCount = data1.length;
                        db.query(Dashboard.getAllNotDoneMaintenceAssets(tokendata.organizationIdFK, limit, page), (err, data) => {
                            if (!err) {
                                if (data && data.length > 0) {
                                    res.status(200).json({
                                        "currentPage": page,
                                        "totalCount": pageCount,
                                        "totalMaintenceRemainingAssets": totalMaintenceRemainingAssets,
                                        "dashboard": data,
                                        message: "List of Assets Whose Maintainece not done"
                                    });
                                } else {
                                    res.status(200).json({
                                        "currentPage": page,
                                        "totalCount": pageCount,
                                        "totalMaintenceRemainingAssets": 0,
                                        "dashboard": [],
                                        message: "Not found"
                                    });
                                }
                            }
                        });
                    } else {
                        res.status(400).json({
                            message: "Something went wrong...!!"
                        });
                    }

                })
            } else {
                res.status(400).json({
                    message: "Something went wrong...!!"
                });
            }
        });

    })
});

/**
 * @swagger
 * /dashboard/superAdminCount:
 *   get:
 *     tags:
 *       -  Dashboard
 *     description: Returns List of all Organizations and Admins
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */

router.get("/superAdminCount", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {

        db.query(Dashboard.getAllSuperCounts(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        "dashboard": data,
                        message: "Total Counts"
                    });
                } else {
                    res.status(404).json({
                        message: "Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /dashboard/monthlyOrganizationCreationCounts:
 *   get:
 *     tags:
 *       - Dashboard
 *     description: Returns Monthwise Organization Count details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token
 *         in: header
 *         required: true
 *     responses:   
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 */
router.get("/monthlyOrganizationCreationCounts", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        let year = new Date();
        year = year.getFullYear();

        db.query(Dashboard.getAllOrganizationCreationCounts(year), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        "MonthWiseOrgCreationCount": data,
                        status: true,
                        message: "counts Of Monthly Created Organizations found"
                    });
                } else {
                    res.status(200).json({
                        status:false,
                        message: "Not found"
                    });
                }
            }
        });
    })
});
// router.get("/monthlyOrganizationCreationCounts", (req, res, next) => {
//     superVerifyToken(req, res, tokendata => {

//         let year = new Date();
//         year = year.getFullYear();

//         let arrMonthWiseOrgCreationCount = []
//         db.query(Dashboard.getAllOrganizationCreationCounts(year), (err, data) => {
//             if (!err) {
//                 if (data && data.length > 0) {
//                     for (let month = 0; month < 12; month++) {
//                         for (let index = 0; index < data.length; index++) {
//                             if ((month + 1) == data[index].monthCreatedON) {

//                                 let value = (month + 1) == data[index].monthCreatedON ? data[index].monthCreatedON : 0;
//                                 arrMonthWiseOrgCreationCount.push(
//                                     value
//                                 )
//                                 break;
//                             }
//                         }
//                         if (month == arrMonthWiseOrgCreationCount.length) {
//                             arrMonthWiseOrgCreationCount.push(0);
//                         }
//                     }
//                     res.status(200).json({
//                         "MonthWiseOrgCreationCount": data,
//                         status: true,
//                         message: "counts Of Monthly Created Organizations found"
//                     });

//                 } else {
//                     res.status(200).json({
//                         "MonthWiseOrgCreationCount": [],
//                         status: false,
//                         message: "No record found"
//                     });
//                 }
//             }
//         });
//     })
// });
module.exports = router;