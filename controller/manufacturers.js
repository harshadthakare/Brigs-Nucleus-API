const express = require("express");
const db = require("../db/database");
const Manufacturer = require("../model/manufacturer");
const { verifyToken } = require("../config/verifyJwtToken");

const { check, validationResult } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Manufacturer :
 *     properties:
 *       title:
 *           type: string
 */
/**
 * @swagger
 * /manufacturers/listOfManufacturer/{pageNo}:
 *   get:
 *     tags:
 *       - Manufacturer
 *     description: Returns List Of All Manufacturer
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
router.get("/listOfManufacturer/:pageNo", (req, res, next) => {

    verifyToken(req, res, organizationIdFK => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Manufacturer.getAllManufacturersSQL(organizationIdFK), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(Manufacturer.getAllManufacturersSQL(organizationIdFK, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "manufacturer": data,
                                message: "Manufracturer List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "manufacturer": [],
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
    })
});

/**
 * @swagger
 * /manufacturers/viewParticularManufacturer/{manufacturerId}:
 *   get:
 *     tags:
 *       - Manufacturer
 *     description: returns Single Manufacturer        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: manufacturerId
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
router.get("/viewParticularManufacturer/:manufacturerId", (req, res, next) => {
    verifyToken(req, res, adminId => {
        let mid = req.params.manufacturerId;
        console.log(mid);

        db.query(Manufacturer.getManufacturerByIdSQL(mid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        message: "Manufacturer found",
                        department: data[0]
                    });
                } else {
                    res.status(404).json({
                        message: "Manufacturer Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /manufacturers/addManufacturer:
 *   post:
 *     tags:
 *       - Manufacturer
 *     description: To Add Manufacturer details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Manufacturer
 *         description: Manufacturer Datails 
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
 *           $ref: '#/definitions/Manufacturer'
 */
router.post("/addManufacturer", [ // validation rules start 

    check('title').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long')

], (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let manufacturer = new Manufacturer(req.body);
        manufacturer.organizationIdFK = organizationIdFK;

        db.query(manufacturer.addManufacturerSQL(), (err, data) => {
            if (!err) {
                res.status(200).json({
                    message: "Manufacturer added successfully",
                    Id: data.insertId
                });
            } else {
                let message = '';
                if(err.message.includes('ER_DUP_ENTRY'))
                {
                    message='Manufacturer title already exist'
                }
                else{
                    message='Something went wrong'
                }

                res.status(400).json({
                    message: message
                });
            }
        });
    })
});

/**
 * @swagger
 * /manufacturers/updateManufacturer/{manufacturerId}:
 *   put:
 *     tags:
 *       - Manufacturer
 *     description: Update Manufacturer data By manufacturerId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: manufacturerId
 *         description: Enter manufacturerId Id 
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Manufacturer Data
 *         description: Manufacturer Data from body
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: token
 *         in: header
 *         type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/Manufacturer'
 */

router.put("/updateManufacturer/:manufacturerId", [ // validation rules start 

    check('title').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long')

], (req, res, next) => {
    verifyToken(req, res, adminId => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var mId = req.params.manufacturerId;
        let manufacturer = new Manufacturer(req.body);

        db.query(Manufacturer.checkManufacturerId(mId), (err, data) => {
            if (data.length > 0) {
                db.query(manufacturer.updateManufacturerByIdSQL(mId), (err, data) => {
                    if (!err) {

                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: `Manufacturer updated successfully`,
                                affectedRows: data.affectedRows
                            });
                        } else {
                            let message = '';
                            if(err.message.includes('ER_DUP_ENTRY'))
                            {
                                message='Manufacturer title already exist'
                            }
                            else{
                                message='Something went wrong'
                            }
            
                            res.status(400).json({
                                message: message
                            });
                        }
                    } 
                });
            }
            else {
                res.status(404).json({
                    message: "Manufacturer ID is not available"
                });
            }
        });
    });
});
/**
 * @swagger
 * /manufacturers/deleteManufacturer/{manufacturerId}:
 *   put:
 *     tags:
 *       - Manufacturer
 *     description: Delete Manufacturer data by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: manufacturerId
 *         description: manufacturer id
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
router.put("/deleteManufacturer/:manufacturerId", (req, res, next) => {
    verifyToken(req, res, adminId => {
        var mId = req.params.manufacturerId;

        db.query(Manufacturer.checkManufacturerId(mId), (err, data) => {
            if (data.length > 0) {
                db.query(Manufacturer.deleteManufacturerByIdSQL(mId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Manufacturer deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "Manufacturer is not deleted"
                            });
                        }
                    } else {
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