const express = require("express");
const db = require("../db/database");
const AssetHome = require("../model/assetHome_model");
const { check, validationResult } = require('express-validator');
const { verifyToken } = require("../config/verifyJwtToken");
const router = express.Router();

/**
 * @swagger
 * /assetHome/allRootCategories:
 *   get:
 *     tags:
 *       -  Asset Home
 *     description: Returns List all AssetCategories
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
 */
router.get("/allRootCategories", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        db.query(AssetHome.getRootCategory(tokendata.organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        "rootCategory": data,
                        message: "Root Category List Found"
                    });
                } else {
                    res.status(404).json({
                        message: "Root Category List Not Found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /assetHome/allCategories/{categoryId}:
 *   get:
 *     tags:
 *       -  Asset Home
 *     description: Returns List of all AssetCategories
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: "category Id"
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
 */
router.get("/allCategories/:categoryId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let cId = req.params.categoryId;

        db.query(AssetHome.getAllCategory(tokendata.organizationIdFK, cId), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        "allCategory": data,
                        message: "All Category List Found"
                    });
                } else {
                    res.status(404).json({
                        message: "All Category List Not Found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * /assetHome/categorySearch:
 *   get:
 *     tags:
 *       - Asset Home  
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

router.get("/categorySearch/", [
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

        db.query(AssetHome.getAllCategorySearchSQL(tokendata.organizationIdFK, keyword), (err, data) => {
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

module.exports = router;