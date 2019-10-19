import { DATABASE } from "../config/constants";
class Checklist{
    constructor(obj){
        obj && Object.assign(this, obj)
    }

    static getAllChecklistsSQL(organizationIdFK,limit=0, start=0) {
        let startLimit = limit*start;

        let limitString = (limit>0) ? `LIMIT ${startLimit}, ${limit}`: '';

        let sql = `SELECT c.checklistId,c.title,c1.title as categoryTitle,o.organizationName FROM checklist c
                   JOIN category c1 ON c.categoryIdFK = c1.categoryId
                   JOIN organization o ON c.organizationIdFK = o.organizationId
                   WHERE c.organizationIdFK = ${organizationIdFK} AND c.isDeleted = 0 ORDER BY c.createdOn DESC ${limitString}`;
        return sql;
    }

    static getChecklistByIdSQL(checklistId) {
        let sql = `SELECT c.checklistId,c.title,c1.title as categoryTitle FROM checklist c
                    JOIN category c1 ON c.categoryIdFK = c1.categoryId WHERE c.isDeleted = 0 AND c.checklistId = ${checklistId}`;
        return sql;
    }

    addChecklistSQL()    {
        let sql = `INSERT into checklist (title,organizationIdFK,categoryIdFK) 
                    VALUES ('${this.title}',${this.organizationIdFK},${this.categoryIdFK})`;
        return sql;
    }

    updateChecklistByIdSQL(checklistId) {
        let sql = `UPDATE checklist SET  
        title = '${this.title}',
        categoryIdFK = '${this.categoryIdFK}'

        WHERE checklistId = ${checklistId}`;
        return sql;
    }

    static deleteChecklistByIdSQL(checklistId) {
        let sql = `UPDATE checklist SET  
        isDeleted = 1 
        WHERE checklistId = ${checklistId}`;
        return sql;
    }
    
    static checkChecklistId(checklistId) {
        let sql = `SELECT checklistId FROM checklist WHERE checklistId = ${checklistId} AND isDeleted = 0`;
        return sql;
    }
}
export default Checklist;