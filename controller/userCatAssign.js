import express from "express";
import db from "../db/database";

import UserAssign from "../model/userCatAssign_model";
import { verifyToken } from "../config/verifyJwtToken";

const { check, validationResult } = require('express-validator');

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   AssignedUser :
 *     properties:
 *      assignmentTypeIdFK:
 *         type: integer
 *      masterIdFK:
 *         type: integer
 *      users:
 *         type: array
 *         items: 
 *           $ref: '#/definitions/userIdFK'
 */

/**
 * @swagger
 * definitions:
 *   userIdFK :
 *     type: object
 *     properties:
 *      userIdFK:
 *         type: integer
 *     required:
 *      - userIdFK
 */ 

/**
 * @swagger
 * /userCatAssign/listOfAssignedUsers/{pageNo}:
 *   get:
 *     tags:
 *       - Assigned Users
 *     description: Returns List Of All Assigned Users
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

router.get("/listOfAssignedUsers/:pageNo", (req, res, next) => {

    verifyToken(req, res, organizationIdFK => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(UserAssign.getAllAssignUsersSQL(), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(UserAssign.getAllAssignUsersSQL(limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "assignedUsers": data,
                                message: "Assigned Users List Found"
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "assignedUsers": [],
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
 * /userCatAssign/addAssignUser:
 *   post:
 *     tags:
 *       - Assigned Users
 *     description: Add Assigned User 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: AssignedUser
 *         description:  Add Assigned Users
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
 *           $ref: '#/definitions/AssignedUser'
 */

router.post("/addAssignUser", [
    // validation rules start 
    check('users.*.userIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('assignmentTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('masterIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, adminId => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        var users = req.body.users;
        let ucid = new UserAssign(req.body);

        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            db.query(ucid.addAssignUserSQL(element.userIdFK), (err, data) => {
                if(index == users.length-1 && !err){
                    res.status(200).json({
                        message: "Assigned User added successfully"
                    });
                }
                if(err){
                    res.status(400).json({
                        message: err.message
                    });
                    return;
                }
            }); 
        }
    })
});

/**
 * @swagger
 * /userCatAssign/deleteAssignedUser/{userCatAssignmentId}:
 *   put:
 *     tags:
 *       - Assigned Users
 *     description: Delete Assigned User data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userCatAssignmentId
 *         description: User Cat Assignment id
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

router.put("/deleteAssignedUser/:userCatAssignmentId", (req, res, next) => {
    verifyToken(req, res, adminId => {
        var ucId = req.params.userCatAssignmentId;

        db.query(UserAssign.checkAssignUserId(ucId), (err, data) => {
            if (data.length > 0) {
                db.query(UserAssign.deleteAssignedUserByIdSQL(ucId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Assigned User deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "Assigned User is not deleted"
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
 * /userCatAssign/selectAssignmentType:
 *   get:
 *     tags:
 *       - Assigned Users
 *     description: API for Select Assignment Type From list of Assignment Types
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
router.get("/selectAssignmentType", (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {

        db.query(UserAssign.getAssignmentTypeList(), (err, data) => {
            if(!err){
                if(data && data.length > 0){
                    res.status(200).json({
                        assignmentType: data,
                        message: "Assignment Type List Found"
                    });
                }
                else{
                    res.status(400).json({
                        message:"Assignment Type List Not Found"
                    });
                }
            }
        })
    })
});

module.exports = router;