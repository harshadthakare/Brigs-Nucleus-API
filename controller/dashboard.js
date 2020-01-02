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
        var pageCount1 = 0;
        db.query(Dashboard.getAllNotDoneMaintenceAssets(tokendata.organizationIdFK), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;
                db.query(Dashboard.getAllNotDoneMaintenceAssets(tokendata.organizationIdFK, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                status: true,
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "totalMaintenceRemainingAssets": data,
                                message: "List of Assets Whose Maintainece not done"
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "totalMaintenceRemainingAssets": [],
                                message: "Not found"
                            });
                        }
                    }
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "Something went wrong...!!"
                });
            }

        })

    })
});
/**
 * @swagger
 * /dashboard/monthlyOrganizationCreationCounts/{year}:
 *   get:
 *     tags:
 *       - Dashboard
 *     description: Returns Monthwise Organization Count details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: year
 *         description: "Year of Creation"
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
 *       400:
 *         description: Bad request
 */
router.get("/monthlyOrganizationCreationCounts/:year", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {

        let year = req.params.year;

        let arrMonthWiseOrgCreationCount = []
        db.query(Dashboard.getAllOrganizationCreationCounts(year), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    for (let month = 0; month < 12; month++) {
                        for (let index = 0; index < data.length; index++) {
                            if ((month + 1) == data[index].monthCreatedON) {

                                let value = (month + 1) == data[index].monthCreatedON ? data[index].totalOrganizations : 0;
                                arrMonthWiseOrgCreationCount.push(
                                    value
                                )
                                break;
                            }
                        }
                        if (month == arrMonthWiseOrgCreationCount.length) {
                            arrMonthWiseOrgCreationCount.push(0);
                        }
                    }
                    res.status(200).json({
                        status: true,
                        "xAxisLable": "Months",
                        "yAxisLable": "Number of Organizations",
                        "xAxisData": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "yAxisData": arrMonthWiseOrgCreationCount,
                        "graphTitle": "Month wise organizations added"
                    });

                } else {
                    res.status(200).json({
                        status: false,
                        message: "No record found"
                    });
                }
            }
        });
    })
});
/**
 * @swagger
 * /dashboard/topOrganizationsAssetsCounts:
 *   get:
 *     tags:
 *       - Dashboard
 *     description: Returns Top 5 Organizations With total Assets Count details
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

router.get("/topOrganizationsAssetsCounts", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {

        db.query(Dashboard.getAlltopOrganizationsAssetsCounts(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    let xAxisData = [];
                    let yAxisData = [];
                    for (let index = 0; index < data.length; index++) {
                        xAxisData.push(data[index].organizationName);
                        yAxisData.push(data[index].totalAssets);
                    }
                    res.status(200).json({
                        status: true,
                        "xAxisLable": "Organizations",
                        "yAxisLable": "Number of Assets",
                        "xAxisData": xAxisData,
                        "yAxisData": yAxisData,
                        "graphTitle": "TOP ASSETS ORGANIZATIONS"
                    });
                }
            } else {
                res.status(200).json({
                    status: false,
                    message: "No record found"
                });
            }
        });
    })
});

/**
 * @swagger
 * /dashboard/monthlyAssetCreationCounts/{year}:
 *   get:
 *     tags:
 *       - Dashboard
 *     description: Returns Monthwise Asset Count details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: year
 *         description: "Year of Creation"
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
 *       400:
 *         description: Bad request
 */
router.get("/monthlyAssetCreationCounts/:year", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        let year = req.params.year;

        let arrMonthWiseAssetCreationCount = []
        db.query(Dashboard.getAllAssetsCreationCounts(tokendata.organizationIdFK, year), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    for (let month = 0; month < 12; month++) {
                        for (let index = 0; index < data.length; index++) {
                            if ((month + 1) == data[index].monthCreatedON) {

                                let value = (month + 1) == data[index].monthCreatedON ? data[index].totalAssets : 0;
                                arrMonthWiseAssetCreationCount.push(
                                    value
                                )
                                break;
                            }
                        }
                        if (month == arrMonthWiseAssetCreationCount.length) {
                            arrMonthWiseAssetCreationCount.push(0);
                        }
                    }
                    res.status(200).json({
                        status: true,
                        "xAxisLable": "Months",
                        "yAxisLable": "Number of Assets",
                        "xAxisData": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "yAxisData": arrMonthWiseAssetCreationCount,
                        "graphTitle": "Month wise Asset added"
                    });

                } else {
                    res.status(200).json({
                        status: false,
                        message: "No record found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /dashboard/monthlyComplaintsAssignedCounts/{year}:
 *   get:
 *     tags:
 *       - Dashboard
 *     description: Returns Monthwise Complaints Assigned Count details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: year
 *         description: "Year of Creation"
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
 *       400:
 *         description: Bad request
 */
router.get("/monthlyComplaintsAssignedCounts/:year", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        let year = req.params.year;

        let arrMonthWiseComplaintsAssignedCount = []
        db.query(Dashboard.getTotalComplaintsAssignedCounts(tokendata.organizationIdFK, year), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    for (let month = 0; month < 12; month++) {
                        for (let index = 0; index < data.length; index++) {
                            if ((month + 1) == data[index].monthCreatedON) {

                                let value = (month + 1) == data[index].monthCreatedON ? data[index].totalComplaints : 0;
                                arrMonthWiseComplaintsAssignedCount.push(
                                    value
                                )
                                break;
                            }
                        }
                        if (month == arrMonthWiseComplaintsAssignedCount.length) {
                            arrMonthWiseComplaintsAssignedCount.push(0);
                        }
                    }
                    res.status(200).json({
                        status: true,
                        "xAxisLable": "Months",
                        "yAxisLable": "Number of Complaints Assigned",
                        "xAxisData": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "yAxisData": arrMonthWiseComplaintsAssignedCount,
                        "graphTitle": "Month wise Complaints Assigned"
                    });

                } else {
                    res.status(200).json({
                        status: false,
                        message: "No record found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /dashboard/categoryWiseAssetsCounts:
 *   get:
 *     tags:
 *       - Dashboard
 *     description: Returns Categories List with total Assets Count details
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

router.get("/categoryWiseAssetsCounts", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        db.query(Dashboard.getCategoryWiseAssetsCounts(tokendata.organizationIdFK), (err, data) => {
            if (!err && data && data.length > 0) {
                let xAxisData = [];
                let yAxisData = [];
                for (let index = 0; index < data.length; index++) {
                    xAxisData.push(data[index].categoryTitle);
                    yAxisData.push(data[index].totalAssets);
                }
                res.status(200).json({
                    status: true,
                    "categoryName": xAxisData,
                    "assetCount": yAxisData,
                    "Title": "Category Wise Assets"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    message: "No record found"
                });
            }
        });
    })
});

/**
 * @swagger
 * /dashboard/categoryPendingMaintenceAssetsCounts:
 *   get:
 *     tags:
 *       - Dashboard
 *     description: Returns Categories List with total Assets Count details
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

router.get("/categoryPendingMaintenceAssetsCounts", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        db.query(Dashboard.getCategoryPendingMAssetsCounts(tokendata.organizationIdFK), (err, data) => {

            if (!err && data && data.length > 0) {
                let xAxisData = [];
                let yAxisData = [];
                for (let index = 0; index < data.length; index++) {
                    xAxisData.push(data[index].categoryName);
                    yAxisData.push(data[index].pendingMaintenanceAssets);
                }
                res.status(200).json({
                    status: true,
                    "categoryName": xAxisData,
                    "assetCount": yAxisData,
                    "Title": "Category Wise Pending Maintenance Assets Count"
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "No record found"
                });
            }
        });
    })
});

/**
 * @swagger
 * /dashboard/installationLocationWiseAssetsCounts:
 *   get:
 *     tags:
 *       - Dashboard
 *     description: Returns installation Location List with total Assets Count details
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

router.get("/installationLocationWiseAssetsCounts", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        db.query(Dashboard.getInstallationLocAssetsCounts(tokendata.organizationIdFK), (err, data) => {

            if (data && data.length > 0 && !err) {
                let xAxisData = [];
                let yAxisData = [];
                for (let index = 0; index < data.length; index++) {
                    xAxisData.push(data[index].installationLocationName);
                    yAxisData.push(data[index].totalAssets);
                }
                res.status(200).json({
                    status: true,
                    "installationLocationName": xAxisData,
                    "assetCount": yAxisData,
                    "Title": "Installation location wise assets"
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "No record found"
                });
            }
        });
    })
});

module.exports = router;