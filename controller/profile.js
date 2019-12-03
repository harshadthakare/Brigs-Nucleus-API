const express = require("express");
const db = require("../db/database");
const Profile = require("../model/profile_model");
const { verifyToken } = require("../config/verifyJwtToken")
const { check, validationResult } = require('express-validator');
const router = express.Router();

/**
 * @swagger
 * /profile/viewAdminProfile:
 *   get:
 *     tags:
 *       - Profile
 *     description: returns Admin Profile       
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
router.get("/viewAdminProfile", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let aId = tokendata.adminId;

        db.query(Profile.getAdminProfile(aId), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        adminProfile: data[0]
                    });
                } else {
                    res.status(404).json({
                        message: "Profile Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * definitions:
 *   changePassword:
 *     properties:
 *      password:
 *         type: string
 *      newPassword:
 *         type: string
 */
/**
* @swagger
* /profile/changepassword:
    *   post:
    *     tags:
    *       - Profile
    *     description: change password
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token
    *         in: header
    *         required: true
    *       - name: Body
    *         description: change password (kindly put password = value of old password)
    *         in: body
    *         required: true
    *     schema:
    *           $ref: '#/definitions/changePassword'
    *
    *     responses:
    *       200:
    *         description: OK
    *       404:
    *         description: Not found
    *       400:
    *         description: Bad request
    *         schema:
    *           $ref: '#/definitions/changePassword'
    *
*/

router.post("/changepassword", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let password = req.body.password;
        let newPassword = req.body.newPassword;

        db.query(Profile.getPerAdminData(password), (err, data) => {
            if (data.length > 0) {

                let aId = data[0].adminId;
                db.query(Profile.updatePasswordById(newPassword, aId, password), (err, data) => {
                    if (!err) {
                        if (data.changedRows == 1) {
                            res.status(200).json({
                                status: true,
                                message: "Your Password has been changed successfully"
                            });
                        } else {
                            res.status(200).json({
                                status: false,
                                message: "Old password and new password could not be the same"
                            })
                        }
                    }
                })
            }
            else {
                res.status(200).json({
                    status: false,
                    message: "Old password was incorrect"
                })
            }
        });
    })
});

module.exports = router;