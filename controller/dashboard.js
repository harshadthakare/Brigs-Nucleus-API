const express = require("express");
const db = require("../db/database");
const Dashboard = require("../model/dashboard_model");
const { verifyToken } = require("../config/verifyJwtToken");
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
                        message: "Total Counts",
                        organizationIdFK: tokendata.organizationIdFK
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
                                        "totalMaintenceRemainingAssets":totalMaintenceRemainingAssets,
                                        "dashboard": data,
                                        message: "List of Assets Whose Maintainece not done"
                                    });
                                } else {
                                    res.status(200).json({
                                        "currentPage": page,
                                        "totalCount": pageCount,
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

module.exports = router;