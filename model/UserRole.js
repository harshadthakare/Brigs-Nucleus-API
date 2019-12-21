class UserRole {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllUserRolesSQL(organizationIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT u.userRoleId,u.title,o.organizationName FROM userrole u 
                   JOIN organization o ON u.organizationIdFK = o.organizationId WHERE u.organizationIdFK = ${organizationIdFK} AND u.isDeleted = 0 
                   ORDER BY u.createdOn DESC ${limitString}`;
        return sql;
    }

    static getUserRoleByIdSQL(userRoleId) {
        let sql = `SELECT u.userRoleId,u.title FROM userrole u 
                   JOIN organization o ON u.organizationIdFK = o.organizationId WHERE u.isDeleted = 0 AND u.userRoleId = ${userRoleId}`;
        return sql;
    }

    addUserRoleSQL() {

        let sql = `INSERT into userrole (title, organizationIdFK) 
                    VALUES ('${this.title}', ${this.organizationIdFK})`;
        return sql;
    }

    static checkUserroleId(userRoleId) {
        let sql = `SELECT userRoleId FROM userrole WHERE userRoleId = ${userRoleId} AND isDeleted = 0`;
        return sql;
    }

    updateUserRoleByIdSQL(userRoleId) {
        let sql = `UPDATE userrole SET  
        title = '${this.title}'
        WHERE userRoleId = ${userRoleId}`;
        return sql;
    }

    static deleteUserRoleByIdSQL(userRoleId) {
        let sql = `UPDATE userrole SET  
        isDeleted  = 1 
        WHERE userRoleId = ${userRoleId}`;
        return sql;
    }
    static getAllFeatureListSQL() {
        let sql = `SELECT featureId, featureCode, purpose FROM feature WHERE isDeleted = 0`;
        return sql;
    }
    static getAllFeatureListArraySQL(userRoleId) {
        let sql = `SELECT f.featureAssignmentId,f.featureIdFK,f1.featureCode,f1.purpose FROM featureassignment f
         JOIN feature f1 ON f1.featureId = f.featureIdFK 
         WHERE f.userRoleIdFK = ${userRoleId} AND f.isDeleted = 0`;
        return sql;
    }
    addFeatureAssignmentSQL(userRoleId) {
        let sql = `INSERT INTO featureassignment (featureIdFK,userRoleIdFK)
                   VALUES (${this.featureIdFK},${userRoleId})`;

        return sql;
    }
    static deleteFeatureAssignmentSQL(userRoleId) {
        let sql = `DELETE FROM featureassignment WHERE userRoleIdFK = ${userRoleId};`;
        return sql;
    }
    static getUserroleAssignedOrNot(userRoleId) {
        let sql = `SELECT u.userId,u1.title FROM user u JOIN userrole u1 ON u.userRoleIdFK = u1.userRoleId WHERE u1.userRoleId = ${userRoleId}`;
        return sql;
    }
}

module.exports = UserRole;