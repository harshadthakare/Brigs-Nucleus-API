const express = require("express");
const db = require("../db/database");
const Asset = require("../model/asset");
const { verifyToken } = require("../config/verifyJwtToken");
const { check, validationResult } = require('express-validator');
const router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/AssetImage');
    },
    filename: (req, file, cb) => {
        if (file.mimetype === 'image/gif') {
            cb(null, 'image-' + Date.now() + '.gif');
        }
        else if (file.mimetype === 'image/gif') {
            cb(null, 'image-' + Date.now() + '.GIF');
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

var storage1 = multer.diskStorage({
    destination: function (req, file, cb1) {
        cb1(null, './uploads/UserGuide');
    },
    filename: function (req, file, cb1) {
        if (file.mimetype === 'application/pdf') {
            cb1(null, 'document-' + Date.now() + '.pdf');
        }
        else if (file.mimetype === 'application/pdf') {
            cb1(null, 'document-' + Date.now() + '.PDF');
        }
        else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb1(null, 'document-' + Date.now() + '.docx');
        }
        else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb1(null, 'document-' + Date.now() + '.DOCX');
        }
        else if (file.mimetype === 'application/msword') {
            cb1(null, 'document-' + Date.now() + '.doc');
        }
        else if (file.mimetype === 'application/msword') {
            cb1(null, 'document-' + Date.now() + '.DOC');
        }
        else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            cb1(null, 'document-' + Date.now() + '.xlsx')
        }
        else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            cb1(null, 'document-' + Date.now() + '.XLSX')
        }
        else if (file.mimetype === 'application/vnd.ms-excel') {
            cb1(null, 'document-' + Date.now() + '.xls')
        }
        else if (file.mimetype === 'application/vnd.ms-excel') {
            cb1(null, 'document-' + Date.now() + '.XLS')
        }
        else {
            return cb1(new Error('Only pdf, doc or docx, xls or xlsx file types are allowed!'))
        }
    }
});
var uploadDoc = multer({ storage: storage1 })

/**
 * @swagger
 *  definitions:
 *   Asset: 
 *    properties:
 *       assetTitle:
 *           type: string
 *       modelNumber:
 *           type: string
 *       companyAssetNo:
 *           type: string
 *       description:
 *           type: string
 *       image:                      
 *           type: string
 *       installationDate:             
 *           type: string
 *       installationLocationTypeIdFK:
 *           type: integer
 *       categoryIdFK:
 *           type: string
 *       installedLocation: 
 *           type: string
 *       userGuideBook:
 *           type: string
 *       checkingDuration:         
 *           type: integer
 *       durationTypeIdFK:           
 *           type: integer
 *       warrenty:                  
 *           type: integer
 *       warrantyDurationTypeIdFK:     
 *           type: integer
 *       supplierIdFK:                
 *           type: integer
 *       departmentIdFK:              
 *           type: integer
 *       manufacturerIdFK:  
 *           type: integer         
 */

/**
 * @swagger
 * /assets/AssetList/{categoryId}/{pageNo}:
 *   get:
 *     tags:
 *       - Asset 
 *     description: Returns List of Assets
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: "Category Id starts with 1"
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

router.get("/AssetList/:categoryId/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let categoryId = req.params.categoryId;

        db.query(Asset.getAllAssetSQL(tokendata.organizationIdFK, categoryId), (err1, data1) => {

            if (data1) {
                pageCount1 = data1.length;

                db.query(Asset.getAllAssetSQL(tokendata.organizationIdFK, categoryId, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "asset": data,
                                message: "Asset List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "asset": [],
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
 * /assets/AssetSearch:
 *   get:
 *     tags:
 *       - Asset 
 *     description: Returns List of Assets
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: categoryId
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

router.get("/AssetSearch/", [
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

        db.query(Asset.getAllAssetSearchSQL(tokendata.organizationIdFK, categoryId, keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Asset found"
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
 * /assets/assetHistory/{assetIdFK}/{pageNo}:
 *   get:
 *     tags:
 *       - Asset 
 *     description: Returns List of Asset History
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: assetIdFK
 *         description: "Asset Id starts with 1"
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

router.get("/assetHistory/:assetIdFK/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let assetIdFK = req.params.assetIdFK;

        db.query(Asset.getAssetHistorySQL(assetIdFK), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(Asset.getAssetHistorySQL(assetIdFK, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "assetHistory": data,
                                message: "Asset History found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "assetHistory": [],
                                message: "No record found"
                            });
                        }
                    }
                });
            } else {
                res.status(400).json({
                    message: "Something went wrong...!!"
                });
            }
        })
    })
});

/**
 * @swagger
 * /assets/questionAnswer/{doneChecklistIdFK}/{pageNo}:
 *   get:
 *     tags:
 *       - Asset 
 *     description: Returns List of Question Answers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: doneChecklistIdFK
 *         description: "Done ChecklistId starts with 1"
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

router.get("/questionAnswer/:doneChecklistIdFK/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let doneChecklistIdFK = req.params.doneChecklistIdFK;

        db.query(Asset.getQuestionAnswerSQL(doneChecklistIdFK), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(Asset.getQuestionAnswerSQL(doneChecklistIdFK, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "questionAnswer": data,
                                message: "Question Answers List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "questionAnswer": [],
                                message: "No record found"
                            });
                        }
                    }
                });
            } else {
                res.status(400).json({
                    message: "Something went wrong...!!"
                });
            }
        })
    })
});

/**
 * @swagger
 * /assets/viewParticularAsset/{assetId}:
 *   get:
 *     tags:
 *       - Asset
 *     description: returns Single Department        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: assetId
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
router.get("/viewParticularAsset/:assetId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let uid = req.params.assetId;

        db.query(Asset.getAssetByIdSQL(uid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        asset: data[0],
                        message: "Asset found",
                    });
                } else {
                    res.status(404).json({
                        message: "Asset Not found"
                    });
                }
            }
        });
    })
});

/**
         * @swagger
         * /assets/addAsset:
         *   post:
         *     tags:
         *       - Asset
         *     description: Add Asset data
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: asset
         *         description: asset object
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
         *           $ref: '#/definitions/Asset'
         */

router.post("/addAsset", [
    // validation rules start 
    check('assetTitle').trim().not().isEmpty().withMessage("Please Add Asset Title"),
    check('modelNumber').trim().not().isEmpty().withMessage("Please Add Model Number"),
    check('image').trim().not().isEmpty().withMessage("Please Add Asset Image"),
    check('installationDate').trim().not().isEmpty().withMessage("Please Add Installation Date"),
    check('installationLocationTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('userGuideBook').trim().not().isEmpty().withMessage("Please Add User Guide Book"),
    check('checkingDuration').trim().isInt().isLength({ min: 1 }).withMessage("Should be minimum 1"),
    check('durationTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('warrenty').trim().isInt().isLength({ min: 1 }).withMessage("Should be minimum 1"),
    check('categoryIdFK').trim().not().isEmpty().withMessage("Please Select Category").custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('warrantyDurationTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('supplierIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('departmentIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('manufacturerIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
], (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let obj = req.body;
        db.query(Asset.getOrganizationCodeById(tokendata.organizationIdFK), (err1, data1) => {

            var organizationCode = data1[0].organizationCode;
            let assetCode = organizationCode + new Date().getTime()
            obj.assetCode = assetCode;
            obj.organizationIdFK = tokendata.organizationIdFK;
            let asset = new Asset(obj);

            db.query(asset.addAssetSQL(), (err, data) => {

                if (!err) {
                    let assetID = data.insertId

                    db.query(asset.addAssetCatRelation(assetID, obj.categoryIdFK), (err, data) => {
                        res.status(200).json({
                            status: true,
                            message: "Asset added successfully",
                            Id: assetID
                        });
                    })
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "Something went wrong, Please try again"
                    });
                }
            });
        });
    })
});

/**
 * @swagger
 *  definitions:
 *   updateAsset: 
 *    properties:
 *       assetTitle:
 *           type: string
 *       modelNumber:
 *           type: string
 *       companyAssetNo:
 *           type: string
 *       description:
 *           type: string
 *       image:                      
 *           type: string
 *       installationDate:             
 *           type: string
 *       installationLocationTypeIdFK:
 *           type: integer
 *       categoryIdFK:
 *           type: string
 *       installedLocation: 
 *           type: string
 *       userGuideBook:
 *           type: string
 *       checkingDuration:         
 *           type: integer
 *       durationTypeIdFK:           
 *           type: integer
 *       warrenty:                  
 *           type: integer
 *       warrantyDurationTypeIdFK:     
 *           type: integer
 *       supplierIdFK:                
 *           type: integer
 *       departmentIdFK:              
 *           type: integer
 *       manufacturerIdFK:  
 *           type: integer         
 */
/**
/**
 * @swagger
 * /assets/upadateAsset/{assetId}:
 *   put:
 *     tags:
 *       - Asset
 *     description: Update Asset data By Asset Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: assetId
 *         description: Enter Asset Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Asset Data
 *         description: Asset Data from body
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
 *           $ref: '#/definitions/updateAsset'
 */

router.put("/upadateAsset/:assetId", [
    // validation rules start 
    check('assetTitle').trim().not().isEmpty().withMessage("Please Add Asset Title"),
    check('modelNumber').trim().not().isEmpty().withMessage("Please Add Model Number"),
    check('image').trim().not().isEmpty().withMessage("Please Add Asset Image"),
    check('installationDate').trim().not().isEmpty().withMessage("Please Add Installation Date"),
    check('installationLocationTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('userGuideBook').trim().not().isEmpty().withMessage("Please Add User Guide Book"),
    check('checkingDuration').trim().isInt().isLength({ min: 1 }).withMessage("Should be minimum 1"),
    check('durationTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('warrenty').trim().isInt().isLength({ min: 1 }).withMessage("Should be minimum 1"),
    check('categoryIdFK').trim().not().isEmpty().withMessage("Please Select Category").custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('warrantyDurationTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('supplierIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('departmentIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('manufacturerIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
], (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        var assetId = req.params.assetId;
        let asset = new Asset(req.body);

        db.query(Asset.checkAssetById(assetId), (err, data) => {
            if (data.length > 0) {
                db.query(asset.updateAssetByIdSQL(assetId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            db.query(asset.updateAssetCatRelation(assetId, asset.categoryIdFK), (err, data) => {
                                if (!err) {
                                    if (data && data.affectedRows > 0) {
                                        res.status(200).json({
                                            status: true,
                                            message: "Asset updated successfully",
                                            affectedRows: data.affectedRows
                                        });
                                    }
                                }
                                else {
                                    res.status(200).json({
                                        status: false,
                                        message: "Something went wrong, Please try again"
                                    });
                                }
                            })
                        }
                        else {
                            res.status(200).json({
                                status: false,
                                message: "Something went wrong, Please try again"
                            });
                        }
                    } else {
                        console.log(err.message);
                    }
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    message: "Asset ID is not available"
                });
            }
        })
    })
});

/**
 * @swagger
 * /assets/deleteAsset/{assetId}:
 *   put:
 *     tags:
 *       - Asset
 *     description: Delete Asset data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: assetId
 *         description: Asset id
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

router.put("/deleteAsset/:assetId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        var aId = req.params.assetId;

        db.query(Asset.checkAssetById(aId), (err, data) => {
            if (data.length > 0) {
                db.query(Asset.deleteAssetByIdSQL(aId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Asset deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        }
                        else {
                            res.status(400).json({
                                message: "Asset is not deleted"
                            });
                        }
                    }
                    else {
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
 * /assets/uploadAssetImage:
 *   post:
 *     tags:
 *       - Asset
 *     description: Upload Asset Image with jpeg/png/gif format 
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
 *         description: Select the file to upload.
 *     responses:
 *       500:
 *         description: Please Select image File
 */

router.post('/uploadAssetImage', uploadImage.single('file'), (req, res, next) => {
    verifyToken(req, res, tokendata => {
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
            res.json(item);
        }
    })
});

/**
 * @swagger
 * /assets/uploadAssetDoc:
 *   post:
 *     tags:
 *       - Asset
 *     description: Upload User guide book with pdf format 
 *     produces:
 *       - application/json
 *     summary: Uploads a pdf file.
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
 *         description: Select the file to upload.
 *     responses:
 *       500:
 *         description: Please Select the File
 */
router.post('/uploadAssetDoc', uploadDoc.single('file'), (req, res, next) => {
    verifyToken(req, res, tokendata => {
        if (!req.file) {
            res.status(200).json({
                message: "Please Select Document File",
                status: false
            })
        }
        else {
            let item = {
                DocumentName: req.file.filename,
                status: true
            }
            res.json(item);
        }
    })
});

/**
 * @swagger
 * /assets/selectInstallationLocationType:
 *   get:
 *     tags:
 *       - Asset
 *     description: API for Select Installation Location Type list
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

router.get("/selectInstallationLocationType", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Asset.getInstallationLocationType(tokendata.organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        installationLocationType: data,
                        message: "Installation Location Type List Found"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Installation Location Type List Not Found"
                    });
                }
            }
        });
    });
});

/**
 * @swagger
 * /assets/selectDurationType:
 *   get:
 *     tags:
 *       - Asset
 *     description: API for Select Duration Type list
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
router.get("/selectDurationType", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Asset.getDurationType(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        durationType: data,
                        message: "Duration Type List Found"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Duration Type List Not Found"
                    });
                }
            }
        });
    });
});

/**
 * @swagger
 * /assets/selectSupplier:
 *   get:
 *     tags:
 *       - Asset
 *     description: API for Select Supplier list
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
router.get("/selectSupplier", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Asset.getSupplier(tokendata.organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        supplierList: data,
                        message: "Supplier List Found"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Supplier List Not Found"
                    });
                }
            }
        });
    });
});

/**
 * @swagger
 * /assets/selectManufacturer:
 *   get:
 *     tags:
 *       - Asset
 *     description: API for Select Manufacturer list
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
router.get("/selectManufacturer", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Asset.getManufacturer(tokendata.organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        manufacturerList: data,
                        message: "Manufacturer List Found"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Manufacturer List Not Found"
                    });
                }
            }
        });
    });
});

/**
 * @swagger
 * /assets/selectAsset:
 *   get:
 *     tags:
 *       - Asset
 *     description: API for Select Asset list
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
router.get("/selectAsset", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Asset.getAsset(tokendata.organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        assetList: data,
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
 * /assets/assetQrCodeDetailsList/{categoryId}:
 *   get:
 *     tags:
 *       - Asset 
 *     description: Returns List of Assets QR Code Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: "Category Id starts with 1"
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
router.get("/assetQrCodeDetailsList/:categoryId", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        let categoryId = req.params.categoryId;

        db.query(Asset.getAssetCodeDetailsByCategory(tokendata.organizationIdFK, categoryId), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Asset QrCode List found"
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

module.exports = router;