import express from "express";
import db from "../db/database";
import Alerts from "../model/alert_model";
import { verifyToken } from "../config/verifyJwtToken"
const { check, validationResult } = require('express-validator');
const router = express.Router();

/**
 * @swagger
 * /alerts/AlertList/{pageNo}:
 *   get:
 *     tags:
 *       - Alert
 *     description: returns List of Alerts       
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
 *       400:
 *         description: Bad request
 */

router.get("/AlertList/:pageNo", (req, res, next) => {
    verifyToken(req, res, adminId => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Alerts.getAllAlerts(), (err1, data1) => {
            pageCount1 = data1.length;

            db.query(Alerts.getAllAlerts(limit, page), (err, data) => {
                if (!err) {
                    if (data && data.length > 0) {
                        res.status(200).json({
                            "currentPage": page,
                            "totalCount": pageCount1,
                            "alert": data,
                            message: "Alert List found",
                        });
                    } else {
                        res.status(200).json({
                            "currentPage": page,
                            "totalCount": pageCount1,
                            "alert": [],
                            message: "No record found"
                        });
                    }
                }
            });
        });
    })
});

/**
 * @swagger
 * /alerts/viewParticularAlert/{alertId}:
 *   get:
 *     tags:
 *       - Alert
 *     description: returns Single Allert        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: alertId
 *         description: ""
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
router.get("/viewParticularAlert/:alertId", (req, res, next) => {
    verifyToken(req, res, aId => {
        let aid = req.params.alertId;

        db.query(Alerts.getAlertByIdSQL(aid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        alert: data[0],
                        message: "Alert found",
                    });
                } else {
                    res.status(404).json({
                        message: "Alert Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /alerts/deleteAlert/{alertId}:
 *   put:
 *     tags:
 *       - Alert
 *     description: Delete Alert data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: alertId
 *         description: Alert id
 *         in: path
 *         type: integer
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

router.put("/deleteAlert/:alertId", (req, res, next) => {
    verifyToken(req, res, aId => {
        var aId = req.params.alertId;

        db.query(Alerts.checkAlertById(aId), (err, data) => {
            if (data.length > 0) {
                db.query(Alerts.deleteAlertByIdSQL(aId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Alert deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        }
                        else {
                            res.status(400).json({
                                message: "Alert is not deleted"
                            });
                        }
                    }
                    else {
                        console.log(err.message);
                    }
                });
            }
            else {
                res.status(400).json({
                    message: "Already deleted"
                });
            }
        });
    })
});

module.exports = router;