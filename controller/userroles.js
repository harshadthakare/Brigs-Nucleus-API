const express = require("express");
const db = require("../db/database");
const UserRole = require("../model/UserRole");
const { verifyToken } = require("../config/verifyJwtToken");

const { check, validationResult } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   UserRoles :
 *     properties:
 *      title:
 *         type: string
 */

/**
 * @swagger
 * /userroles/listOfUserRoles/{pageNo}:
 *   get:
 *     tags:
 *       - UserRole
 *     description: Returns List Of All UserRoles
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

router.get("/listOfUserRoles/:pageNo", (req, res, next) => {

    verifyToken(req, res, organizationIdFK => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(UserRole.getAllUserRolesSQL(organizationIdFK), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(UserRole.getAllUserRolesSQL(organizationIdFK, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "userroles": data,
                                message: "UserRoles List Found"
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "userroles": [],
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
 * /userroles/viewParticularUserRole/{userRoleId}:
 *   get:
 *     tags:
 *       - UserRole
 *     description: returns Single UserRoles        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userRoleId
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
 *         schema:
 *          $ref: '#/definitions/UserRoles'   
 */
router.get("/viewParticularUserRole/:userRoleId", (req, res, next) => {
    verifyToken(req, res, adminId => {
        let urid = req.params.userRoleId;


        db.query(UserRole.getUserRoleByIdSQL(urid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        message: "UserRole found",
                        userrole: data[0]
                    });
                } else {
                    res.status(404).json({
                        message: "UserRole Not found"
                    });
                }
            }
        });
    })
});
/**
 * @swagger
 * /userroles/addUserRole:
 *   post:
 *     tags:
 *       - UserRole
 *     description: Add UserRole 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: UserRole
 *         description:  Add Title of UserRole
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
 *           $ref: '#/definitions/UserRoles'
 */

router.post("/addUserRole", [
    // validation rules start 
    check('title').trim().isAlpha().withMessage('Only characters are allowed'),
    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let urid = new UserRole(req.body);
        urid.organizationIdFK = organizationIdFK;

        db.query(urid.addUserRoleSQL(), (err, data) => {
            if (!err) {
                res.status(200).json({
                    message: "UserRole added successfully",
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
 * /userroles/UpdateUserRole/{userRoleId}:
 *   put:
 *     tags:
 *       - UserRole
 *     description: Update UserRole data By userRoleId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userRoleId
 *         description: Enter userRole Id 
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Department Data
 *         description: userRole Data from body
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
 *           $ref: '#/definitions/UserRoles'
 */

router.put("/UpdateUserRole/:userRoleId", [
    // validation rules start 
    check('title').trim().isAlpha().withMessage('Only characters are allowed'),
    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, adminId => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var urId = req.params.userRoleId;
        let userrole = new UserRole(req.body);

        db.query(UserRole.checkUserroleId(urId), (err, data) => {
            if (data.length > 0) {
                db.query(userrole.updateUserRoleByIdSQL(urId), (err, data) => {
                    if (!err) {

                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: `UserRole updated successfully`,
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
                    message: "UserRole ID is not available"
                });
            }
        });
    });
});

/**
 * @swagger
 * /userroles/deleteUserRole/{userRoleId}:
 *   put:
 *     tags:
 *       - UserRole
 *     description: Delete UserRole data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userRoleId
 *         description: UserRole id
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

router.put("/deleteUserRole/:userRoleId", (req, res, next) => {
    verifyToken(req, res, adminId => {
        var urId = req.params.userRoleId;
        db.query(UserRole.checkUserroleId(urId), (err, data) => {
            if (data.length > 0) {
                db.query(UserRole.deleteUserRoleByIdSQL(urId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "User role deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "User role is not deleted"
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