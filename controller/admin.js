const express = require("express");
const db = require("../db/database");
const Admin = require("../model/admin_model");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { superVerifyToken } = require("../config/superVerifyJwtToken");

/**
 * @swagger
 * /admin/listOfAdmins/{pageNo}:
 *   get:
 *     tags:
 *       - Admin
 *     description: Returns List of All Admins
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pageNo
 *         description: "pageNo is always starts with 0"
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

router.get("/listOfAdmins/:pageNo", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Admin.getAllAdminsSQL(), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;
                db.query(Admin.getAllAdminsSQL(limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "admin": data,
                                message: "Admin List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "admin": [],
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
 * /admin/adminSearch:
 *   get:
 *     tags:
 *       - Admin  
 *     description: Returns List of Admins
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

router.get("/adminSearch/", [
    // validation rules start 
    check('keyword').trim().not().isEmpty().withMessage("Please enter keyword")
], (req, res, next) => {

    superVerifyToken(req, res, tokendata => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let keyword = req.query.keyword;

        db.query(Admin.getAllAdminsSearchSQL(keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Admin Found"
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
 * definitions:
 *   Admin :
 *     properties:
 *      firstName:
 *         type: string
 *      lastName :
 *         type: string
 *      organizationIdFK:
 *         type: integer
 *      mobileNumber:
 *         type: string
 *      emailId:
 *         type: string
 *      password:
 *         type: string
 */

/**
* @swagger
* /admin/addAdmin:
*   post:
*     tags:
*       - Admin
*     description: Adds Admin Details
*     produces:
*       - application/json
*     parameters:
*       - name: Admin 
*         description: admin object
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
*           $ref: '#/definitions/Admin'   
*/

router.post("/addAdmin", [
    // validation rules start 
    check('firstName').trim().isAlpha().withMessage('Only characters are allowed'),
    check('lastName').trim().isAlpha().withMessage('Only characters are allowed'),
    check('organizationIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('mobileNumber').trim().isInt().isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digit"),
    check('emailId').trim().normalizeEmail().isEmail().withMessage("Enter valid email id"),
    check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long')
    // validation rules end 
], (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let admin = new Admin(req.body);

        db.query(admin.addAdminSQL(), (err, data) => {
            if (!err) {
                res.status(200).json({
                    message: "Admin added successfully",
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
 * /admin/updateAdmin/{adminId}:
 *   put:
 *     tags:
 *       - Admin
 *     description: Update Admin data By admin Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: adminId
 *         description: Enter admin Id
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
 *           $ref: '#/definitions/Admin'
 */

router.put("/updateAdmin/:adminId", [
    // validation rules start 
    check('firstName').trim().isAlpha().withMessage('Only characters are allowed'),
    check('lastName').trim().isAlpha().withMessage('Only characters are allowed'),
    check('organizationIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('mobileNumber').trim().isInt().isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digit"),
    check('emailId').trim().normalizeEmail().isEmail().withMessage("Enter valid email id"),
    check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long')
    // validation rules end 
], (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var aId = req.params.adminId;
        let admin = new Admin(req.body);

        db.query(Admin.checkAdminId(aId), (err, data) => {
            if (data.length > 0) {
                db.query(admin.updateAdminSQL(aId), (err, data) => {
                    if (!err) {

                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Admin updated successfully",
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
                    message: "Admin Id is not available"
                });
            }
        });
    })
});

/**
 * @swagger
 * /admin/deleteAdmin/{adminId}:
 *   put:
 *     tags:
 *       - Admin
 *     description: Delete Admin data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: adminId
 *         description: Admin id
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
router.put("/deleteAdmin/:adminId", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        var aId = req.params.adminId;
        db.query(Admin.checkAdminId(aId), (err, data) => {
            if (data.length > 0) {
                db.query(Admin.deleteAdminByIdSQL(aId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Admin deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "Admin is not deleted"
                            });
                        }
                    } else {
                        console.log(err.message);

                    }
                });
            }
            else {
                res.status(400).json({
                    message: "Something Went Wrong,Please Try Again...!"
                });
            }
        });
    })
});

/**
 * @swagger
 * /admin/selectOrganization:
 *   get:
 *     tags:
 *       - Admin
 *     description: returns list of Organizations     
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

router.get("/selectOrganization/", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {

        db.query(Admin.getAllOrganizationListsSQL(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        organization: data,
                        message: "Oraganization List Found"
                    });
                } else {
                    res.status(404).json({
                        message: "Oraganization List Not Found"
                    });
                }
            }
        });
    })
});
module.exports = router;