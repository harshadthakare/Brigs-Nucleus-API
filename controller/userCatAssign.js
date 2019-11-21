const express = require("express");
const db = require("../db/database");
const UserAssign = require("../model/userCatAssign_model");
const { verifyToken } = require("../config/verifyJwtToken");

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
 * /userCatAssign/listOfAssignedUsersByCategoryId/{categoryId}/{pageNo}:
 *   get:
 *     tags:
 *       - Assigned Users
 *     description: Returns List Of All Assigned Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: "category Id"
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

router.get("/listOfAssignedUsersByCategoryId/:categoryId/:pageNo", (req, res, next) => {

    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let cId = req.params.categoryId;

        db.query(UserAssign.getAllAssignUsersByCategoryIdSQL(cId), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(UserAssign.getAllAssignUsersByCategoryIdSQL(cId, limit, page), (err, data) => {
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
 * /userCatAssign/listOfAssignedUsersByAssetId/{assetId}/{pageNo}:
 *   get:
 *     tags:
 *       - Assigned Users
 *     description: Returns List Of All Assigned Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: assetId
 *         description: "asset Id"
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

router.get("/listOfAssignedUsersByAssetId/:assetId/:pageNo", (req, res, next) => {

    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let aId = req.params.assetId;

        db.query(UserAssign.getAllAssignUsersByAssetIdSQL(aId), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(UserAssign.getAllAssignUsersByAssetIdSQL(aId, limit, page), (err, data) => {
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
 * /userCatAssign/userAssignSearchByCategoryId:
 *   get:
 *     tags:
 *       - Assigned Users  
 *     description: Returns List of Category Assigned Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: category Id
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

router.get("/userAssignSearchByCategoryId/", [
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

        let categoryId = req.query.categoryId;
        let keyword = req.query.keyword;

        db.query(UserAssign.getAllAssignedUsersSearchByCategory(categoryId,keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Assigned User Found"
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
 * /userCatAssign/userAssignSearchByAssetId:
 *   get:
 *     tags:
 *       - Assigned Users  
 *     description: Returns List of Asset Assigned Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: assetId
 *         description: asset Id
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

router.get("/userAssignSearchByAssetId/", [
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

        let assetId = req.query.assetId;
        let keyword = req.query.keyword;

        db.query(UserAssign.getAllAssignedUsersSearchByAsset(assetId,keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Assigned User Found"
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
    verifyToken(req, res, tokendata => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        var users = req.body.users;
        let ucid = new UserAssign(req.body);

        if (users && users.length > 0) {
            for (let index = 0; index < users.length; index++) {
                const element = users[index];
                db.query(ucid.addAssignUserSQL(element.userIdFK), (err, data) => {
                    if (index == users.length - 1 && err) {
                        let message = '';
                        if (err.message.includes('ER_DUP_ENTRY')) {
                            message = 'Assigned User added successfully'
                            res.status(200).json({
                                message: message
                            });
                        }
                    }
                    else {
                        if (index == users.length - 1 && !err) {
                            res.status(200).json({
                                message: "Assigned User added successfully"
                            });
                        }
                    }
                });

            }
        }
        else {
            res.status(400).json({
                status: false,
                message: "Please select at least one user"
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
    verifyToken(req, res, tokendata => {
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
    verifyToken(req, res, tokendata => {

        db.query(UserAssign.getAssignmentTypeList(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        assignmentType: data,
                        message: "Assignment Type List Found"
                    });
                }
                else {
                    res.status(400).json({
                        message: "Assignment Type List Not Found"
                    });
                }
            }
        })
    })
});

module.exports = router;