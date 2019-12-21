const express = require("express");
const db = require("../db/database");
const Question = require("../model/question_model");
const { verifyToken } = require("../config/verifyJwtToken");
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
 *       - name: categoryId
 *         description: "enter category Id"
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
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let categoryId = req.params.categoryId;


        db.query(Question.getQuestionCountByChecklistSQL(tokendata.organizationIdFK, categoryId), (err1, data1) => {

            if (data1) {
                pageCount1 = data1.length;

                db.query(Question.getQuestionCountByChecklistSQL(tokendata.organizationIdFK, categoryId, limit, page), (err, data) => {
                    if (!err) {
                        if (data && data.length > 0) {
                            res.status(200).json({
                                "currentPage": page,
                                "totalCount": pageCount1,
                                "ChecklistData": data,
                                message: "CheckList Data Found"
                            });
                        }
                        else {
                            res.status(200).json({
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
    verifyToken(req, res, tokendata => {
        const limit = 10;
        const page = req.params.pageNo;
        var pageCount1 = 0;
        let checklistId = req.params.checklistId;

        db.query(Question.getAllQuestionsSQL(checklistId), (err1, data1) => {

            if (data1) {
                pageCount1 = data1.length;

                db.query(Question.getAllQuestionsSQL(checklistId, limit, page), (err, data) => {
                    let question = data;

                    if (!err && data && data.length > 0) {

                        for (let index = 0; index < question.length; index++) {
                            const element = question[index];
                            db.query(Question.getOptionsListSQL(element.questionId), (err2, data2) => {

                                if (!err2) {
                                    element.questionOptions = data2;
                                    if ((data.length - 1) == index) {
                                        setTimeout(function () {
                                            res.status(200).json({
                                                "currentPage": page,
                                                "totalCount": pageCount1,
                                                "question": question,
                                                message: "Questions List found",
                                            });
                                        }, 100)
                                    }
                                }
                            })
                        }
                    } else {
                        res.status(200).json({
                            "currentPage": page,
                            "totalCount": pageCount1,
                            "question": question,
                            message: "No record found"
                        });
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
 * /questions/allChecklistSearch:
 *   get:
 *     tags:
 *       - Question 
 *     description: Returns List of Checklists
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryIdFK
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

router.get("/allChecklistSearch/", [
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

        let categoryIdFK = req.query.categoryIdFK;
        let keyword = req.query.keyword;

        db.query(Question.getChecklistSearchSQL(tokendata.organizationIdFK, categoryIdFK, keyword), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Checklist Found"
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
 * definitions:
 *   addQuestion :
 *     properties:
 *      title:
 *         type: string
 *      questionTypeIdFK:
 *         type: integer
 *      checkListIdFK:
 *         type: integer
 *      isCompulsory:
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
    check('isCompulsory').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    // Indicates the success of this synchronous custom validator

], (req, res, next) => {
    verifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client
        let options = req.body.options;
        let question = new Question(req.body);

        db.query(Question.getMaxSequenceNo(), (err2, data2) => {
            var sequenceNo = data2[0].maxSequenceNo;

            if (sequenceNo == 0 && sequenceNo == null) {
                sequenceNumber = 1
            }
            else {
                sequenceNumber = sequenceNo + 1;
            }

            db.query(question.addQuestionSQL(sequenceNumber), (err, data) => {

                if (data) {
                    let questionIdFK = data.insertId;

                    if (!err) {
                        if (options.length > 0) {
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
                        else {
                            res.status(200).json({
                                message: "Question details added successfully"
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
 *       isCompulsory:
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
    check('isCompulsory').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    // Indicates the success of this synchronous custom validator

], (req, res, next) => {
    verifyToken(req, res, tokendata => {
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
                    if (options.length > 0) {

                        for (let index = 0; index < options.length; index++) {

                            const element = options[index];
                            let option = new Question(element);
                            let questionOptionId = element.questionOptionId;

                            db.query(option.checkOptionIdSQL(questionOptionId), (err1, data2) => {
                                let optionIdCount = data2[0].optionIdCount;
                                let sql = ''
                                if (optionIdCount > 0) {
                                    sql = option.updateQuestionOptionSQL(questionOptionId)
                                } else {
                                    sql = option.addQuestionOptionSQL(questionId)
                                }
                                db.query(sql, (err, data1) => {

                                    if (index == options.length - 1 && !err) {
                                        if (data && data.affectedRows > 0) {
                                            res.status(200).json({
                                                message: "Question updated successfully",
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
                            })
                        }
                    } else {
                        res.status(200).json({
                            message: "Question updated successfully",
                            affectedRows: data.affectedRows
                        })
                    }
                }
            }
            else {
                res.status(400).json({
                    message: "Something Went Wrong, Please Try Again"
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

    verifyToken(req, res, tokendata => {
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
                            message: "Can't delete this question"
                        });
                    }
                })
            }
        });
    })
});

/**
 * @swagger
 * /questions/deleteQuestionOption/{questionOptionId}:
 *   delete:
 *     tags:
 *       - Question
 *     description: Delete Question Option data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: questionOptionId
 *         description: question optionId id
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

router.delete("/deleteQuestionOption/:questionOptionId", (req, res, next) => {

    verifyToken(req, res, tokendata => {
        var qId = req.params.questionOptionId;

        db.query(Question.deleteOptionByIdSQL(qId), (err, data) => {
            if (!err) {

                if (data && data.affectedRows > 0) {
                    res.status(200).json({
                        message: "Option deleted successfully",
                        affectedRows: data.affectedRows
                    });
                } else {
                    res.status(200).json({
                        message: "Option is not deleted"
                    });
                }
            }
        });
    })
});

/**
 * @swagger
 * definitions:
 *   addLinkQuestion :
 *     properties:
 *      title:
 *         type: string
 *      questionTypeIdFK:
 *         type: integer
 *      checkListIdFK:
 *         type: integer
 *      isCompulsory:
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
 * /questions/addLinkQuestion/{questionOptionId}:
 *   post:
 *     tags:
 *       - Question
 *     description: Add Link Question details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: questionOptionId
 *         description: "option Id"
 *         in: path
 *         required: true
 *       - name: Link Question
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
 *           $ref: '#/definitions/addLinkQuestion'
 */

router.post("/addLinkQuestion/:questionOptionId", [
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
    check('isCompulsory').trim().custom((value, { req }) => {
        if (value < 0 || isNaN(value)) {
            throw new Error('Value can not be less than 0');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    // Indicates the success of this synchronous custom validator

], (req, res, next) => {
    verifyToken(req, res, tokendata => {
        // send response of validation to client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // ....!  end send response of validation to client
        let options = req.body.options;
        let question = new Question(req.body);
        let optionId = req.params.questionOptionId;

        db.query(Question.getMaxSequenceNo(), (err2, data2) => {
            var sequenceNo = data2[0].maxSequenceNo;

            if (sequenceNo == 0 && sequenceNo == null) {
                sequenceNumber = 1
            }
            else {
                sequenceNumber = sequenceNo + 1;
            }

            db.query(question.addLinkQuestionSQL(sequenceNumber), (err, data) => {

                if (data) {
                    let questionIdFK = data.insertId;

                    if (!err) {
                        if (options.length > 0) {
                            for (let index = 0; index < options.length; index++) {

                                const element = options[index];
                                let option = new Question(element);

                                db.query(option.addQuestionOptionSQL(questionIdFK), (err, data1) => {

                                    if (index == options.length - 1 && !err) {
                                        if (data1) {
                                            db.query(option.updateOption(questionIdFK, optionId), (err, data2) => {

                                                if (!err && data2) {
                                                    res.status(200).json({
                                                        message: "Question details added successfully"
                                                    });
                                                }
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
                        else {

                            let option = new Question();
                            db.query(option.updateOption(questionIdFK, optionId), (err, data2) => {

                                if (!err && data2) {
                                    res.status(200).json({
                                        message: "Question details added successfully"
                                    });
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
});

/**
 * @swagger
 * /questions/viewParticularQuestionWithOptions/{questionId}:
 *   get:
 *     tags:
 *       - Question
 *     description: Returns particular questions details
 *     produces:    
 *       - application/json
 *     parameters:
 *       - name: questionId
 *         description: "enter questionId "
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

router.get("/viewParticularQuestionWithOptions/:questionId", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        let questionId = req.params.questionId;

        db.query(Question.getQuestionByIdSQL(questionId), (err, data) => {
            if (!err && data && data[0]) {

                let question = data[0];

                db.query(Question.getQuestionOptionByIdSQL(questionId), (err1, data1) => {
                    if (!err1 && data1 && data1.length) {

                        var options = []
                        if (data1) {

                            for (let index = 0; index < data1.length; index++) {

                                const element = data1[index];
                                getLinkedQuestion(element.referQuestionId, (mData) => {

                                    if (mData) {
                                        element.linkedQuestion = mData
                                        options.push(element)
                                    } else {
                                        options.push(element)
                                    }
                                    question.questionOptions = options;
                                    setTimeout(() => {
                                        if ((data1.length - 1) == index) {
                                            res.status(200).json({
                                                Question: question,
                                                message: "Question Found"
                                            });
                                        }
                                    }, 100);
                                })
                            }
                        }
                    }
                    else {
                        question.questionOptions = [];
                        res.status(200).json({
                            Question: question,
                            message: "Question Found"
                        });
                    }
                });
            } else {
                res.status(200).json({
                    Question: [],
                    message: "Question Not Found"
                });
            }
        });
    })
});

const getLinkedQuestion = (questionId, callback) => {
    if (questionId > 0) {
        db.query(Question.getLinkedQuestionsByIdSQL(questionId), (err2, data) => {
            if (!err2 && data && data[0]) {
                callback(data[0])
            } else {
                callback(null)
            }
        })
    } else {
        callback(null)
    }
}

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
    verifyToken(req, res, tokendata => {

        db.query(Question.getQuestionType(), (err, data) => {
            if (!err) {

                if (data && data.length > 0) {

                    res.status(200).json({
                        QuestionType: data,
                        message: "Question Type List Found"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Question Type List Not Found"
                    });
                }
            }
        });
    });
});
/**
 * @swagger
 * /questions/checklistQuestionsWithoutPagination/{checklistId}:
 *   get:
 *     tags:
 *       - Question
 *     description: Returns list of all questions by checklist id Without using pagination
 *     produces:    
 *       - application/json
 *     parameters:
 *       - name: checklistId
 *         description: "enter checklist Id"
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

router.get("/checklistQuestionsWithoutPagination/:checklistId", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        let checklistId = req.params.checklistId;

        db.query(Question.getChecklistQuesWithoutPaginationSQL(checklistId), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        status: true,
                        question: data,
                        message: "Questions List found",
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
 * /questions/sequenceQuestionsList/{checklistId}:
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

router.get("/sequenceQuestionsList/:checklistId", (req, res, next) => {
    verifyToken(req, res, tokendata => {
        let checklistId = req.params.checklistId;

        db.query(Question.getAllSequenceQuestionsSQL(checklistId), (err, data) => {
            let question = data;

            if (!err && data && data.length > 0) {

                for (let index = 0; index < question.length; index++) {
                    const element = question[index];
                    db.query(Question.getOptionsListSQL(element.questionId), (err2, data2) => {

                        if (!err2) {
                            element.questionOptions = data2;
                            if ((data.length - 1) == index) {
                                setTimeout(function () {
                                    res.status(200).json({
                                        "question": question,
                                        message: "Questions List found",
                                    });
                                }, 100)
                            }
                        }
                    })
                }
            } else {
                res.status(200).json({
                    "question": question,
                    message: "No record found"
                });
            }
        });
    })
});

/**
 * @swagger
 * definitions:
 *   updateSequenceQuestion :
 *     properties:
 *       sequenceNumber:        
 *          type: array
 *          items: 
 *              $ref: '#/definitions/updateSequenceQuestions'
 */

/**
 * @swagger
 * definitions:
 *   updateSequenceQuestions :
 *     type: object
 *     properties:
 *       questionId:
 *          type: integer
 *       sequenceNo:
 *          type: integer 
 */

/**
 * @swagger
 * /questions/updateSequenceQuestion:
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
 *           $ref: '#/definitions/updateSequenceQuestion'
 */

router.put("/updateSequenceQuestion", (req, res, next) => {
    verifyToken(req, res, tokendata => {

        let sequenceNumber = req.body.sequenceNumber;
        let question = new Question(req.body);

        for (let index = 0; index < sequenceNumber.length; index++) {
            const element = sequenceNumber[index];
            let sequenceNo = new Question(element);
            let questionId = element.questionId;

            db.query(sequenceNo.updateSequenceQuestionByIdSQL(questionId), (err, data) => {

                if (data) {

                    if (index == sequenceNumber.length - 1 && !err) {
                        if (data && data.affectedRows > 0) {
                            res.status(200).json({
                                message: "Sequnce Question updated successfully",
                                affectedRows: data.affectedRows,
                                status: true
                            })
                        } else {
                            res.status(400).json({
                                message: "Something went wrong, Please try again",
                                status: false
                            });
                        }
                    }
                }
                else {
                    res.status(400).json({
                        message: "Something Went Wrong, Please Try Again",
                        status: false
                    });
                }
            })
        }
    });
});

module.exports = router;