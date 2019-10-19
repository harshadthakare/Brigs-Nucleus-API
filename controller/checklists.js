import express from "express";
import db from "../db/database";
import Checklist from "../model/checklist";
import { verifyToken } from "../config/verifyJwtToken"

// ... call to require('express') ...
const { check, validationResult } = require('express-validator');
const router = express.Router();
/**
 * @swagger
 * definitions:
 *   Checklist :
 *     properties:
 *       title:
 *           type: string
 *       categoryIdFK:
 *           type: integer
 */
/**
 * @swagger
 * /checklists/addChecklist:
 *   post:
 *     tags:
 *       - Checklist
 *     description: Add Checklist details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Checklist
 *         description: Checklist object
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
 *           $ref: '#/definitions/Checklist'
 */
router.post("/addChecklist", [
    // validation rules start 
    check('title').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long'),
    check('categoryIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let checklist = new Checklist(req.body);
        checklist.organizationIdFK = organizationIdFK;

        db.query(checklist.addChecklistSQL(), (err, data) => {
            if (!err) {
                res.status(200).json({
                    message: "Checklist added successfully",
                    Id: data.insertId
                });
            } else {
                res.status(400).json({
                    message: "Something went wrong, Please try again"
                });
            }
        });
    })
});

/**
 * @swagger
 * /checklists/updateChecklist/{checklistId}:
 *   put:
 *     tags:
 *       - Checklist
 *     description: Update Asset Checklist data By Checklist Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: checklistId
 *         description: Enter Checklist Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Checklist Data
 *         description: Checklist Data from body
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
 *           $ref: '#/definitions/Checklist'
 */

router.put("/updateChecklist/:checklistId", [
    // validation rules start 
    check('title').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long'),
    check('categoryIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, cId => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var cId = req.params.checklistId;
        let checklist = new Checklist(req.body);

        db.query(Checklist.checkChecklistId(cId), (err, data) => {
            if (data.length > 0) {
                db.query(checklist.updateChecklistByIdSQL(cId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: `Checklist updated successfully`,
                                affectedRows: data.affectedRows
                            })
                        } else {
                            res.status(400).json({
                                message: "Something went wrong, Please try again"
                            });
                        }
                    } else {
                        console.log(err.message);
                    }
                });
            }
            else {
                res.status(404).json({
                    message: "Checklist ID is not available"
                });
            }
        });
    });
});

/**
 * @swagger
 * /checklists/deleteChecklist/{checklistId}:
 *   put:
 *     tags:
 *       - Checklist
 *     description: Delete Checklist data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: checklistId
 *         description: Checklist id
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
router.put("/deleteChecklist/:checklistId", (req, res, next) => {
    verifyToken(req, res, adminId => {
        var cId = req.params.checklistId;

        db.query(Checklist.checkChecklistId(cId), (err, data) => {
            if (data.length > 0) {
                db.query(Checklist.deleteChecklistByIdSQL(cId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Checklist deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "Checklist is not deleted"
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

/** @swagger
* /checklists/listOfCheckists/{pageNo}:
*   get:
*     tags:
*       - Checklist
*     description: Returns all Checklists
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

router.get("/listOfCheckists/:pageNo", (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Checklist.getAllChecklistsSQL(organizationIdFK), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(Checklist.getAllChecklistsSQL(organizationIdFK, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "checklist": data,
                                message: "List of Checklists found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "checklist": [],
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
* /checklists/viewParticularChecklist/{checklistId}:
*   get:
*     tags:
*       - Checklist
*     description: returns Single Checklist     
*     produces:
*       - application/json
*     parameters:
*       - name: checklistId
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

router.get("/viewParticularChecklist/:checklistId", (req, res, next) => {
    verifyToken(req, res, adminId => {
        let cid = req.params.checklistId;
        db.query(Checklist.getChecklistByIdSQL(cid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        checklist: data[0],
                        message: "Checklist Found"
                    });
                } else {
                    res.status(404).json({
                        message: "Checklist Not Found"
                    });
                }
            }
        });
    })
});

module.exports = router;