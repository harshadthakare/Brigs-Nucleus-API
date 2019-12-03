const express = require("express");
const db = require("../db/database");
const Document = require("../model/document_model");
const { check, validationResult } = require('express-validator');
const { verifyToken } = require("../config/verifyJwtToken")
const router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb1) {
        cb1(null, './uploads/categoryDoc');
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
        else if (file.mimetype === 'image/gif') {
            cb1(null, 'image-' + Date.now() + '.gif');
        }
        else if (file.mimetype === 'image/GIF') {
            cb1(null, 'image-' + Date.now() + '.GIF');
        }
        else if (file.mimetype === 'image/png') {
            cb1(null, 'image-' + Date.now() + '.png');
        }
        else if (file.mimetype === 'image/PNG') {
            cb1(null, 'image-' + Date.now() + '.PNG');
        }
        else if (file.mimetype === 'image/jpeg') {
            cb1(null, 'image-' + Date.now() + '.jpeg');
        }
        else if (file.mimetype === 'image/JPEG') {
            cb1(null, 'image-' + Date.now() + '.JPEG');
        }
        else if (file.mimetype === 'image/jpg') {
            cb1(null, 'image-' + Date.now() + '.jpg');
        }
        else if (file.mimetype === 'image/JPG') {
            cb1(null, 'image-' + Date.now() + '.JPG');
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
            return cb1(new Error('Only pdf, doc or docx, gif, png, jpeg, jpg, xls or xlsx file types are allowed!'))
        }
    }
});
var uploadDoc = multer({ storage: storage })

/**
 * @swagger
 * definitions:
 *   Document:
 *     properties:
 *      title:
 *         type: string
 *      description:
 *         type: string
 *      filepath:
 *         type: string
 *      documentTypeIdFK:
 *         type: integer
 *      masterId:
 *         type: integer
 */

/**
 * @swagger
 * definitions:
 *   Documate:
 *     properties:
 *      title:
 *         type: string
 *      description:
 *         type: string
 *      filepath:
 *         type: string
 */

/**
 * @swagger
 * /document/listOfDocumentsByAssetId/{assetId}/{pageNo}:
 *   get:
 *     tags:
 *       - Document
 *     description: Returns List Of All Asset Documents
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

router.get("/listOfDocumentsByAssetId/:assetId/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let aId = req.params.assetId;

        db.query(Document.getAllDocumentsByAssetIdSQL(aId), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(Document.getAllDocumentsByAssetIdSQL(aId, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "assetDocument": data,
                                message: "Asset Documents List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "assetDocument": [],
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
 * /document/listOfDocumentsByCategoryId/{categoryId}/{pageNo}:
 *   get:
 *     tags:
 *       - Document
 *     description: Returns List Of All Category Documents
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

router.get("/listOfDocumentsByCategoryId/:categoryId/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let cId = req.params.categoryId;

        db.query(Document.getAllDocumentsByCategoryIdSQL(cId), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(Document.getAllDocumentsByCategoryIdSQL(cId, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "categoryDocument": data,
                                message: "Category Documents List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "categoryDocument": [],
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
 * /document/listOfDocuments/{pageNo}:
 *   get:
 *     tags:
 *       - Document
 *     description: Returns List Of All Documents
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

router.get("/listOfDocuments/:pageNo", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Document.getAllDocuments(), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;

                db.query(Document.getAllDocuments(limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "document": data,
                                message: "Documents List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "document": [],
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
 * /document/documentSearch:
 *   get:
 *     tags:
 *       - Document  
 *     description: Returns List of Documents
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

router.get("/documentSearch/", [
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

        db.query(Document.getAllDocumentSearchSQL(keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Document Found"
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
 * /document/documentSearchByCategoryId:
 *   get:
 *     tags:
 *       - Document  
 *     description: Returns List of Documents of Category
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

router.get("/documentSearchByCategoryId/", [
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

        db.query(Document.getAllDocumentSearchByCategory(categoryId, keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Document Found"
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
 * /document/documentSearchByAssetId:
 *   get:
 *     tags:
 *       - Document  
 *     description: Returns List of Documents of Asset
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

router.get("/documentSearchByAssetId/", [
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

        db.query(Document.getAllDocumentSearchByAsset(assetId, keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Document Found"
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
 * /document/viewParticularDocument/{documentId}:
 *   get:
 *     tags:
 *       - Document
 *     description: returns Single Category Document        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: documentId
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

router.get("/viewParticularDocument/:documentId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let did = req.params.documentId;

        db.query(Document.getDocumentByIdSQL(did), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        message: "Document found",
                        document: data[0]
                    });
                } else {
                    res.status(404).json({
                        message: "Document Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /document/addDocument:
 *   post:
 *     tags:
 *       - Document
 *     description: Add Document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Document
 *         description: Document Data from body;Select documentTypeIdFK = 1 for "Category" related documents,documentTypeIdFK = 2 for "Asset" related documents and documentTypeIdFK = 3 for "General" Documnets;masterId is for AssetId or CategoryId
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
 *           $ref: '#/definitions/Document'
 */

router.post("/addDocument", [
    // validation rules start 
    check('title').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    check('filepath').trim().not().isEmpty().withMessage("Please Add Category Document"),
    check('documentTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('masterId').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    // validation rules end 1
], (req, res, next) => {

    verifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client
        let obj = req.body;
        let documentCode = new Date().getTime()
        obj.documentCode = documentCode;
        let document = new Document(obj);

        db.query(document.addDocumentSQL(), (err, data) => {

            if (!err) {
                res.status(200).json({
                    message: "Document added successfully",
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
 * /document/addDocumate:
 *   post:
 *     tags:
 *       - Document
 *     description: Add Documate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Documate
 *         description: Documate Data from body;
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
 *           $ref: '#/definitions/Documate'
 */

router.post("/addDocumate", [
    // validation rules start 
    check('title').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    check('filepath').trim().not().isEmpty().withMessage("Please Add Category Document"),
    // validation rules end 1
], (req, res, next) => {

    verifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client
        let obj = req.body;
        let documentCode = new Date().getTime()
        obj.documentCode = documentCode;
        let document = new Document(obj);

        db.query(document.addDocumateSQL(), (err, data) => {

            if (!err) {
                res.status(200).json({
                    message: "Document added successfully",
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
 * /document/updateDocument/{documentId}:
 *   put:
 *     tags:
 *       - Document
 *     description: Update Document data By Document Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: documentId
 *         description: Enter Document Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Document
 *         description: Document Data from body;Select documentTypeIdFK = 1 for "Category" related documents,documentTypeIdFK = 2 for "Asset" related documents and documentTypeIdFK = 3 for "General" Documnets;masterId is for AssetId or CategoryId
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
 *           $ref: '#/definitions/Document'
 */

router.put("/updateDocument/:documentId", [
    // validation rules start 
    check('title').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    check('filepath').trim().not().isEmpty().withMessage("Please Add Category Document"),
    check('documentTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('masterId').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
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
            var did = req.params.documentId;
            let document = new Document(req.body);

            db.query(Document.checkDocumentId(did), (err, data) => {
                if (data.length > 0) {
                    db.query(document.updateDocumentByIdSQL(did), (err, data) => {
                        if (!err) {
                            if (data && data.affectedRows > 0) {
                                res.status(200).json({
                                    message: "Document updated successfully",
                                    affectedRows: data.affectedRows
                                });
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
                        message: "Document ID is not available"
                    });
                }
            });
        })
    });

/**
 * @swagger
 * /document/updateDocumate/{documentId}:
 *   put:
 *     tags:
 *       - Document
 *     description: Update Documate data By Document Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: documentId
 *         description: Enter Document Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Documate
 *         description: Document Data from body;
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
 *           $ref: '#/definitions/Documate'
 */

router.put("/updateDocumate/:documentId", [
    // validation rules start 
    check('title').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    check('filepath').trim().not().isEmpty().withMessage("Please Add Category Document"),
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
            var did = req.params.documentId;
            let document = new Document(req.body);

            db.query(Document.checkDocumentId(did), (err, data) => {
                if (data.length > 0) {
                    db.query(document.updateDocumateByIdSQL(did), (err, data) => {
                        if (!err) {
                            if (data && data.affectedRows > 0) {
                                res.status(200).json({
                                    message: "Document updated successfully",
                                    affectedRows: data.affectedRows
                                });
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
                        message: "Document ID is not available"
                    });
                }
            });
        })
    });

/**
 * @swagger
 * /document/deleteDocument/{documentId}:
 *   put:
 *     tags:
 *       - Document
 *     description: Delete Document data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: documentId
 *         description: Document id
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

router.put("/deleteDocument/:documentId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        var dId = req.params.documentId;

        db.query(Document.checkDocumentId(dId), (err, data) => {
            if (data.length > 0) {
                db.query(Document.deleteDocumentByIdSQL(dId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Document Deleted Successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "Document is not deleted"
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
 * /document/uploadCategoryDoc:
 *   post:
 *     tags:
 *       - Document
 *     description: Upload Category Document with pdf format 
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
router.post('/uploadCategoryDoc', uploadDoc.single('file'), (req, res, next) => {
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
 * /document/selectDocumentType:
 *   get:
 *     tags:
 *       - Document
 *     description: API for Select Document Type From list of Document Types
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
router.get("/selectDocumentType", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(Document.getDocumentTypeList(), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        documentType: data,
                        message: "Document Type List Found"
                    });
                }
                else {
                    res.status(400).json({
                        message: "Document Type List Not Found"
                    });
                }
            }
        })
    })
});

module.exports = router;