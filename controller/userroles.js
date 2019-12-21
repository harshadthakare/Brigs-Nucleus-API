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

    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(UserRole.getAllUserRolesSQL(tokendata.organizationIdFK), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(UserRole.getAllUserRolesSQL(tokendata.organizationIdFK, limit, page), (err, data) => {
                    if (!err) {
                        if (!err && data && data.length > 0) {
                            for (let index = 0; index < data.length; index++) {
                                const element = data[index];
                                db.query(UserRole.getAllFeatureListArraySQL(element.userRoleId), (err2, data2) => {

                                    element.features = data2;
                                    data[index] = element;

                                    if (index == data.length - 1 && !err2) {
                                        if (data && data.length > 0) {
                                            setTimeout(function () {
                                                res.status(200).json({
                                                    status: true,
                                                    "currentPage": page,
                                                    "totalCount": pageCount1,
                                                    "userroles": data,
                                                    message: "UserRoles List Found"
                                                });
                                            }, 100)

                                        } else {
                                            res.status(200).json({
                                                "currentPage": page,
                                                "totalCount": pageCount1,
                                                "userroles": [],
                                                status: true,
                                                message: "No record found"
                                            });
                                        }
                                    }
                                })
                            }
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "userroles": [],
                                status: true,
                                message: "No record found"
                            });
                        }
                    }
                });
            }
            else {
                res.status(200).json({
                    status: false,
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
    verifyToken(req, res, tokendata => {
        let urid = req.params.userRoleId;


        db.query(UserRole.getUserRoleByIdSQL(urid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        status: true,
                        message: "UserRole found",
                        userrole: data[0]
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: "UserRole Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /userroles/listOfFeatures:
 *   get:
 *     tags:
 *       - UserRole
 *     description: Returns List Of All Features
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
router.get("/listOfFeatures", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(UserRole.getAllFeatureListSQL(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        status: true,
                        message: "Feature List found",
                        features: data
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: "Feature List Not found"
                    });
                }
            }
        });
    })
});
/**
 * @swagger
 * definitions:
 *   addUserRoles :
 *     properties:
 *      title:
 *         type: string
 *      features:        
 *         type: array
 *         items: 
 *           $ref: '#/definitions/addFeatures'
 */

/**
 * @swagger
 * definitions:
 *   addFeatures :
 *     type: object
 *     properties:
 *       featureIdFK:
 *           type: integer 
 */
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
 *         description: UserRole object from body
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
 *           $ref: '#/definitions/addUserRoles'
 */
router.post("/addUserRole", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        let urid = new UserRole(req.body);
        urid.organizationIdFK = tokendata.organizationIdFK;
        let features = req.body.features;
        db.query(urid.addUserRoleSQL(), (err, data) => {
            if (data) {
                userRoleIdFK = data.insertId;
                if (!err) {
                    if (features.length > 0) {
                        for (let index = 0; index < features.length; index++) {
                            const element = features[index];
                            let feature = new UserRole(element);

                            db.query(feature.addFeatureAssignmentSQL(userRoleIdFK), (err1, data1) => {
                                if (index == features.length - 1 && !err) {
                                    if (data1) {
                                        res.status(200).json({
                                            status: true,
                                            message: "User Role added successfully"
                                        });
                                    }
                                }
                                if (err) {
                                    res.status(200).json({
                                        status: false,
                                        message: err.message
                                    });
                                    return;
                                }
                            })
                        }
                    } else {
                        res.status(200).json({
                            status: true,
                            message: "User Role added successfully"
                        });
                    }
                }
            } else {
                res.status(200).json({
                    status: false,
                    message: "Something Went Wrong Please Try Again"
                });
            }
        });
    })
});
/**
 * @swagger
 * /userroles/listOfFeatures:
 *   get:
 *     tags:
 *       - UserRole
 *     description: Returns List Of All Features
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
router.get("/listOfFeatures", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(UserRole.getAllFeatureListSQL(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        status: true,
                        message: "Feature List found",
                        features: data
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: "Feature List Not found"
                    });
                }
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
 *           $ref: '#/definitions/addUserRoles'
 */
router.put("/updateUserRole/:userRoleId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let userRoleId = req.params.userRoleId;
        let userrole = new UserRole(req.body);
        let features = req.body.features;
        db.query(userrole.updateUserRoleByIdSQL(userRoleId), (err, data) => {
            if (data) {
                if (!err) {
                    db.query(UserRole.deleteFeatureAssignmentSQL(userRoleId), (err1, data1) => {
                        if (features.length > 0) {
                            for (let index = 0; index < features.length; index++) {
                                const element = features[index];
                                let feature = new UserRole(element);

                                db.query(feature.addFeatureAssignmentSQL(userRoleId), (err2, data2) => {
                                    if (index == features.length - 1 && !err2) {
                                        if (data2) {
                                            res.status(200).json({
                                                status: true,
                                                message: "User Role Updated successfully"
                                            });
                                        }
                                    }
                                })
                            }
                        } else {
                            res.status(200).json({
                                status: false,
                                message: "User Role not updated"
                            });
                        }
                    })
                }
            } else {
                res.status(200).json({
                    status: false,
                    message: "Something Went Wrong Please Try Again"
                });
            }
        })
    })
})
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
    verifyToken(req, res, tokendata => {
        var urId = req.params.userRoleId;
        db.query(UserRole.checkUserroleId(urId), (err, data) => {
            if (data.length > 0) {
                db.query(UserRole.getUserroleAssignedOrNot(urId), (err2, data2) => {
                    if (data2 && data2.length == 0) {
                        db.query(UserRole.deleteUserRoleByIdSQL(urId), (err, data) => {
                            if (!err) {
                                db.query(UserRole.deleteFeatureAssignmentSQL(urId), (err1, data1) => {
                                    if (data1 && data1.affectedRows > 0) {
                                        res.status(200).json({
                                            status: true,
                                            message: "User Role deleted successfully",
                                            affectedRows: data1.affectedRows
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: false,
                                            message: "User Role is not deleted"
                                        });
                                    }
                                })

                            } else {
                                console.log(err.message);
                            }
                        });
                    }
                    else {
                        res.status(200).json({
                            status: false,
                            message: "Can't delete, User Role is already assigned!"
                        });
                    }
                })
            }
            else {
                res.status(200).json({
                    status: false,
                    message: "Already deleted"
                });
            }
        });
    })
});

module.exports = router;