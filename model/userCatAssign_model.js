class UserAssign {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllAssignUsersByCategoryIdSQL(categoryId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT uc.userCatAssignmentId,uc.userIdFK,u.firstName,u.lastName,a1.title as assignmentType 
                   FROM usercatassignment uc JOIN assignmenttype a1 ON uc.assignmentTypeIdFK = a1.assignmentTypeId 
                   JOIN user u ON uc.userIdFK = u.userId
                   JOIN category c ON uc.masterIdFK = c.categoryId
                   WHERE c.categoryId = ${categoryId} AND uc.assignmentTypeIdFK = 1 AND uc.isDeleted = 0 ORDER BY uc.createdOn DESC ${limitString}`;
        return sql;
    }

    static getAllAssignUsersByAssetIdSQL(assetId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT uc.userCatAssignmentId,uc.userIdFK,u.firstName,u.lastName,a1.title as assignmentType 
                   FROM usercatassignment uc JOIN assignmenttype a1 ON uc.assignmentTypeIdFK = a1.assignmentTypeId 
                   JOIN user u ON uc.userIdFK = u.userId
                   JOIN asset a ON uc.masterIdFK = a.assetId
                   WHERE a.assetId = ${assetId} AND uc.assignmentTypeIdFK = 3 AND uc.isDeleted = 0 ORDER BY uc.createdOn DESC ${limitString}`;
        return sql;
    }

    static getAllAssignedUsersSearchByCategory(categoryId, keyword) {
        let sql = `SELECT uc.userCatAssignmentId,uc.userIdFK,u.firstName,u.lastName,a.title as assignmentType
                   FROM usercatassignment uc JOIN assignmenttype a on uc.assignmentTypeIdFK = a.assignmentTypeId 
                   JOIN user u ON uc.userIdFK = u.userId
                   JOIN category c ON uc.masterIdFK = c.categoryId
                   WHERE c.categoryId = ${categoryId} AND uc.assignmentTypeIdFK = 1 AND CONCAT(u.firstName, '' , u.lastName) LIKE '%${keyword}%' AND uc.isDeleted = 0`;
        return sql;
    }

    static getAllAssignedUsersSearchByAsset(assetId, keyword) {
        let sql = `SELECT uc.userCatAssignmentId,uc.userIdFK,u.firstName,u.lastName,a1.title as assignmentType
                   FROM usercatassignment uc JOIN assignmenttype a1 on uc.assignmentTypeIdFK = a1.assignmentTypeId 
                   JOIN user u ON uc.userIdFK = u.userId
                   JOIN asset a ON uc.masterIdFK = a.assetId
                   WHERE a.assetId = ${assetId} AND uc.assignmentTypeIdFK = 3 AND CONCAT(u.firstName, '' , u.lastName) LIKE '%${keyword}%' AND uc.isDeleted = 0`;
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
        let sql = `DELETE from usercatassignment WHERE userCatAssignmentId = ${userCatAssignmentId}`;
        return sql;
    }

    static getAssignmentTypeList() {
        let sql = `SELECT assignmentTypeId,title FROM assignmenttype WHERE isDeleted = 0`;
        return sql;
    }

    static getAllAssignUsersByCategoryId(categoryId) {

        let sql = `SELECT uc.userCatAssignmentId,uc.userIdFK,u.firstName,u.lastName,a1.title as assignmentType 
                   FROM usercatassignment uc JOIN assignmenttype a1 ON uc.assignmentTypeIdFK = a1.assignmentTypeId 
                   JOIN user u ON uc.userIdFK = u.userId
                   JOIN category c ON uc.masterIdFK = c.categoryId
                   WHERE c.categoryId = ${categoryId} AND uc.assignmentTypeIdFK = 1 AND uc.isDeleted = 0 ORDER BY uc.createdOn DESC`;
        return sql;
    }

    static getAllAssignUsersByAssetId(assetId) {

        let sql = `SELECT uc.userCatAssignmentId,uc.userIdFK,u.firstName,u.lastName,a1.title as assignmentType 
                   FROM usercatassignment uc JOIN assignmenttype a1 ON uc.assignmentTypeIdFK = a1.assignmentTypeId 
                   JOIN user u ON uc.userIdFK = u.userId
                   JOIN asset a ON uc.masterIdFK = a.assetId
                   WHERE a.assetId = ${assetId} AND uc.assignmentTypeIdFK = 3 AND uc.isDeleted = 0 ORDER BY uc.createdOn DESC`;
        return sql;
    }

}
module.exports = UserAssign;