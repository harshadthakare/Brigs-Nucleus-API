const express = require("express");
const db = require("../db/database");
const InstallationLocationType = require("../model/installationLocation_model");
const router = express.Router();
const { verifyToken } = require("../config/verifyJwtToken");

/**
 * @swagger
 * definitions:
 *   InstallationLocation :
 *     properties:
 *      installationLocationName:
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
*         schema:
*           $ref: '#/definitions/InstallationLocation'   
*/
router.post("/addInstallationLocation", [

], (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let obj = req.body;
        let installationLocationType = new InstallationLocationType(obj);
        obj.organizationIdFK = tokendata.organizationIdFK;

        db.query(installationLocationType.addInstallationLocationTypeSQL(obj.organizationIdFK), (err, data) => {
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
 *         schema:
 *           $ref: '#/definitions/InstallationLocation'
 */

router.put("/updateInstallationLocation/:installationLocationTypeId", [

], (req, res, next) => {
    verifyToken(req, res, tokendata => {

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
                res.status(200).json({
                    status: false,
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
router.put("/deleteInstallationLocation/:installationLocationTypeId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        var installationLocationTypeId = req.params.installationLocationTypeId;

        db.query(InstallationLocationType.checkInstallationLocationTypeIdSQL(installationLocationTypeId), (err, data) => {
            if (data.length > 0) {
                db.query(InstallationLocationType.getLocationAssignedOrNot(installationLocationTypeId), (err1, data1) => {
                    if (data1 && data1.length == 0) {
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
                    } else {
                        res.status(200).json({
                            status: false,
                            message: "Can't delete, InstallationLocation is already assigned!"
                        });
                    }
                })
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
router.get("/listOfInstallationLocation", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        db.query(InstallationLocationType.getInstallationLocationListSQL(tokendata.organizationIdFK), (err, data) => {
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
                        status: true,
                        installationLocationList: [],
                        message: "Installation Location List Not Found"
                    });
                }
            }
        });
    })
});

module.exports = router;