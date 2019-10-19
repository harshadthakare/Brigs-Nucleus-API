import { DATABASE } from "../config/constants";
class Question {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }
    static getQuestionCountByChecklistSQL(organizationIdFK,categoryIdFK,limit = 0, start = 0){
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT checklistId,title as checklistTitle,
                   (SELECT COUNT(questionId) FROM question  WHERE checkListIdFK = checklistId AND isDeleted = 0)AS totalQuestions 
                   FROM checklist c WHERE organizationIdFK = ${organizationIdFK} AND categoryIdFK =${categoryIdFK} AND isDeleted = 0 ORDER BY createdOn DESC ${limitString} `;
        return sql;

    }

    static getQuestionOptionSQL(questionIdFK){
        let sql = `SELECT title,isDanger FROM questionoption WHERE questionIdFK = ${questionIdFK} AND isDeleted = 0`;
        return sql;
    }
    static getAllQuestionsSQL(checkListId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT c.checklistId,q.questionId,qt.title as questionType,q.title as questionDescription 
            FROM question q JOIN questiontype qt on q.questionTypeIdFK = qt.questionTypeId
            JOIN checklist c on q.checkListIdFK = c.checklistId
            WHERE c.checklistId = ${checkListId} AND q.isDeleted = 0  ORDER BY q.createdOn DESC ${limitString}`;
        return sql;
    }

    addQuestionSQL() {
        let sql = `INSERT into question (title,questionTypeIdFK,checkListIdFK) 
                VALUES ('${this.title}',${this.questionTypeIdFK},${this.checkListIdFK})`;
        return sql;
    }
    addQuestionOptionSQL(questionIdFK) {
        let sql = `INSERT into questionoption(questionIdFK,title,isDanger) VALUES (${questionIdFK},'${this.optionTitle}',${this.isDanger})`;
        return sql;
    }
    static checkQuestionById(questionId) {
        let sql = `SELECT questionId FROM question WHERE questionId = ${questionId} AND isDeleted = 0`;
        return sql;
    }
    static getQuestionType() {
        let sql = `SELECT questionTypeId as questionTypeIdFK ,title FROM questiontype WHERE isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }

    updateQuestionByIdSQL(questionId) {
        let sql = `UPDATE question SET 
                    title            = '${this.title}',
                    questionTypeIdFK = ${this.questionTypeIdFK},
                    checkListIdFK    = ${this.checkListIdFK}
        WHERE questionId = ${questionId}`;
        return sql;
    }

    updateQuestionOptionSQL(questionOptionId) {
        let sql = `UPDATE questionoption SET
                    title = '${this.optionTitle}',
                    isDanger = ${this.isDanger}
        WHERE questionOptionId = ${questionOptionId}`;
        return sql;
    }

    static deleteQuestionOptionByIdSQL(questionId){
        let sql = `DELETE FROM questionoption WHERE questionIdFK = ${questionId}`;
        return sql;
    }
    
    static deleteQuestionByIdSQL(questionId){
        let sql = `DELETE FROM question WHERE questionId = ${questionId}`;
        return sql;
    }

    static checkChecklistIdSQL(checklistId) {
        let sql = `SELECT checklistId FROM checklist WHERE checklistId = ${checklistId} AND isDeleted = 0`;
        return sql;
    }
}
export default Question;