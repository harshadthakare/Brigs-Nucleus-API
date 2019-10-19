import { DATABASE } from "../config/constants";
class UserAssign {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllAssignUsersSQL(limit=0, start=0) {
        let startLimit = limit*start;

        let limitString = (limit>0) ? `LIMIT ${startLimit}, ${limit}`: '';

        let sql = `SELECT uc.userCatAssignmentId,a.title as assignmentType,uc.userIdFK,CONCAT(u.firstName,' ',u.lastName)as userName,c.title as categoryName 
                   FROM usercatassignment uc JOIN assignmenttype a on uc.assignmentTypeIdFK = a.assignmentTypeId 
                   JOIN user u ON uc.userIdFK = u.userId
                   JOIN category c ON uc.masterIdFK = c.categoryId
                   WHERE uc.isDeleted = 0 ORDER BY uc.createdOn DESC ${limitString}`;           
        return sql;
    }

    addAssignUserSQL(userIdFK) {

        let sql = `INSERT into usercatassignment (userIdFK, assignmentTypeIdFK, masterIdFK) 
                    VALUES (${userIdFK}, ${this.assignmentTypeIdFK}, ${this.masterIdFK})`;
        return sql;
    }

    static checkAssignUserId(userCatAssignmentId) {
        let sql = `SELECT userCatAssignmentId FROM usercatassignment WHERE userCatAssignmentId = ${userCatAssignmentId} AND isDeleted = 0`;
        return sql;
    }

    static deleteAssignedUserByIdSQL(userCatAssignmentId) {
        let sql = `UPDATE usercatassignment SET  
        isDeleted  = 1 
        WHERE userCatAssignmentId = ${userCatAssignmentId}`;
        return sql;
    }

    static getAssignmentTypeList(){
        let sql = `SELECT assignmentTypeId,title FROM assignmenttype WHERE isDeleted = 0`;
        return sql;
    }
}
export default UserAssign;