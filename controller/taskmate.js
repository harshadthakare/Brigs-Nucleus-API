const express = require("express");
const db = require("../db/database");
const Taskmate = require("../model/taskmate_model");
const { verifyToken } = require("../config/verifyJwtToken")
const { check, validationResult } = require('express-validator');
const router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/complaintImage');
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

var uploadImage1 = multer({ storage: storage });

/**
 * @swagger
 * definitions:
 *   addTaskmate :
 *     properties:
 *      title:
 *         type: string
 *      message:
 *         type: string
 *      users:        
 *         type: array
 *         items: 
 *           $ref: '#/definitions/addUsers'
 */
/**
 * @swagger
 * definitions:
 *   addUsers :
 *     type: object
 *     properties:
 *        userIdFK:
 *              type: integer 
 */

/**
 * @swagger
 * /taskmate/taskmateList/{pageNo}:
 *   get:
 *     tags:
 *       - Taskmate
 *     description: Returns list of all taskmates 
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

router.get("/taskmateList/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Taskmate.getTaskCount(), (err2, data2) => {
            let totalTasks = data2[0].totalTasks;

            if (data2) {
                db.query(Taskmate.getAllTasksSQL(), (err1, data1) => {

                    if (data1) {
                        pageCount1 = data1.length;

                        db.query(Taskmate.getAllTasksSQL(limit, page), (err, data) => {
                            if (!err) {
                                if (data && data.length > 0) {
                                    res.status(200).json({
                                        "currentPage": page,
                                        "totalCount": pageCount1,
                                        "totalTasks":totalTasks,
                                        "tasksList": data,
                                        message: "Task List found",
                                    });
                                } else {
                                    res.status(200).json({
                                        "currentPage": page,
                                        "totalCount": pageCount1,
                                        "tasksList": [],
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
            }
            else {
                res.status(400).json({
                    message: "Something went wrong...!!"
                });
            }
        })
    })
});

/**
 * @swagger
 * /taskmate/taskSearch:
 *   get:
 *     tags:
 *       - Taskmate  
 *     description: Returns List of Tasks
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

router.get("/taskSearch/",[
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

        let keyword = req.query.keyword;

        db.query(Taskmate.getAllTasksSearchSQL(keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data:data,
                        message: "Task Found"
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
 * /taskmate/viewParticularTask/{complaintId}:
 *   get:
 *     tags:
 *       - Taskmate
 *     description: returns Single Task        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: complaintId
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

router.get("/viewParticularTask/:complaintId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let cid = req.params.complaintId;

        db.query(Taskmate.getParticularTaskByIdSQL(cid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        message: "Task Found",
                        task: data
                    });
                } else {
                    res.status(404).json({
                        message: "Task Not Found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /taskmate/tasksTrackList/{complaintId}/{pageNo}:
 *   get:
 *     tags:
 *       - Taskmate
 *     description: Returns list of all tasks track
 *     produces:    
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: "complaint Id"
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

router.get("/tasksTrackList/:complaintId/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let cid = req.params.complaintId;

        db.query(Taskmate.getTaskTrackListSQL(cid), (err1, data1) => {

            if (data1) {
                pageCount1 = data1.length;

                db.query(Taskmate.getTaskTrackListSQL(cid, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "taskTrackList": data,
                                message: "Task Track List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "taskTrackList": [],
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
 * /taskmate/taskTrackSearch:
 *   get:
 *     tags:
 *       - Taskmate  
 *     description: Returns List of Task Track
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: complaint Id
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

router.get("/taskTrackSearch/",[
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

        let complaintId = req.query.complaintId;
        let keyword = req.query.keyword;

        db.query(Taskmate.getTaskTrackSearch(complaintId,keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data:data,
                        message: "Task Track List Found"
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
 * /taskmate/addTaskmate:
 *   post:
 *     tags:
 *       - Taskmate
 *     description: Add Taskmate details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Taskmate
 *         description: taskmate object
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
 *           $ref: '#/definitions/addTaskmate'
 */
router.post("/addTaskmate", [

    check('title').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long and characters'),
    check('message').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long and characters'),
    check('users.*.userIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    // Indicates the success of this synchronous custom validator
], (req, res, next) => {
    verifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client
        let obj = req.body;
        let taskmate = new Taskmate(obj);
        let users = req.body.users;
        let user = new Taskmate(req.body);
        obj.adminId = tokendata.adminId;

        db.query(taskmate.addTaskSQL(obj.adminId), (err, data) => {

            let complaintIdFK = data.insertId;

            if (!err) {

                if (data) {

                    for (let index = 0; index < users.length; index++) {
                        const element = users[index];

                        db.query(taskmate.addTaskTrackingSQL(complaintIdFK, element.userIdFK), (err1, data2) => {
                            if (!err1) {

                                db.query(user.addResponsiblePersonSQL(complaintIdFK, element.userIdFK), (err, data1) => {
                                    if (index == users.length - 1 && !err) {
                                        if (data1) {
                                            res.status(200).json({
                                                message: "Taskmate details added successfully"
                                            });
                                        }
                                    }
                                    if (err) {
                                        res.status(400).json({
                                            message: err.message
                                        });
                                        return;
                                    }
                                });
                            }
                            else {
                                res.status(400).json({
                                    message: "Something Went Wrong Please Try Again"
                                });
                            }
                        })
                    }
                }
            }
            else {
                res.status(400).json({
                    message: "Something Went Wrong Please Try Again"
                });
            }
        });
    })
});

/**
 * @swagger
 * /taskmate/deleteTaskmate/{complaintId}:
 *   put:
 *     tags:
 *       - Taskmate
 *     description: Delete taskmate data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: complaint id
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

router.put("/deleteTaskmate/:complaintId", (req, res, next) => {

    verifyToken(req, res, tokendata => {
        var cId = req.params.complaintId;

        db.query(Taskmate.deleteResponsiblePersonSQL(cId), (err1, data1) => {
            if (!err1) {
                db.query(Taskmate.deleteTaskTrackSQL(cId), (err2, data2) => {

                    db.query(Taskmate.deleteComplaintSQL(cId), (err3, data3) => {
                        if (data3 && data3.affectedRows > 0) {
                            res.status(200).json({
                                message: "Task deleted successfully",
                                affectedRows: data3.affectedRows
                            });
                        } else {
                            res.status(200).json({
                                message: "Task not deleted"
                            });
                        }

                    })

                })
            }
        })
    })
});

/**
 * @swagger
 * definitions:
 *   TaskStaus :
 *     properties:
 *      complaintStatusIdFK:
 *         type: integer
 */

/**
 * @swagger
 * /taskmate/updateTaskStatus/{complaintId}:
 *   put:
 *     tags:
 *       - Taskmate
 *     description: Update Task Status By Complaint Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: Enter Complaint Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Task Status Data
 *         description: Task Status Data from body
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
 *           $ref: '#/definitions/TaskStaus'
 */

router.put("/updateTaskStatus/:complaintId", [
    // validation rules start 

    check('complaintStatusIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, tokendata => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var cId = req.params.complaintId;
        let taskstatus = new Taskmate(req.body);

        db.query(taskstatus.updateTaskStatusByIdSQL(cId), (err, data) => {
            if (!err) {

                if (data && data.affectedRows > 0) {
                    res.status(200).json({
                        message: "Task status updated successfully",
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
    });
});

/**
 * @swagger
 * /taskmate/uploadTaskmateImage/{complaintId}:
 *   post:
 *     tags:
 *       - Taskmate
 *     description: Upload Taskmate Image with jpeg/png/gif format 
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
 *       - name: complaintId
 *         description: complaintId on which you want to upload image
 *         in: path
 *         required: true
 *       - in: formData
 *         name: file
 *         type: file
 *         description: Select the file to upload.
 *     responses:
 *       500:
 *         description: Please Select image File
 */

router.post('/uploadTaskmateImage/:complaintId', [
    // validation rules start 
    check('complaintId').trim().not().isEmpty().withMessage("Please Add Complaint Id")
], uploadImage1.single('file'), (req, res, next) => {
    verifyToken(req, res, tokendata => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        if (!req.file) {
            res.status(500).json({
                message: "Please Select an image File",
            })
        }
        else {
            let item = {
                ImageName: req.file.filename
            }
            var complaintId = req.params.complaintId;
            var complaintImage = req.file.filename;

            db.query(Taskmate.addTaskmateImageSQL(complaintId, complaintImage), (err, data) => {

                if (!err) {
                    res.status(200).json({
                        message: "Taskmate image added successfully",
                        Id: data.insertId
                    });
                }
                else {
                    res.status(400).json({
                        message: "Something went wrong, Please try again"
                    });
                }
            });
        }
    })
});

/**
 * @swagger
 * /complaints/transferComplaintsList/{complaintId}/{pageNo}:
 *   get:
 *     tags:
 *       - Complaint
 *     description: Returns list of all transfer complaints
 *     produces:    
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: "complaint Id"
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

router.get("/transferComplaintsList/:complaintId/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let cid = req.params.complaintId;

        db.query(Complaints.getTransferComplaintListSQL(cid), (err1, data1) => {

            if (data1) {
                pageCount1 = data1.length;

                db.query(Complaints.getTransferComplaintListSQL(cid, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "transferComplaintList": data,
                                message: "Transfer Complaint List Found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "transferComplaintList": [],
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
 * /complaints/complaintTransferSearch:
 *   get:
 *     tags:
 *       - Complaint  
 *     description: Returns List of Complaint Transfer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: complaint Id
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

router.get("/complaintTransferSearch/",[
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

        let complaintId = req.query.complaintId;
        let keyword = req.query.keyword;

        db.query(Complaints.getComplaintTransferSearch(complaintId,keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data:data,
                        message: "Complaint Transfer List Found"
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
 *   TransferComplaint :
 *     properties:
 *       fromUserIdFK :
 *                  type: integer
 *       toUserIdFK :
 *                 type: integer
 */

/**
 * @swagger
 * /complaints/addTransferComplaint/{complaintId}:
 *   post:
 *     tags:
 *       - Complaint
 *     description: Add Transfer Complaint  
 *     produces:
 *       - application/json
 *     summary: add transfer complaint.
 *     parameters:
 *       - name: Authorization
 *         description: token
 *         in: header
 *         required: true
 *       - name: complaintId
 *         description: complaint id
 *         in: path
 *         required: true
 *       - name: Transfer Complaint Data
 *         description: Transfer Complaint Data from body
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/TransferComplaint'
 */

router.post('/addTransferComplaint/:complaintId', [
    // validation rules start 
    check('fromUserIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('toUserIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    // validation rules end
], (req, res, next) => {
    verifyToken(req, res, tokendata => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let obj = req.body;
        let transfer = new Complaints(obj);
        var complaintId = req.params.complaintId;

        db.query(transfer.addTransferComplaintSQL(complaintId), (err, data) => {

            if (!err) {
                res.status(200).json({
                    message: "Transfer Complaint added successfully",
                    Id: data.insertId
                });
            }
            else {
                res.status(400).json({
                    message: "Something went wrong, Please try again"
                });
            }
        });
    })
});

/**
 * @swagger
 * definitions:
 *   TransferStaus :
 *     properties:
 *      transferStatusIdFK:
 *         type: integer
 */

/**
 * @swagger
 * /complaints/updatTransferStatus/{complaintId}:
 *   put:
 *     tags:
 *       - Complaint
 *     description: Update Transfer Status By Complaint Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: Enter Complaint Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Transfer Status Data
 *         description: Transfer Status Data from body
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
 *           $ref: '#/definitions/TransferStaus'
 */

router.put("/updatTransferStatus/:complaintId", [
    // validation rules start 

    check('transferStatusIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, tokendata => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var cId = req.params.complaintId;
        let transferstatus = new Complaints(req.body);

        db.query(transferstatus.updateTransferStatusByIdSQL(cId), (err, data) => {
            if (!err) {

                if (data && data.affectedRows > 0) {
                    res.status(200).json({
                        message: `Transfer status updated successfully`,
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
    });
});

/**
 * @swagger
 * /complaints/deleteTransferComplaint/{complaintId}:
 *   put:
 *     tags:
 *       - Complaint
 *     description: Delete Transfer Complaint data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: Complaint id
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

router.put("/deleteTransferComplaint/:complaintId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        var cId = req.params.complaintId;

        db.query(Complaints.deleteTransferComplaintByIdSQL(cId), (err, data) => {
            if (!err) {
                if (data && data.affectedRows > 0) {
                    res.status(200).json({
                        message: "Transfer Complaint deleted successfully",
                        affectedRows: data.affectedRows
                    });
                }
                else {
                    res.status(400).json({
                        message: "Transfer Complaint is not deleted"
                    });
                }
            }
            else {
                console.log(err.message);
            }
        });
    })
});

module.exports = router;