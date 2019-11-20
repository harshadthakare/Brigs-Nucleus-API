const express = require("express");
const db = require("../db/database");
const AssetCategory = require("../model/assetcategory");
const { verifyToken } = require("../config/verifyJwtToken");
const { generateCatArray } = require("../config/generateArray");
const { check, validationResult } = require('express-validator');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   AssetCategory :
 *     properties:
 *      parentId:
 *         type: integer
 *      title:
 *         type: string
 */

/**
 * @swagger
 * /assetcategories/categoryList:
 *   get:
 *     tags:
 *       - AssetCategory
 *     description: Returns all Asset Categories
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

router.get("/categoryList", (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {

        db.query(AssetCategory.getAllCategories(organizationIdFK), (err, data) => {

            let allCategory = data;
            if (!err) {
                if (data && data.length > 0) {

                generateCatArray(allCategory,(result)=>{
                    res.status(200).json({
                        "assetCategory": result,
                        message: "Asset Category List found"
                    });
                 })
                } else {
                    res.status(404).json({
                        message: "Asset Category List Not found"
                    });
                }
            }
            else {
                res.status(404).json({
                    message: "Asset Category List Not found"
                });
            }
        });
    })
});

/**
 * @swagger
 * /assetcategories/allCategorySearch:
 *   get:
 *     tags:
 *       - AssetCategory 
 *     description: Returns List of Categories
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

router.get("/allCategorySearch/", [
    // validation rules start 
    check('keyword').trim().not().isEmpty().withMessage("Please enter keyword")
], (req, res, next) => {

    verifyToken(req, res, organizationIdFK => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let keyword = req.query.keyword;

        db.query(AssetCategory.getCategorySearchSQL(organizationIdFK, keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Category Found"
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
 * /assetcategories/addAssetCategory:
 *   post:
 *     tags:
 *       - AssetCategory
 *     description: Add Asset Category details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Asset Category
 *         description: Asset Category object
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
 *           $ref: '#/definitions/AssetCategory'
 */
router.post("/addAssetCategory", [
    // validation rules start 

    check('parentId').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('title').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long')

    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let assetcategory = new AssetCategory(req.body);
        assetcategory.organizationIdFK = organizationIdFK;

        db.query(assetcategory.addAssetCategorySQL(), (err, data) => {
            if (!err) {
                res.status(200).json({
                    message: "Asset Category added successfully",
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
 * /assetcategories/updateAssetCategory/{categoryId}:
 *   put:
 *     tags:
 *       - AssetCategory
 *     description: Update Asset Category data By Asset Category Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: Enter AssetCategory Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: Asset Category Data
 *         description: Asset Category Data from body
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
 *           $ref: '#/definitions/AssetCategory'
 */

router.put("/updateAssetCategory/:categoryId", [
    // validation rules start 

    check('parentId').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('title').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long')

    // validation rules end 
], (req, res, next) => {
    verifyToken(req, res, adminId => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var cId = req.params.categoryId;
        let assetcategory = new AssetCategory(req.body);

        db.query(AssetCategory.checkAssetCategoryId(cId), (err, data) => {
            if (data.length > 0) {
                db.query(assetcategory.updateAssetCategoryByIdSQL(cId), (err, data) => {
                    if (!err) {

                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: `Asset Category updated successfully`,
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
                    message: "Asset Category ID is not available"
                });
            }
        });
    });
});

/**
 * @swagger
 * /assetcategories/deleteAssetCategory/{categoryId}:
 *   put:
 *     tags:
 *       - AssetCategory
 *     description: Delete Asset Category data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: category id
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
router.put("/deleteAssetCategory/:categoryId", (req, res, next) => {
    verifyToken(req, res, dId => {
        var cId = req.params.categoryId;

        db.query(AssetCategory.checkAssetCategoryId(cId), (err, data) => {
            if (data.length > 0) {
                db.query(AssetCategory.deleteAssetCategoryByIdSQL(cId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Asset Category deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "Asset Category is not deleted"
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
 * /assetcategories/selectAssetCategory:
 *   get:
 *     tags:
 *       - AssetCategory
 *     description: API for Select Category From list of Asset Categories
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
router.get("/selectAssetCategory", (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {

        db.query(AssetCategory.getAssetCategorySQL(organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        AssetCategory: data,
                        message: "Asset Category List Found",
                    });
                } else {
                    res.status(404).json({
                        message: "Asset Category List Not Found"
                    });
                }
            }
        });
    })
});
module.exports = router;