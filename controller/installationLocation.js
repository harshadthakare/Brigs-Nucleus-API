const express = require("express");
const db = require("../db/database");
const InstallationLocationType = require("../model/installationLocation_model");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { superVerifyToken } = require("../config/superVerifyJwtToken");

/**
 * @swagger
 * definitions:
 *   InstallationLocation :
 *     properties:
 *      title:
 *         type: string
 */

/**
* @swagger
* /installationLocation/addInstallationLocation:
*   post:
*     tags:
*       - InstallationLocation
*     description: Adds installationLocation Type
*     produces:
*       - application/json
*     parameters:
*       - name: InstallationLocation 
*         description: InstallationLocation object
*         in: body
*         required: true
*     responses:
*       200:
*         description: OK
*       404:
*         description: Not found
*       400:
*         description: Bad request
*         schema:
*           $ref: '#/definitions/InstallationLocation'   
*/
router.post("/addInstallationLocation", [
    check('title').trim().isAlpha().withMessage('Only characters are allowed'),
], (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let installationLocationType = new InstallationLocationType(req.body);

        db.query(installationLocationType.addInstallationLocationTypeSQL(), (err, data) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "InstallationLocation Type added successfully",
                    Id: data.insertId
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "Something went wrong, Please try again"
                })
            }
        })
    })
});

/**
 * @swagger
 * /installationLocation/updateInstallationLocation/{installationLocationTypeId}:
 *   put:
 *     tags:
 *       - InstallationLocation
 *     description: Update InstallationLocation data By installationLocationType Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: installationLocationTypeId
 *         description: Enter installationLocationType Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: admin Data
 *         description: admin Data from body
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/InstallationLocation'
 */

router.put("/updateInstallationLocation/:installationLocationTypeId", [

    check('title').trim().isAlpha().withMessage('Only characters are allowed'),

], (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var installationLocationTypeId = req.params.installationLocationTypeId;

        let installationLocationType = new InstallationLocationType(req.body);

        db.query(InstallationLocationType.checkInstallationLocationTypeIdSQL(installationLocationTypeId), (err, data) => {
            if (data.length > 0) {
                db.query(installationLocationType.updateInstallationlocationtypeSQL(installationLocationTypeId), (err, data) => {
                    if (!err) {

                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                status: true,
                                message: "Installation Location updated successfully",
                                affectedRows: data.affectedRows
                            })
                        } else {
                            res.status(200).json({
                                status: false,
                                message: "Something went wrong, Please try again"
                            });
                        }
                    } else {
                        res.status(200).json({
                            status: false,
                            message: "Something went wrong, Please try again"
                        });
                    }
                });
            }
            else {
                res.status(404).json({
                    message: "installationLocationType Id is not available"
                });
            }
        });
    })
});

/**
 * @swagger
 * /installationLocation/deleteInstallationLocation/{installationLocationTypeId}:
 *   put:
 *     tags:
 *       - InstallationLocation
 *     description: Delete InstallationLocation data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: installationLocationTypeId
 *         description: installationLocationType id
 *         in: path
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 */
router.put("/deleteInstallationLocation/:installationLocationTypeId", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        var installationLocationTypeId = req.params.installationLocationTypeId;

        db.query(InstallationLocationType.checkInstallationLocationTypeIdSQL(installationLocationTypeId), (err, data) => {
            if (data.length > 0) {
                db.query(InstallationLocationType.deleteInstallationlocationtypeByIdSQL(installationLocationTypeId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                status: true,
                                message: "InstallationLocation deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(200).json({
                                status: false,
                                message: "InstallationLocation is not deleted"
                            });
                        }
                    } else {
                        res.status(200).json({
                            status: false,
                            message: "Something Went Wrong,Please Try Again...!"
                        });
                    }
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    message: "Something Went Wrong,Please Try Again...!"
                });
            }
        });
    })
});

/**
 * @swagger
 * /installationLocation/listOfInstallationLocation:
 *   get:
 *     tags:
 *       - InstallationLocation
 *     description: API for installationLocation list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 */
router.get("/listOfInstallationLocation", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        db.query(InstallationLocationType.getInstallationLocationListSQL(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        installationLocationList: data,
                        message: "InstallationLocation List Found"
                    });
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "Installation Location List Not Found"
                    });
                }
            }
        });
    })
});

module.exports = router;