const express = require("express");
const db = require("../db/database");
const Organization = require("../model/organization_model");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { superVerifyToken } = require("../config/superVerifyJwtToken");

/**
 * @swagger
 * /organization/listOfOrganizations/{pageNo}:
 *   get:
 *     tags:
 *       - Organization
 *     description: Returns List of All Organizations
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pageNo
 *         description: "pageNo is always starts with 0"
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

router.get("/listOfOrganizations/:pageNo", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;

        db.query(Organization.getAllOrganizationsSQL(), (err1, data1) => {
            if (data1) {
                pageCount1 = data1.length;
                db.query(Organization.getAllOrganizationsSQL(limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "organizations": data,
                                message: "Organization List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "organizations": [],
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
 * /organization/organizationSearch:
 *   get:
 *     tags:
 *       - Organization  
 *     description: Returns List of Organizations
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

router.get("/organizationSearch/",[
    // validation rules start 
    check('keyword').trim().not().isEmpty().withMessage("Please enter keyword")
], (req, res, next) => {
     
    superVerifyToken(req, res, tokendata => {

        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let keyword = req.query.keyword;

        db.query(Organization.getAllOrganizationsSearchSQL(keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data:data,
                        message: "Organization Found"
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
 * /organization/viewParticularOrganization/{organizationId}:
 *   get:
 *     tags:
 *       - Organization
 *     description: returns Single organization     
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: organizationId
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

router.get("/viewParticularOrganization/:organizationId", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        let oid = req.params.organizationId;
        db.query(Organization.getOrganizationByIdSQL(oid), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        organization: data[0],
                        message: "Oraganization Found"
                    });
                } else {
                    res.status(404).json({
                        message: "Oraganization Not Found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * definitions:
 *   Organization :
 *     properties:
 *      organizationName:
 *         type: string
 *      description :
 *         type: string
 */

/**
* @swagger
* /organization/addOrganization:
*   post:
*     tags:
*       - Organization
*     description: Adds Organization Details
*     produces:
*       - application/json
*     parameters:
*       - name: Organization 
*         description: organization object
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
*           $ref: '#/definitions/Organization'   
*/

router.post("/addOrganization", [
    // validation rules start 
    check('organizationName').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long')

    // validation rules end 
], (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let organization = new Organization(req.body);

        db.query(organization.addOrganizationSQL(), (err, data) => {
            if (!err) {
                res.status(200).json({
                    message: "Organization added successfully",
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
 * /organization/updateOrganization/{organizationId}:
 *   put:
 *     tags:
 *       - Organization
 *     description: Update Organization data By organization Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: organizationId
 *         description: Enter organization Id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: organization Data
 *         description: organization Data = require(body
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
 *           $ref: '#/definitions/Organization'
 */

router.put("/updateOrganization/:organizationId", [
    // validation rules start 
    check('organizationName').trim().isLength({ min: 3 }).withMessage('must be at least 3 chars long')
    // validation rules end 
], (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        var oId = req.params.organizationId;
        let organization = new Organization(req.body);

        db.query(Organization.checkOrganizationId(oId), (err, data) => {
            if (data.length > 0) {
                db.query(organization.updateOrganizationSQL(oId), (err, data) => {
                    if (!err) {

                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Organization updated successfully",
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
                    message: "Organization ID is not available"
                });
            }
        });
    })
});

/**
 * @swagger
 * /organization/deleteOrganization/{organizationId}:
 *   put:
 *     tags:
 *       - Organization
 *     description: Delete Organization data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: organizationId
 *         description: organization id
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
router.put("/deleteOrganization/:organizationId", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {
        var oId = req.params.organizationId;
        db.query(Organization.checkOrganizationId(oId), (err, data) => {
            if (data.length > 0) {
                db.query(Organization.deleteOrganizationByIdSQL(oId), (err, data) => {
                    if (!err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Organization deleted successfully",
                                affectedRows: data.affectedRows
                            });
                        } else {
                            res.status(400).json({
                                message: "Organization is not deleted"
                            });
                        }
                    } else {
                        console.log(err.message);

                    }
                });
            }
            else {
                res.status(400).json({
                    message: "Something went wrong, Please try again...!    "
                });
            }
        });
    })
});

/**
 * @swagger
 * /organization/selectOrganization:
 *   get:
 *     tags:
 *       - Organization
 *     description: returns list of Organizations     
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

router.get("/selectOrganization/", (req, res, next) => {
    superVerifyToken(req, res, tokendata => {

        db.query(Organization.getAllOrganizationListSQL(), (err, data) => {
            var organizationId = data[0].organizationId;

            db.query(Organization.getOrganizationsCountSQL(organizationId), (err1, data1) => {
                if (!err1) {
                    if (data1 && data1.length > 0) {
                        res.status(200).json({
                            organization: data1,
                            message: "Oraganization List Found"
                        });
                    } else {
                        res.status(404).json({
                            message: "Oraganization List Not Found"
                        });
                    }
                }
            });
        });
    })
});

module.exports = router;