const { BASE_URL } = require("../config/constants");
class User {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllUserSQL(deptId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT u.userId,u.firstName,u.lastName,u.userRoleIdFK,ur.title as userRole,CONCAT('${BASE_URL}','',u.profileImage) as profileImage,u.departmentIdFK,d.departmentTitle,
                   u.mobileNumber,u.emailId,u.password,IF(u.isActive = 1, 'true','false') AS isActive FROM user u 
                   LEFT JOIN department d ON u.departmentIdFK = d.departmentId 
                   JOIN userrole ur ON u.userRoleIdFK = ur.userRoleId
                   WHERE u.departmentIdFK = ${deptId} AND u.isDeleted = 0 ORDER BY u.createdOn DESC ${limitString}`
        return sql;
    }

    static getAllUserSearchSQL(departmentId, keyword) {
        let sql = `SELECT u.userId,u.firstName,u.lastName,u.userRoleIdFK,ur.title as userRole,CONCAT('${BASE_URL}','',u.profileImage) as profileImage,d.departmentTitle,u.mobileNumber,
                   u.emailId,IF(u.isActive = 1, 'true','false') AS isActive FROM user u 
                   LEFT JOIN department d ON u.departmentIdFK = d.departmentId 
                   JOIN userrole ur ON u.userRoleIdFK = ur.userRoleId
                   WHERE u.departmentIdFK = ${departmentId} AND CONCAT(u.firstName, '' , u.lastName) LIKE '%${keyword}%' AND u.isDeleted = 0`;
        return sql;
    }

    static getUserByIdSQL(userId) {
        let sql = `SELECT u.userId,CONCAT(u.firstName ,' ', u.lastName)as userName,u.userRoleIdFK,ur.title,CONCAT('${BASE_URL}','',u.profileImage) as profileImage,d.departmentTitle,u.mobileNumber,u.emailId FROM user u 
                   LEFT JOIN department d ON u.departmentIdFK = d.departmentId
                   JOIN userrole ur ON u.userRoleIdFK = ur.userRoleId
                   WHERE u.isDeleted = 0 AND userId = ${userId}`;
        return sql;
    }

    addUserSQL() {
        let sql = `INSERT INTO user(firstName,
            lastName,
            userRoleIdFK,
            profileImage,
            departmentIdFK,
            mobileNumber,
            emailId,
            password)
            VALUES('${this.firstName}',
                    '${this.lastName}',
                    ${this.userRoleIdFK},
                    '${this.profileImage}',
                    ${this.departmentIdFK},
                    '${this.mobileNumber}',
                    '${this.emailId}',
                    '${this.password}')`;
        return sql;
    }

    updateUserByIdSQL(userId) {
        let sql = `UPDATE user SET
            firstName = '${this.firstName}',
            lastName = '${this.lastName}',
            userRoleIdFK = ${this.userRoleIdFK},
            profileImage = '${this.profileImage}',
            departmentIdFK = ${this.departmentIdFK},
            mobileNumber ='${this.mobileNumber}',
            emailId ='${this.emailId}',
            password ='${this.password}' 
            
            WHERE userId = ${userId}`
        return sql;
    }

    static checkUserId(userId) {
        let sql = `SELECT userId FROM user WHERE userId = ${userId} AND isDeleted = 0`;
        return sql;
    }

    static deleteUserByIdSQL(userId) {
        let sql = `UPDATE user SET  
            isDeleted  = 1 
            WHERE userId = ${userId}`;
        return sql;
    }

    static getUserRoleList(organizationIdFK) {
        let sql = `SELECT userRoleId,title FROM userrole WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }

    static getUsersList(organizationIdFK) {
        let sql = `SELECT u.userId as userIdFK,u.firstName,u.lastName 
        FROM user u INNER JOIN department d ON u.departmentIdFK=d.departmentId
        INNER JOIN organization o ON d.organizationIdFK = o.organizationId 
        WHERE u.isDeleted = 0 AND o.organizationId = ${organizationIdFK}`;
        return sql;
    }

    static getUserAssignedOrNot(userId) {
        let sql = `SELECT u.userId,u1.userCatAssignmentId FROM usercatassignment u1 JOIN user u ON u1.userIdFK = u.userId WHERE u.userId = ${userId}`;
        return sql;
    }

    updateUserIsActiveStatusSQL(userId) {
        let sql = `UPDATE user set isActive = ${this.isActive} WHERE userId = ${userId}`;
        return sql;
    }
}

module.exports = User;