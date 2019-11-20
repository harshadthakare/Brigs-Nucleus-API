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
    verifyToken(req, res, organizationIdFK => {

        db.query(Dashboard.getAllCounts(organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        "dashboard": data,
                        message: "Total Counts"
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: "Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /dashboard/getNotDoneMaintaineceAsset:
 *   get:
 *     tags:
 *       -  Dashboard
 *     description: List of Assets Whose Maintainece not done
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

router.get("/getNotDoneMaintaineceAsset", (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {

        db.query(Dashboard.getAllNotDoneCheckistAssets(organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        "dashboard": data,
                        message: "List of Assets Whose Maintainece not done"
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: "Not found"
                    });
                }
            }
        });
    })
});

module.exports = router;