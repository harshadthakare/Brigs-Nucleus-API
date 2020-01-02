const express = require("express");
const db = require("../db/database");
const User = require("../model/user");
const { check, validationResult } = require('express-validator');
const { verifyToken } = require("../config/verifyJwtToken")
const router = express.Router();

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/UserProfileImage');
    },
    filename: (req, file, cb) => {
        if (file.mimetype === 'image/gif') {
            cb(null, 'image-' + Date.now() + '.gif');
        }
        else if (file.mimetype === 'image/png') {
            cb(null, 'image-' + Date.now() + '.png');
        }
        else if (file.mimetype === 'image/jpeg') {
            cb(null, 'image-' + Date.now() + '.jpeg');
        }
        else if (file.mimetype === 'image/jpg') {
            cb(null, 'image-' + Date.now() + '.jpg');
        }
        else if (file.mimetype === 'image/JPG') {
            cb(null, 'image-' + Date.now() + '.JPG');
        }
        else if (file.mimetype === 'image/JPEG') {
            cb(null, 'image-' + Date.now() + '.JPEG');
        }
        else if (file.mimetype === 'image/PNG') {
            cb(null, 'image-' + Date.now() + '.PNG');
        }
        else {
            return cb(new Error('Only png, jpeg, gif and jpg file types are allowed!'))
        }
    }
});
var upload = multer({ storage: storage });

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *      firstName:
 *         type: string
 *      lastName:
 *         type: string
 *      userRoleIdFK:
 *         type: integer
 *      profileImage:
 *         type: string
 *      departmentIdFK:
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
 * /users/listOfUsers/{departmentId}/{pageNo}:
 *   get:
 *     tags:
 *       - User
 *     description: Returns List Of All Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: departmentId
 *         description: Department Id
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

router.get("/listOfUsers/:departmentId/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let did = req.params.departmentId;

        db.query(User.getAllUserSQL(did), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(User.getAllUserSQL(did, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "users": data,
                                status: true,
                                message: "Users List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "users": [],
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
 * /users/userSearch:
 *   get:
 *     tags:
 *       - User 
 *     description: Returns List of Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: departmentId
 *         description: departmentId
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

router.get("/userSearch/", [
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

        let departmentId = req.query.departmentId;
        let keyword = req.query.keyword;

        db.query(User.getAllUserSearchSQL(departmentId, keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "User found"
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
 * /users/viewParticularUser/{userId}:
 *   get:
 *     tags:
 *       - User
 *     description: returns Single Supplier        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
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

router.get("/viewParticularUser/:userId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let uid = req.params.userId;

        db.query(User.getUserByIdSQL(uid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        message: "User found",
                        users: data[0]
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: "User Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /users/addUser:
 *   post:
 *     tags:
 *       - User
 *     description: Add User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User Data from body and Department id should be start with 1
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
 *           $ref: '#/definitions/User'
 */

router.post("/addUser", [
    // validation rules start 
    check('firstName').trim().isAlpha().withMessage('Only characters are allowed'),
    check('lastName').trim().isAlpha().withMessage('Only characters are allowed'),
    check('profileImage').trim().not().isEmpty().withMessage("Please Add Profile Image"),
    check('departmentIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('userRoleIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('mobileNumber').trim().isInt().isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digit"),
    check('emailId').trim().normalizeEmail().isEmail().withMessage("Enter valid email id"),
    check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long')
    // validation rules end 1
], (req, res, next) => {

    verifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client
        let user = new User(req.body);

        db.query(user.addUserSQL(), (err, data) => {

            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "User added successfully",
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
                    status: false,
                    message: message
                });
            }
        });
    })
});

/**
 * @swagger
 * /users/updateUser/{userId}:
 *   put:
 *     tags:
 *       - User
 *     description: Update User data By User Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: Enter User Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: User
 *         description: User Data from body and Department id should be start with 1
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
 *           $ref: '#/definitions/User'
 */

router.put("/updateUser/:userId", [
    // validation rules start 
    check('firstName').trim().isAlpha().withMessage('Only characters are allowed'),
    check('lastName').trim().isAlpha().withMessage('Only characters are allowed'),
    check('departmentIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('userRoleIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('mobileNumber').trim().isInt().isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digit"),
    check('emailId').trim().normalizeEmail().isEmail().withMessage("Enter valid email id")
    // validation rules end 1
],
    (req, res, next) => {
        verifyToken(req, res, tokendata => {
            // send response of validation to client
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            // ....!  end send response of validation to client
            var uid = req.params.userId;
            let user = new User(req.body);

            db.query(User.checkUserId(uid), (err, data) => {
                if (data.length > 0) {
                    db.query(user.updateUserByIdSQL(uid), (err, data) => {
                        if (!err) {
                            if (data && data.affectedRows > 0) {
                                res.status(200).json({
                                    status: true,
                                    message: "User updated successfully",
                                    affectedRows: data.affectedRows
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
                                    status: false,
                                    message: message
                                });
                            }
                        }
                    });
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "User ID is not available"
                    });
                }
            });
        })
    });

/**
 * @swagger
 * /users/deleteUser/{userId}:
 *   put:
 *     tags:
 *       - User
 *     description: Delete User data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: User id
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

router.put("/deleteUser/:userId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        var uId = req.params.userId;

        db.query(User.checkUserId(uId), (err, data) => {
            if (data.length > 0) {
                db.query(User.getUserAssignedOrNot(uId), (err1, data1) => {
                    if (data1 && data1.length == 0) {
                        db.query(User.deleteUserByIdSQL(uId), (err, data) => {
                            if (!err) {
                                if (data && data.affectedRows > 0) {
                                    res.status(200).json({
                                        status: true,
                                        message: "User Deleted Successfully",
                                        affectedRows: data.affectedRows
                                    });
                                } else {
                                    res.status(200).json({
                                        status: false,
                                        message: "User is not deleted"
                                    });
                                }
                            } else {
                                console.log(err.message);
                            }
                        });
                    } else {
                        res.status(200).json({
                            status: false,
                            message: "Can't delete, User is already assigned!"
                        });
                    }
                });
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

/**
 * @swagger
 * /users/uploadProfileImage:
 *   post:
 *     tags:
 *       - User
 *     description: Upload Profile Image with jpeg/png/gif format 
 *     produces:
 *       - application/json
 *     summary: Uploads a image file.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: Authorization
 *         description: token
 *         in: header
 *         required: true
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload.
 *     responses:
 *       500:
 *         description: Please Select image File
 */

router.post('/uploadProfileImage', upload.single('file'), (req, res, next) => {
    verifyToken(req, res, tokendata => {
        if (!req.file) {
            res.status(200).json({
                message: "Please Select image File",
                status: false
            })
        }
        else {
            let item = {
                ImageName: req.file.filename,
                status: true
            }
            res.json(item);
        }
    })
});

/**
 * @swagger
 * /users/selectUserRole:
 *   get:
 *     tags:
 *       - User
 *     description: API for Select User role From list of User Roles
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
router.get("/selectUserRole", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(User.getUserRoleList(tokendata.organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        userRole: data,
                        status: true,
                        message: "User Role List Found"
                    });
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "User Role List Not Found"
                    });
                }
            }
        })
    })
});

/**
 * @swagger
 * /users/selectUser:
 *   get:
 *     tags:
 *       - User
 *     description: API for Select User From list of Users
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
router.get("/selectUser", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(User.getUsersList(tokendata.organizationIdFK), (err, data) => {

            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        user: data,
                        status: true,
                        message: "User List Found"
                    });
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "User List Not Found"
                    });
                }
            }
        })
    })
});

/**
 * @swagger
 * definitions:
 *   UpdateIsActiveUser:
 *     properties:
 *      isActive:
 *         type: integer
 */

/**
 * @swagger
 * /users/setUserIsActiveStatus/{userId}:
 *   put:
 *     tags:
 *       - User 
 *     description: Changes status of User to Active Or Deactive
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: User Id
 *         in: path
 *         required: true
 *       - name: isActive data From body
 *         description: Enter isActive Status = 0 for Deactivating User And IsActive Status = 1 For Activating User
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
 *           $ref: '#/definitions/UpdateIsActiveUser'
 */

router.put("/setUserIsActiveStatus/:userId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let userId = req.params.userId;
        let isActive = new User(req.body);
        db.query(User.checkUserId(userId), (err, data) => {
            if (data.length > 0) {
                db.query(isActive.updateUserIsActiveStatusSQL(userId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                status: true,
                                message: "User " + (isActive.isActive == 1 ? 'activated' : 'deactivated') + " successfully..!!"
                            });
                        }
                        else {
                            res.status(200).json({
                                status: false,
                                message: "Failed to update User active status..!!"
                            });
                        }
                    }
                    else {
                        console.log(err.message);
                    }
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    message: "User ID is not available"
                });
            }
        });
    })
});

module.exports = router;