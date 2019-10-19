import express from "express";
import db from "../db/database";
import auth from "../model/auth_model";
import config from "../config/config";
var jwt = require('jsonwebtoken');
import { sendOtp } from "../config/sms_helper";
import { resendOtp } from "../config/sms_helper";
import { verifyOtp } from "../config/sms_helper";
import { sendEmailOtp } from "../config/sms_helper";
const { check, validationResult } = require('express-validator');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   login:
 *     properties:
 *      emailId:
 *         type: string
 *      password:
 *         type: string
 */
/**
* @swagger
* /authorization/login/:
    *   post:
    *     tags:
    *       - Login
    *     description: Login user
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Body
    *         description: Parameter Email id and Password
    *         in: body
    *         required: true
    *     schema:
    *           $ref: '#/definitions/login'
    *
    *     responses:
    *       200:
    *         description: An array of Users
    *         schema:
    *           $ref: '#/definitions/login'
    *
    */
router.post("/login", [

    check('emailId').normalizeEmail().isEmail().withMessage("Enter valid email id"),
    check('password').isLength({ min: 6 }).withMessage('password must be at least 6 chars long')

], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let user = new auth(req.body)
    db.query(user.getAdminByAuthSQL(), (err, data) => {
        if (err) {
            res.status(400).json({
                message: "Invalid Credentials"
            });
        } else {
            if (data && data.length > 0) {
                var userId = data[0].adminId;
                var orgId = data[0].organizationIdFK;

                var token = jwt.sign({ id: userId, orgId }, config.secret, {
                    expiresIn: 2400000
                });

                data[0].token = token
                res.status(200).send({
                    auth: true, 
                    data: data[0],
                    message : "Admin Login Successfully"
                });
            }
            else {
                res.status(404).send({
                    auth: false, 
                    message: "Invalid EmailId or Password"
                });
            }
        }
    });
});

/**
 * @swagger
 * definitions:
 *   sendOtpText:
 *     properties:
 *      mobileNumber:
 *         type: integer
 *      resendFlag:
 *         type: integer
 */
/**
* @swagger
* /authorization/sendOtpViaText/:
    *   post:
    *     tags:
    *       - OTP Verification
    *     description: Send OTP to registered mobile number
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Body
    *         description: Mobile number and resend flag (set 1 for resend)
    *         in: body
    *         required: true
    *     schema:
    *           $ref: '#/definitions/sendOtpText'
    *
    *     responses:
    *       200:
    *         description: Send OTP to registered mobile number
    *         schema:
    *           $ref: '#/definitions/sendOtpText'
    *
*/

router.post("/sendOtpViaText", [check('mobileNumber').trim().isInt().isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digit")], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });

    }
    let mobile_number = req.body.mobileNumber;
    let resend_flag = req.body.resendFlag;
    db.query(auth.getUserByNoSQL(mobile_number), (err, data) => {

        if (!err) {
            if (data.length > 0) {

                if (resend_flag == 1) {
                    resendOtp(mobile_number, response => {

                        if (response.type == 'error') {
                            res.status(200).send({ response });
                        }
                        else {
                            res.status(200).json({
                                status: true,
                                message: "OTP has been resent to your registered Mobile Number.",
                            });
                        }
                    });
                }
                else {
                    sendOtp(mobile_number, response => {
                        if (response.type == 'error') {
                            res.status(200).send({ response });
                        }
                        else {
                            res.status(200).json({
                                status: true,
                                message: "OTP has been sent to your registered Mobile Number.",
                            });
                        }
                    });
                }

            } else {
                res.status(200).json({
                    status: false,
                    message: "Mobile Number is not registered."
                });
            }
        }
        else {
            res.status(400).json({
                status: false,
                message: err.message
            });
        }
    });
});

/**
 * @swagger
 * definitions:
 *   sendOtpEmail:
 *     properties:
 *      email:
 *         type: string
 */
/**
* @swagger
* /authorization/sendOtpViaMail/:
    *   post:
    *     tags:
    *       - OTP Verification
    *     description: Send OTP to registered email id
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Body
    *         description: Email id
    *         in: body
    *         required: true
    *     schema:
    *           $ref: '#/definitions/sendOtpEmail'
    *
    *     responses:
    *       200:
    *         description: Send OTP to registered email id
    *         schema:
    *           $ref: '#/definitions/sendOtpEmail'
    *
*/

router.post("/sendOtpViaMail", [check('email').trim().normalizeEmail().isEmail().withMessage("Enter valid email id")], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let email = req.body.email;

    db.query(auth.getUserByIdSQL(email), (err, data) => {
        console.log(err);
        if (!err) {

            console.log(data.length);

            if (data && data.length > 0) {
                var otp = Math.floor(1000 + Math.random() * 9000);
                sendEmailOtp(email, otp, response => {
                    if (response.msgType == 'error') {
                        res.status(200).send({ response });
                    }
                    else {
                        db.query(auth.updateOTPByEmailSQL(otp, email), (err, data) => {
                            console.log(data);
                            if (data.changedRows == 1) {
                                res.status(200).json({
                                    status: true,
                                    message: "OTP has been sent to your registered Email Id."
                                });
                            }
                            else {
                                res.status(404).json({
                                    status: true,
                                    message: err.message
                                });
                            }
                        });
                    }
                });

            } else {
                res.status(200).json({
                    status: false,
                    message: "Email id is not registered."
                });
            }
        }
        else {
            res.status(400).json({
                status: false,
                message: err.message
            });
        }
    });
});

/**
 * @swagger
 * definitions:
 *   sendOtp:
 *     properties:
 *      otp:
 *         type: integer
 *      mobileNumber:
 *         type: integer
 */
/**
* @swagger
* /authorization/verifyOtp/:
    *   post:
    *     tags:
    *       - OTP Verification
    *     description: OTP verification using mobile number
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Body
    *         description: OTP and mobile number
    *         in: body
    *         required: true
    *     schema:
    *           $ref: '#/definitions/sendOtp'
    *
    *     responses:
    *       200:
    *         description: Send OTP to registered email id
    *         schema:
    *           $ref: '#/definitions/sendOtp'
    *
*/

router.post("/verifyOtp", [check('otp').trim().isInt().isLength({ min: 4, max: 4 }),
check('mobileNumber').trim().isInt().isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digit")
], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var otp = req.body.otp;
    var mobile_number = req.body.mobileNumber;

    verifyOtp(mobile_number, otp, data => {
        if (data.type == 'error') {
            res.status(400).send({
                status: false,
                message: "OTP is not verified"
            });
        }
        else {
            res.status(200).json({
                status: true,
                message: "OTP is verified"
            });
        }
    });
});

/**
 * @swagger
 * definitions:
 *   verifysendOtpEmail:
 *     properties:
 *      email:
 *         type: string
 *      otp:
 *          type: integer
 */
/**
* @swagger
* /authorization/verifyOtpEmail/:
    *   post:
    *     tags:
    *       - OTP Verification
    *     description: OTP verification using email id
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Body
    *         description: OTP and Email id
    *         in: body
    *         required: true
    *     schema:
    *           $ref: '#/definitions/verifysendOtpEmail'
    *
    *     responses:
    *       200:
    *         description: Send OTP to registered email id
    *         schema:
    *           $ref: '#/definitions/verifysendOtpEmail'
    *
*/

router.post("/verifyOtpEmail", [check('otp').trim().isInt().isLength({ min: 4, max: 4 }),
check('email').trim().normalizeEmail().isEmail().withMessage("Enter valid email id")],

    (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });

        }
        let verify = new auth(req.body);
        db.query(verify.getUserEmailOtp(), (err, data) => {
            if (data.length > 0) {
                res.status(200).json({
                    status: true,
                    message: "OTP has been verified",
                });
            }
            else {
                res.status(404).json({
                    status: false,
                    message: "OTP is not verified",
                });
            }
        });
    });

/**
 * @swagger
 * definitions:
 *   newPassword:
 *     properties:
 *      inputType:
 *         type: string
 *      inputValue:
 *         type: string
 *      newPassword:
 *         type: string
 *      confirmPassword:
 *         type: string
 *      otp:
 *         type: integer
 */
/**
* @swagger
* /authorization/saveNewPassword/:
    *   put:
    *     tags:
    *       - OTP Verification
    *     description: Save new password
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Body
    *         description: New passord (kindly put input type 1 mobile or 2 email,input value will be according to input type)
    *         in: body
    *         required: true
    *     schema:
    *           $ref: '#/definitions/newPassword'
    *
    *     responses:
    *       200:
    *         description: An array of User
    *         schema:
    *           $ref: '#/definitions/newPassword'
    *
*/

router.put("/saveNewPassword", [check('newPassword').isLength({ min: 6 }).withMessage('password must be at least 6 chars long'),
	check('confirmPassword').isLength({ min: 6 }).withMessage('password must be at least 6 chars long')], 
	(req, res, next) => {

	const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });

        }
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;
    let inputType = req.body.inputType;
    let inputValue = req.body.inputValue;
    let otp = req.body.otp;

    if (inputType == 'mobile') {
        db.query(auth.getUserByNoSQL(inputValue), (err, data) => {

            if (data.length > 0) {
                db.query(auth.updatePasswordByNoSQL(newPassword, inputValue), (err, data) => {
                    if (!err) {
                        if (data.changedRows == 1) {

                            res.status(200).json({
                                status: true,
                                message: "Password changed successfully."
                            });
                        } else {
                            res.status(200).json({
                                status: false,
                                message: "Password is not changed.!! Please Try again."
                            });
                        }
                    }
                });
            }
            else {
                res.status(400).json({
                    status: false,
                    message: "Mobile number is not registered."
                });
            }
        })
    }

    if (inputType == 'email') {
        db.query(auth.getUserByIdSQL(inputValue), (err, data) => {
            if (data.length > 0) {
                db.query(auth.updatePasswordByIdSQL(newPassword, inputValue, otp), (err, data) => {
                    if (!err) {
                        if (data.changedRows == 1) {

                            res.status(200).json({
                                status: true,
                                message: "Password changed successfully."
                            });
                        } else {
                            res.status(200).json({
                                status: false,
                                message: "Password is not changed.!! Please Try again."
                            });
                        }
                    }
                });
            }
            else {
                res.status(400).json({
                    status: false,
                    message: "Email Id is not registered."
                });
            }
        })
    }
});

module.exports = router;