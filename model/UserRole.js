class UserRole {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllUserRolesSQL(organizationIdFK,limit=0, start=0) {
        let startLimit = limit*start;

        let limitString = (limit>0) ? `LIMIT ${startLimit}, ${limit}`: '';

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
}
module.exports = UserRole;