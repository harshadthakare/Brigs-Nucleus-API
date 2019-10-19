import express from "express";
import db from "../db/database";
import Question from "../model/question_model";
import { verifyToken } from "../config/verifyJwtToken";

const { check, validationResult } = require('express-validator');
const router = express.Router();
/**
 * @swagger
 * /questions/listOfCheckListWithQuestions/{categoryId}/{pageNo}:
 *   get:
 *     tags:
 *       - Question
 *     description: API for Selecting Type of question list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: checklistId
 *         description: "enter checklist Id"
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
router.get("/listOfCheckListWithQuestions/:categoryId/:pageNo", (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let categoryId = req.params.categoryId;
        
        
        db.query(Question.getQuestionCountByChecklistSQL(categoryId, organizationIdFK), (err1, data1) => {
            
            if (data1) {
                pageCount1 = data1.length;
                db.query(Question.getQuestionCountByChecklistSQL(categoryId, organizationIdFK,limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "ChecklistData": data,
                                message: "CheckList data found"
                            });
                        }
                        else {
                            res.status(404).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "ChecklistData": [],
                                message: "No record found"
                            });
                        }
                    }
                    else {
                        res.status(404).json({
                            message: "Something went wrong...!!"
                        });
                    }
                });
            }
        });
    })
});

/**
 * @swagger
 * /questions/questionsList/{checklistId}/{pageNo}:
 *   get:
 *     tags:
 *       - Question
 *     description: Returns list of all questions by checklist id 
 *     produces:    
 *       - application/json
 *     parameters:
 *       - name: checklistId
 *         description: "enter checklist Id"
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
router.get("/questionsList/:checklistId/:pageNo", (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let checklistId = req.params.checklistId;
        db.query(Question.getAllQuestionsSQL(checklistId), (err1, data1) => {

            if (data1) {
                pageCount1 = data1.length;

                db.query(Question.getAllQuestionsSQL(checklistId, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "question": data,
                                message: " List found",
                            });
                        } else {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "question": [],
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
 * /questions/viewQuestionOption/{questionIdFK}:
 *   get:
 *     tags:
 *       - Question
 *     description: returns Question Options Details of particular Question        
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: questionIdFK
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
router.get("/viewQuestionOption/:questionIdFK", (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {
        let questionId = req.params.questionIdFK;

        db.query(Question.getQuestionOptionSQL(questionId), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {

                    res.status(200).json({
                        data: data,
                        message: "Question Options found",
                    });
                } else {
                    res.status(404).json({
                        status:false,
                        message: "Question Options Not found"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * definitions:
 *   addQuestion :
 *     properties:
 *      title:
 *         type: string
 *      questionTypeIdFK:
 *         type: integer
 *      checkListIdFK:
 *         type: integer
 *      options:        
 *         type: array
 *         items: 
 *           $ref: '#/definitions/addOptions'
 */
/**
 * @swagger
 * definitions:
 *   addOptions :
 *     type: object
 *     properties:
 *        optionTitle:
 *              type: string
 *        isDanger:
 *              type: integer 
 */
/**
 * @swagger
 * /questions/addQuestion:
 *   post:
 *     tags:
 *       - Question
 *     description: Add Question details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Question
 *         description: question object
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
 *           $ref: '#/definitions/addQuestion'
 */

router.post("/addQuestion", [
    check('title').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long and characters'),
    check('questionTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('checkListIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),

    check('options.*.optionTitle').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long and characters'),
    check('options.*.isDanger').trim().custom((value, { req }) => {
        if (value < 0 || value > 1 || isNaN(value)) {
            throw new Error('Value should be 0 or 1 only');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    // Indicates the success of this synchronous custom validator

], (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client
        let options = req.body.options;
        let question = new Question(req.body);

        db.query(question.addQuestionSQL(), (err, data) => {

            if (data) {
                let questionIdFK = data.insertId;

                if (!err) {

                    for (let index = 0; index < options.length; index++) {
                        const element = options[index];
                        let option = new Question(element);
                        db.query(option.addQuestionOptionSQL(questionIdFK), (err, data1) => {
                            if (index == options.length - 1 && !err) {
                                if (data1) {
                                    res.status(200).json({
                                        message: "Question details added successfully"
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
                }
            }
            else {
                res.status(400).json({
                    message: "Something Went Wrong Please Try Again"
                });
            }

        })
    });
});
/**
 * @swagger
 * definitions:
 *   updateQuestion :
 *     properties:
 *       questionId:
 *          type: integer
 *       title:
 *          type: string
 *       questionTypeIdFK:
 *          type: integer
 *       checkListIdFK:
 *          type: integer
 *       options:        
 *          type: array
 *          items: 
 *              $ref: '#/definitions/updateOptions'
 */
/**
 * @swagger
 * definitions:
 *   updateOptions :
 *     type: object
 *     properties:
 *        questionOptionId:
 *              type: integer
 *        optionTitle:
 *              type: string
 *        isDanger:
 *              type: integer 
 */
/**
 * @swagger
 * /questions/updateQuestion:
 *   put:
 *     tags:
 *       - Question
 *     description: Add Question details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Question
 *         description: question object
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
 *           $ref: '#/definitions/updateQuestion'
 */
router.put("/updateQuestion", [
    check('title').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long and characters'),
    check('questionTypeIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('checkListIdFK').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),

    check('options.*.optionTitle').trim().isLength({ min: 2 }).withMessage('must be at least 2 chars long and characters'),
    check('options.*.isDanger').trim().custom((value, { req }) => {
        if (value < 0 || value > 1 || isNaN(value)) {
            throw new Error('Value should be 0 or 1 only');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    // Indicates the success of this synchronous custom validator

], (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client

        let options = req.body.options;
        let question = new Question(req.body);
        var questionId = question.questionId;

        db.query(question.updateQuestionByIdSQL(questionId), (err, data) => {
            if (data) {

                if (!err) {
                    for (let index = 0; index < options.length; index++) {
                        const element = options[index];
                        let option = new Question(element);
                        var questionOptionId = option.questionOptionId;

                        db.query(option.updateQuestionOptionSQL(questionOptionId), (err, data1) => {
                            if (index == options.length - 1 && !err) {

                                if (data && data.affectedRows > 0) {
                                    res.status(200).json({
                                        message: "Department updated successfully",
                                        affectedRows: data.affectedRows
                                    })
                                } else {
                                    res.status(400).json({
                                        message: "Something went wrong, Please try again"
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
                }
            }
            else {
                res.status(400).json({
                    message: "Something Went Wrong Please Try Again"
                });
            }
        })
    });
});
/**
 * @swagger
 * /questions/deleteQuestion/{questionId}:
 *   delete:
 *     tags:
 *       - Question
 *     description: Delete Question data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: questionId
 *         description: question id
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
router.delete("/deleteQuestion/:questionId", (req, res, next) => {

    verifyToken(req, res, organizationIdFK => {
        var qId = req.params.questionId;

        db.query(Question.deleteQuestionOptionByIdSQL(qId), (err, data) => {
            if (!err) {

                db.query(Question.deleteQuestionByIdSQL(qId), (err, data1) => {
                    if (data1 && data1.affectedRows > 0) {
                        res.status(200).json({
                            message: "Question deleted successfully",
                            affectedRows: data1.affectedRows
                        });
                    } else {
                        res.status(200).json({
                            message: "Question not found ."
                        });
                    }
                })
            }
        });
    })
});
/**
 * @swagger
 * /questions/selectQuestionType:
 *   get:
 *     tags:
 *       - Question
 *     description: API for Selecting Type of question list
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
router.get("/selectQuestionType", (req, res, next) => {
    verifyToken(req, res, adminId => {

        db.query(Question.getQuestionType(), (err, data) => {
            if (!err) {

                if (data && data.length > 0) {

                    res.status(200).json({
                        QuestionType: data,
                        message: "Question Type List Found"
                    });
                }
                else {
                    res.status(404).json({
                        message: "Question Type List Not Found"
                    });
                }
            }
        });
    });
});

module.exports = router;