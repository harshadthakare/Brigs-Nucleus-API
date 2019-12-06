const express = require("express");
const db = require("../db/database");
const Alerts = require("../model/alert_model");
const { verifyToken } = require("../config/verifyJwtToken")
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
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Alerts.getAlertCount(tokendata.organizationIdFK), (err2, data2) => {
            let totalAlerts = data2[0].totalAlerts;

            if (data2) {

                db.query(Alerts.getAllAlerts(tokendata.organizationIdFK), (err1, data1) => {

                    if (data1) {
                        pageCount1 = data1.length;

                        db.query(Alerts.getAllAlerts(tokendata.organizationIdFK, limit, page), (err, data) => {
                            if (!err) {
                                if (data && data.length > 0) {
                                    res.status(200).json({
                                        "currentPage": page,
                                        "totalCount": pageCount1,
                                        "totalAlerts": totalAlerts,
                                        "alert": data,
                                        message: "Alert List found",
                                    });
                                } else {
                                    res.status(200).json({
                                        "currentPage": page,
                                        "totalCount": pageCount1,
                                        "totalAlerts": 0,
                                        "alert": [],
                                        message: "No record found"
                                    });
                                }
                            }
                        });
                    }
                    else {
                        res.status(400).json({
                            message: "Something went wrong...!!"
                        });
                    }
                });
            }
            else {
                res.status(400).json({
                    message: "Something went wrong...!!"
                });
            }
        })
    })
});

/**
 * @swagger
 * /alerts/alertSearch:
 *   get:
 *     tags:
 *       - Alert  
 *     description: Returns List of Alerts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: keyword
 *         description: keyword search
 *         in: query
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

router.get("/alertSearch/", [
    // validation rules start 
    check('keyword').trim().not().isEmpty().withMessage("Please enter keyword")
], (req, res, next) => {

    verifyToken(req, res, tokendata => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let keyword = req.query.keyword;

        db.query(Alerts.getAllAlertSearchSQL(tokendata.organizationIdFK, keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Alert Found"
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
    verifyToken(req, res, tokendata => {
        let aid = req.params.alertId;

        db.query(Alerts.getAlertTrackCount(aid), (err1, data1) => {
            let totalAlertTrack = data1[0].totalAlertTrack;
            let isRead = data1[0].isRead;
            let isDeliver = data1[0].isDeliver;

            if (data1) {

                db.query(Alerts.getAlertByIdSQL(aid), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {

                            res.status(200).json({
                                "totalAlertTrack": totalAlertTrack,
                                "isRead": isRead,
                                "isDeliver": isDeliver,
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
            }
            else {
                res.status(400).json({
                    message: "Something went wrong...!!"
                });
            }
        })


    })
});

/**
 * @swagger
 * /alerts/viewParticularAlertTrack/{alertId}/{pageNo}:
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
router.get("/viewParticularAlertTrack/:alertId/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let aid = req.params.alertId;

        db.query(Alerts.getAlertTrackById(aid), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(Alerts.getAlertTrackById(aid, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "alertTrack": data,
                                message: "Alert Track List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "alertTrack": [],
                                message: "No record found"
                            });
                        }
                    }
                });
            }
            else {
                res.status(400).json({
                    message: "Something went wrong...!!"
                });
            }
        })
    })
});

/**
 * @swagger
 * /alerts/alertTrackSearch:
 *   get:
 *     tags:
 *       - Alert  
 *     description: Returns List of Alerts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: alertId
 *         description: alert Id
 *         in: query
 *         required: true
 *       - name: keyword
 *         description: keyword search
 *         in: query
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

router.get("/alertTrackSearch/", [
    // validation rules start 
    check('keyword').trim().not().isEmpty().withMessage("Please enter keyword")
], (req, res, next) => {

    verifyToken(req, res, tokendata => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let alertId = req.query.alertId;
        let keyword = req.query.keyword;

        db.query(Alerts.getAlertTrackSearch(alertId, keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Alert Track List Found"
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
    verifyToken(req, res, tokendata => {
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