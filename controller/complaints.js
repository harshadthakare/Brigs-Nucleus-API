const express = require("express");
const db = require("../db/database");
const Complaints = require("../model/complaints_model");
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

var uploadImage = multer({ storage: storage });

/**
 * @swagger
 * definitions:
 *   addComplaint :
 *     properties:
 *      assetIdFK:
 *         type: integer
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
 * /complaints/complaintsList/{pageNo}:
 *   get:
 *     tags:
 *       - Complaint
 *     description: Returns list of all complaints 
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

router.get("/complaintsList/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Complaints.getComplaintCount(), (err2, data2) => {
            let totalComplaints = data2[0].totalComplaints;

            if (data2) {
                db.query(Complaints.getAllComplaintsSQL(), (err1, data1) => {

                    if (data1) {
                        pageCount1 = data1.length;

                        db.query(Complaints.getAllComplaintsSQL(limit, page), (err, data) => {
                            if (!err) {
                                if (data && data.length > 0) {
                                    res.status(200).json({
                                        "currentPage": page,
                                        "totalCount": pageCount1,
                                        "totalComplaints":totalComplaints,
                                        "complaintList": data,
                                        message: "Complaint List found",
                                    });
                                } else {
                                    res.status(200).json({
                                        "currentPage": page,
                                        "totalCount": pageCount1,
                                        "complaintList": [],
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
 * /complaints/complaintSearch:
 *   get:
 *     tags:
 *       - Complaint  
 *     description: Returns List of Complaints
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

router.get("/complaintSearch/",[
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

        db.query(Complaints.getAllComplaintsSearchSQL(keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data:data,
                        message: "Complaint Found"
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
 * /complaints/viewParticularComplaint/{complaintId}:
 *   get:
 *     tags:
 *       - Complaint
 *     description: returns Single Complaint        
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

router.get("/viewParticularComplaint/:complaintId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let cid = req.params.complaintId;

        db.query(Complaints.getParticularComplaintByIdSQL(cid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        message: "Complaint Found",
                        complaint: data
                    });
                } else {
                    res.status(404).json({
                        message: "Complaint Not Found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /complaints/complaintsTrackList/{complaintId}/{pageNo}:
 *   get:
 *     tags:
 *       - Complaint
 *     description: Returns list of all complaints track
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

router.get("/complaintsTrackList/:complaintId/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let cid = req.params.complaintId;

        db.query(Complaints.getComplaintTrackListSQL(cid), (err1, data1) => {

            if (data1) {
                pageCount1 = data1.length;

                db.query(Complaints.getComplaintTrackListSQL(cid, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "complaintTrackList": data,
                                message: "Complaint Track List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "complaintTrackList": [],
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
 * /complaints/complaintTrackSearch:
 *   get:
 *     tags:
 *       - Complaint  
 *     description: Returns List of Complaint Track
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

router.get("/complaintTrackSearch/",[
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

        db.query(Complaints.getComplaintTrackSearch(complaintId,keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data:data,
                        message: "Complaint Track List Found"
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
 * /complaints/addComplaint:
 *   post:
 *     tags:
 *       - Complaint
 *     description: Add Complaint details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Complaint
 *         description: complaint object
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
 *           $ref: '#/definitions/addComplaint'
 */
router.post("/addComplaint", [

    check('assetIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
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
        let complaint = new Complaints(obj);
        let users = req.body.users;
        let user = new Complaints(req.body);
        obj.adminId = tokendata.adminId;

        db.query(complaint.addComplaintSQL(obj.adminId), (err, data) => {

            let complaintIdFK = data.insertId;

            if (!err) {

                if (data) {

                    for (let index = 0; index < users.length; index++) {
                        const element = users[index];

                        db.query(complaint.addComplaintTrackingSQL(complaintIdFK, element.userIdFK), (err1, data2) => {
                            if (!err1) {

                                db.query(user.addResponsiblePersonSQL(complaintIdFK, element.userIdFK), (err, data1) => {
                                    if (index == users.length - 1 && !err) {
                                        if (data1) {
                                            res.status(200).json({
                                                message: "Complaint details added successfully",
                                                status: true,
                                                complaintId: data.insertId
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
 * /complaints/deleteComplaint/{complaintId}:
 *   put:
 *     tags:
 *       - Complaint
 *     description: Delete complaint data
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

router.put("/deleteComplaint/:complaintId", (req, res, next) => {

    verifyToken(req, res, tokendata => {
        var cId = req.params.complaintId;

        db.query(Complaints.deleteResponsiblePersonSQL(cId), (err1, data1) => {
            if (!err1) {
                db.query(Complaints.deleteComplaintTrackSQL(cId), (err2, data2) => {

                    db.query(Complaints.deleteComplaintSQL(cId), (err3, data3) => {
                        if (data3 && data3.affectedRows > 0) {
                            res.status(200).json({
                                message: "Complaint deleted successfully",
                                affectedRows: data3.affectedRows
                            });
                        } else {
                            res.status(200).json({
                                message: "Complaint not deleted"
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
 *   ComplaintStaus :
 *     properties:
 *      complaintStatusIdFK:
 *         type: integer
 */

/**
 * @swagger
 * /complaints/updateComplaintStatus/{complaintId}:
 *   put:
 *     tags:
 *       - Complaint
 *     description: Update Complaint Status By Complaint Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: Enter Complaint Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Complaint Status Data
 *         description: Complaint Status Data from body
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
 *           $ref: '#/definitions/ComplaintStaus'
 */

router.put("/updateComplaintStatus/:complaintId", [
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
        let complaintstatus = new Complaints(req.body);

        db.query(complaintstatus.updateComplaintStatusByIdSQL(cId), (err, data) => {
            if (!err) {

                if (data && data.affectedRows > 0) {
                    res.status(200).json({
                        message: "Complaint status updated successfully",
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
 * /complaints/uploadComplaintImage/{complaintId}:
 *   post:
 *     tags:
 *       - Complaint
 *     description: Upload Complaint Image with jpeg/png/gif format 
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

router.post('/uploadComplaintImage/:complaintId', [
    // validation rules start 
    check('complaintId').trim().not().isEmpty().withMessage("Please Add Complaint Id")
], uploadImage.single('file'), (req, res, next) => {
    verifyToken(req, res, tokendata => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        if (!req.file) {
            res.status(200).json({
                message: "Please Select an image File",
                status: false
            })
        }
        else {
            let item = {
                ImageName: req.file.filename,
                status: true
            }
            var complaintId = req.params.complaintId;
            var complaintImage = req.file.filename;

            db.query(Complaints.addComplaintImageSQL(complaintId, complaintImage), (err, data) => {

                if (!err) {
                    res.status(200).json({
                        message: "Complaint image added successfully",
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
 * /complaints/selectResponsibleUsers/{complaintId}:
 *   get:
 *     tags:
 *       - Complaint
 *     description: API for Selecting Responsible Users list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: complaintId
 *         description: Complaint Id
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

router.get("/selectResponsibleUsers/:complaintId", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        let cid = req.params.complaintId;

        db.query(Complaints.getResponsibleUsersList(cid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        responsibleUsersList: data,
                        message: "Responsible Users List Found"
                    });
                }
                else {
                    res.status(404).json({
                        message: "Responsible Users List Not Found"
                    });
                }
            }
        });
    });
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
                    Id: data.insertId,
                    status: true
                });
            }
            else {
                res.status(400).json({
                    message: "Something went wrong, Please try again",
                    status: false
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
                        message: "Transfer status updated successfully",
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

/**
 * @swagger
 * /complaints/selectTypeofcomplaint:
 *   get:
 *     tags:
 *       - Complaint
 *     description: API for Selecting Type of complaint list
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

router.get("/selectTypeofcomplaint", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Complaints.getTypeOfComplaint(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        typeOfComplaint: data,
                        message: "Type of Complaint List Found"
                    });
                }
                else {
                    res.status(404).json({
                        message: "Type of Complaint List Not Found"
                    });
                }
            }
        });
    });
});

/**
 * @swagger
 * /complaints/selectAssets:
 *   get:
 *     tags:
 *       - Complaint
 *     description: API for Selecting Type of Asset
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

router.get("/selectAssets", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Complaints.getAsset(tokendata.organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        asset: data,
                        message: "Asset List Found"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Asset List Not Found"
                    });
                }
            }
        });
    });
});

/**
 * @swagger
 * /complaints/selectComplaintStatus:
 *   get:
 *     tags:
 *       - Complaint
 *     description: API for Selecting Type of complaint status list
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

router.get("/selectComplaintStatus", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Complaints.getComplaintStatus(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        complaintStatus: data,
                        message: "Complaint Status List Found"
                    });
                }
                else {
                    res.status(404).json({
                        message: "Complaint Status List Not Found"
                    });
                }
            }
        });
    });
});

/**
 * @swagger
 * /complaints/selectTransferStatus:
 *   get:
 *     tags:
 *       - Complaint
 *     description: API for Selecting Type of transfer status list
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

router.get("/selectTransferStatus", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Complaints.getTransferStatus(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        transferStatus: data,
                        message: "Transfer Status List Found"
                    });
                }
                else {
                    res.status(404).json({
                        message: "Transfer Status List Not Found"
                    });
                }
            }
        });
    });
});

/**
 * @swagger
 * /complaints/seletListOfUser:
 *   get:
 *     tags:
 *       - Complaint
 *     description: API for Selecting Users From list
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

router.get("/seletListOfUser", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Complaints.getUsersList(tokendata.organizationIdFK), (err, data) => {

            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        User: data,
                        message: "Users List Found"
                    });
                }
                else {
                    res.status(404).json({
                        message: "Users List Not Found"
                    });
                }
            }
        });
    });
});

module.exports = router;