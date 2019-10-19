import express from "express";
import db from "../db/database";
import AssetHome from "../model/assetHome_model";
const { check, validationResult } = require('express-validator');
import { verifyToken } from "../config/verifyJwtToken";
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
    verifyToken(req, res, organizationIdFK => {

        db.query(AssetHome.getRootCategory(organizationIdFK), (err, data) => {
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

router.get("/categorySearch/",[
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

        db.query(AssetHome.getAllCategorySearchSQL(organizationIdFK, keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data:data,
                        message: "Category Found"
                    });
                } else {
                    res.status(404).json({
                        status: false,
                        message: "No record found"
                    });
                }
            }
        });
    })
});

module.exports = router;