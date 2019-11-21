const express = require("express");
const db = require("../db/database");
const Supplier = require("../model/supplier");
const { verifyToken } = require("../config/verifyJwtToken");

const { check, validationResult } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Supplier :
 *     properties:
 *       firstName:
 *           type: string
 *       lastName:
 *           type: string
 *       businessName:
 *           type: string
 *       mobileNumber:                      
 *           type: string
 *       emailId:             
 *           type: string
 */

/**
 * @swagger
 * /suppliers/listOfSuppliers/{pageNo}:
 *   get:
 *     tags:
 *       - Supplier
 *     description: Returns List Of All Supplier
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
router.get("/listOfSuppliers/:pageNo", (req, res, next) => {

    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Supplier.getAllSuppliersSQL(tokendata.organizationIdFK), (err1, data1) => {
            if (data1) {

                pageCount1 = data1.length;

                db.query(Supplier.getAllSuppliersSQL(tokendata.organizationIdFK, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "supplier": data,
                                message: "Suppliers List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "supplier": [],
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
 * /suppliers/viewParticularSupplier/{supplierId}:
 *   get:
 *     tags:
 *       - Supplier
 *     description: returns Single Supplier        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: supplierId
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
router.get("/viewParticularSupplier/:supplierId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let sid = req.params.supplierId;

        db.query(Supplier.getSupplierByIdSQL(sid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        message: "Supplier found",
                        supplier: data[0]
                    });
                } else {
                    res.status(404).json({
                        message: "Supplier Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /suppliers/addSupplier:
 *   post:
 *     tags:
 *       - Supplier
 *     description: To Add Supplier details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Supplier
 *         description: Supplier Details
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
 *           $ref: '#/definitions/Supplier'
 */
router.post("/addSupplier", [ // validation rules start 

    check('firstName').trim().isAlpha().withMessage("Only characters are allowed"),
    check('lastName').trim().isAlpha().withMessage("Only characters are allowed"),
    check('mobileNumber').trim().isInt().isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digit"),
    check('emailId').trim().normalizeEmail().isEmail().withMessage("Enter valid email id"),

], (req, res, next) => {
    verifyToken(req, res, tokendata => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let supplier = new Supplier(req.body);
        supplier.organizationIdFK = tokendata.organizationIdFK;

        db.query(supplier.addSupplierSQL(), (err, data) => {
            if (!err) {
                res.status(200).json({
                    message: "Supplier added successfully",
                    Id: data.insertId
                });
            } else {
                let message = '';
                if (err.message.includes('ER_DUP_ENTRY')) {
                    message = 'Email Id already exist'
                }
                else {
                    message = 'Something went wrong'
                }

                res.status(200).json({
                    message: message
                });
            }
        });
    })
});

/**
 * @swagger
 * /suppliers/updateSupplier/{supplierId}:
 *   put:
 *     tags:
 *       - Supplier
 *     description: Update Supplier data By supplierId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: supplierId
 *         description: Enter supplier Id 
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Supplier Data
 *         description: Supplier Data from body
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
 *           $ref: '#/definitions/Supplier'
 */

router.put("/updateSupplier/:supplierId", [ // validation rules start 

    check('firstName').trim().isAlpha().withMessage("Only characters are allowed"),
    check('lastName').trim().isAlpha().withMessage("Only characters are allowed"),
    check('mobileNumber').trim().isInt().isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digit"),
    check('emailId').trim().normalizeEmail().isEmail().withMessage("Enter valid email id"),

], (req, res, next) => {
    verifyToken(req, res, tokendata => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var sId = req.params.supplierId;
        let supplier = new Supplier(req.body);

        db.query(Supplier.checkSupplierId(sId), (err, data) => {
            if (data.length > 0) {
                db.query(supplier.updateSupplierByIdSQL(sId), (err, data) => {
                    if (!err) {

                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: `Supplier updated successfully`,
                                affectedRows: data.affectedRows
                            })
                        } else {
                            let message = '';
                            if (err.message.includes('ER_DUP_ENTRY')) {
                                message = 'Email Id already exist'
                            }
                            else {
                                message = 'Something went wrong'
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
                    message: "Supplier ID is not available"
                });
            }
        });
    });
});

/**
 * @swagger
 * /suppliers/deleteSupplier/{supplierId}:
 *   put:
 *     tags:
 *       - Supplier
 *     description: Delete Supplier data by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: supplierId
 *         description: Supplier id
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
router.put("/deleteSupplier/:supplierId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        var sId = req.params.supplierId;

        db.query(Supplier.checkSupplierId(sId), (err, data) => {
            if (data.length > 0) {
                db.query(Supplier.deleteSupplierByIdSQL(sId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Supplier deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "Supplier is not deleted"
                            });
                        }
                    } else {
                        res.status(400).json({
                            message: "Supplier Id not found"
                        });
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