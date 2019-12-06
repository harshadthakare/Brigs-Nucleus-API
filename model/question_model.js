class Question {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getQuestionCountByChecklistSQL(organizationIdFK, categoryIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT c.checklistId,c.title,c.checkingDuration,c.durationTypeIdFK,d.title as durationType,
                   (SELECT COUNT(questionId) FROM question  WHERE checkListIdFK = checklistId AND isDeleted = 0)AS totalQuestions 
                   FROM checklist c JOIN durationtype d ON c.durationTypeIdFK = d.durationTypeId 
                   WHERE c.organizationIdFK = ${organizationIdFK} AND c.categoryIdFK = ${categoryIdFK} AND c.isDeleted = 0 ORDER BY c.createdOn DESC ${limitString}`;
        return sql;
    }

    static getChecklistSearchSQL(organizationIdFK, categoryIdFK, keyword) {

        let sql = `SELECT checklistId,title,
                   (SELECT COUNT(questionId) FROM question  WHERE checkListIdFK = checklistId AND isDeleted = 0)AS totalQuestions 
                   FROM checklist WHERE organizationIdFK = ${organizationIdFK} AND categoryIdFK = ${categoryIdFK} AND title LIKE '%${keyword}%' AND isDeleted = 0`;
        return sql;
    }

    static getQuestionOptionSQL(questionId) {
        let sql = `SELECT questionOptionId,title as options FROM questionoption WHERE questionIdFK = ${questionId} AND isDeleted = 0`;
        return sql;
    }

    static getAllQuestionsSQL(checkListId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT c.checklistId,q.questionId,qt.title as questionType,q.title as questionDescription 
            FROM question q JOIN questiontype qt on q.questionTypeIdFK = qt.questionTypeId
            JOIN checklist c on q.checkListIdFK = c.checklistId
            WHERE c.checklistId = ${checkListId} AND q.isDeleted = 0 ORDER BY q.createdOn DESC ${limitString}`;
        return sql;
    }

    static getOptionsListSQL(questionId) {
        let sql = `SELECT questionOptionId,title as optionTitle FROM questionoption WHERE questionIdFK = ${questionId} AND isDeleted = 0`;
        return sql;
    }

    addQuestionSQL() {
        let sql = `INSERT into question (title,questionTypeIdFK,checkListIdFK,isCompulsory) 
                VALUES ("${this.title}",${this.questionTypeIdFK},${this.checkListIdFK},${this.isCompulsory})`;
        return sql;
    }

    addLinkQuestionSQL() {
        let sql = `INSERT into question (title,questionTypeIdFK,checkListIdFK,isRefer,isCompulsory) 
                VALUES ("${this.title}",${this.questionTypeIdFK},${this.checkListIdFK},1,${this.isCompulsory})`;
        return sql;
    }

    addQuestionOptionSQL(questionIdFK) {
        let sql = `INSERT into questionoption(questionIdFK,title,isDanger) VALUES (${questionIdFK},"${this.optionTitle}",${this.isDanger})`;
        return sql;
    }

    updateOption(questionId, optionId) {
        let sql = `UPDATE questionoption SET referQuestionId = ${questionId} WHERE questionOptionId = ${optionId}`;
        return sql;
    }

    static getQuestionType() {
        let sql = `SELECT questionTypeId,title FROM questiontype WHERE isDeleted = 0`;
        return sql;
    }

    updateQuestionByIdSQL(questionId) {
        let sql = `UPDATE question SET 
                    title            = "${this.title}",
                    questionTypeIdFK = ${this.questionTypeIdFK},
                    checkListIdFK    = ${this.checkListIdFK},
                    isCompulsory     = ${this.isCompulsory}
        WHERE questionId = ${questionId}`;
        return sql;
    }

    updateQuestionOptionSQL(questionOptionId) {
        let sql = `UPDATE questionoption SET
                    title = "${this.optionTitle}",
                    isDanger = ${this.isDanger}
        WHERE questionOptionId = ${questionOptionId}`;
        return sql;
    }

    checkOptionIdSQL(questionOptionId) {
        let sql = `select count(questionOptionId)as optionIdCount from questionoption where questionOptionId =${questionOptionId} AND isDeleted = 0`;
        return sql;
    }

    static deleteQuestionOptionByIdSQL(questionId) {
        let sql = `DELETE FROM questionoption WHERE questionIdFK = ${questionId}`;
        return sql;
    }

    static deleteQuestionByIdSQL(questionId) {
        let sql = `DELETE FROM question WHERE questionId = ${questionId}`;
        return sql;
    }

    static deleteOptionByIdSQL(questionOptionId) {
        let sql = `DELETE FROM questionoption WHERE questionOptionId = ${questionOptionId}`;
        return sql;
    }

    static getQuestionByIdSQL(questionId) {
        let sql = `SELECT q.questionId,q.title as questionDescription,q.questionTypeIdFK,q1.title as questionType,isCompulsory 
                   FROM question q JOIN questiontype q1 ON q.questionTypeIdFK = q1.questionTypeId 
                   WHERE q.questionId = ${questionId} AND q.isDeleted = 0`
        return sql;
    }

    static getQuestionOptionByIdSQL(questionId) {
        let sql = `SELECT questionOptionId,title as optionTitle,isDanger,referQuestionId,IF(referQuestionId = 0, 0,1) AS hasLinkedQuestion 
                   FROM questionoption WHERE questionIdFK = ${questionId} AND isDeleted = 0 ORDER BY questionOptionId DESC`;
        return sql;
    }

    static getLinkedQuestionsByIdSQL(questionId) {
        let sql = `SELECT q.questionId,q.title as questionDescription
        FROM question q JOIN questiontype q1 ON q.questionTypeIdFK = q1.questionTypeId 
        WHERE q.questionId = ${questionId} AND q.isDeleted = 0`;
        return sql;
    }

    static getChecklistQuesWithoutPaginationSQL(checkListId) {
        let sql = `SELECT c.checklistId,q.questionId,qt.title as questionType,q.title as questionDescription 
                 FROM question q JOIN questiontype qt on q.questionTypeIdFK = qt.questionTypeId
                 JOIN checklist c on q.checkListIdFK = c.checklistId
                 WHERE c.checklistId = ${checkListId} AND q.isDeleted = 0  ORDER BY q.createdOn DESC`;
        return sql;
    }
}
module.exports = Question;