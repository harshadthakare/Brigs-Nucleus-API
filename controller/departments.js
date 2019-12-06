const express = require("express");
const db = require("../db/database");
const Dept = require("../model/department");
const { verifyToken } = require("../config/verifyJwtToken")
const { generateDeptArray } = require("../config/generateArray")

// ... call to require('express') ...
const { check, validationResult } = require('express-validator');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Department :
 *     properties:
 *      parentId:
 *         type: integer
 *      departmentTitle:
 *         type: string
 */

/**
 * @swagger
 * /departments/departmentList:
 *   get:
 *     tags:
 *       - Department
 *     description: Returns all Departments List
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
 *         schema:
 *           $ref: '#/definitions/Department'   
 */

router.get("/departmentList", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Dept.getAllDeptSQL(tokendata.organizationIdFK), (err, data) => {

            let allDepartments = data;
            if (!err) {
                if (data && data.length > 0) {

                    generateDeptArray(allDepartments, (result) => {
                        res.status(200).json({
                            "department": result,
                            message: "Department List found"
                        });
                    })
                }
                else {
                    res.status(200).json({
                        message: "Department List Not found",
                        department: []
                    });
                }
            }
            else {
                res.status(200).json({
                    message: "Department List Not found"
                });
            }
        });
    })
});

/**
 * @swagger
 * /departments/viewParticularDepartment/{departmentId}:
 *   get:
 *     tags:
 *       - Department
 *     description: returns Single Department        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: departmentId
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
router.get("/viewParticularDepartment/:departmentId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let uid = req.params.departmentId;

        db.query(Dept.getDeptByIdSQL(uid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        message: "Department Found",
                        department: data[0]
                    });
                } else {
                    res.status(200).json({
                        message: "Department Not Found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /departments/addDepartment:
 *   post:
 *     tags:
 *       - Department
 *     description: Add Department details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Department
 *         description: department object
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
 *           $ref: '#/definitions/Department'
 */
router.post("/addDepartment", [
    // validation rules start 

    check('parentId').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('departmentTitle').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long')

    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let dept = new Dept(req.body);
        dept.organizationIdFK = tokendata.organizationIdFK;

        db.query(dept.addDeptSQL(), (err, data) => {
            if (!err) {
                res.status(200).json({
                    message: "Department added successfully",
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
 * /departments/updateDepartment/{departmentId}:
 *   put:
 *     tags:
 *       - Department
 *     description: Update Department data By Department Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: departmentId
 *         description: Enter Department Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Department Data
 *         description: Department Data from body
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
 *           $ref: '#/definitions/Department'
 */

router.put("/updateDepartment/:departmentId", [
    // validation rules start 

    check('parentId').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('departmentTitle').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long')

    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, tokendata => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var dId = req.params.departmentId;
        let dept = new Dept(req.body);

        db.query(Dept.checkDepartmentId(dId), (err, data) => {
            if (data.length > 0) {
                db.query(dept.updateDeptByIdSQL(dId), (err, data) => {
                    if (!err) {

                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Department updated successfully",
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
                    message: "Department ID is not available"
                });
            }
        });
    });
});

/**
 * @swagger
 * /departments/deleteDepartment/{departmentId}:
 *   put:
 *     tags:
 *       - Department
 *     description: Delete Department data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: departmentId
 *         description: department id
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
router.put("/deleteDepartment/:departmentId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        var dId = req.params.departmentId;

        db.query(Dept.checkDepartmentId(dId), (err, data) => {
            if (data.length > 0) {
                db.query(Dept.deleteDeptByIdSQL(dId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Department deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "Department is not deleted"
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
/**
 * @swagger
 * /departments/selectDepartment:
 *   get:
 *     tags:
 *       - Department
 *     description: API for Select Department From list of Departments
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
router.get("/selectDepartment", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Dept.getDeptSQL(tokendata.organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        department: data,
                        message: "Department List Found",
                    });
                } else {
                    res.status(200).json({
                        message: "Department List Not Found"
                    });
                }
            }
        });
    })
});
module.exports = router;