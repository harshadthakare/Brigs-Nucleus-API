class Admin {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllAdminsSQL(limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT a.adminId,CONCAT(a.firstName ,' ', a.lastName)as adminName,o.organizationName,a.mobileNumber,a.emailId,a.password,a.firstName,a.lastName,a.organizationIdFK FROM admin a 
        LEFT JOIN organization o ON a.organizationIdFK = o.organizationId 
        WHERE a.isDeleted = 0 ORDER BY a.createdOn DESC ${limitString}`;
        return sql;
    }

    static getAllAdminsSearchSQL(keyword) {
        let sql = `SELECT a.adminId,CONCAT(a.firstName ,' ', a.lastName)as adminName,o.organizationName,a.mobileNumber,a.emailId,a.password FROM admin a 
                    LEFT JOIN organization o ON a.organizationIdFK = o.organizationId 
                    WHERE CONCAT(a.firstName , '',a.lastName) LIKE '%${keyword}%' AND a.isDeleted = 0`;
        return sql;
    }

    addAdminSQL() {
        let sql = `INSERT INTO admin (firstName,lastName,organizationIdFK,mobileNumber,emailId,password)
                   values ('${this.firstName}', 
                           '${this.lastName}',
                            ${this.organizationIdFK},
                           '${this.mobileNumber}',
                           '${this.emailId}',
                           '${this.password}')`;
        return sql;
    }

    updateAdminSQL(adminId) {
        let sql = `UPDATE admin 
                   SET firstName = '${this.firstName}',
                       lastName  =  '${this.lastName}',
                       organizationIdFK = ${this.organizationIdFK},
                       mobileNumber = '${this.mobileNumber}',
                       emailId = '${this.emailId}',
                       password = '${this.password}'
                   WHERE adminId = ${adminId}`;
        return sql;
    }

    static deleteAdminByIdSQL(adminId) {
        let sql = `UPDATE admin SET isDeleted = 1 WHERE adminId = ${adminId}`;
        return sql;
    }

    static checkAdminId(adminId) {
        let sql = `SELECT adminId FROM admin WHERE adminId = ${adminId} AND isDeleted = 0`;
        return sql;
    }

    static getAllOrganizationListsSQL() {
        let sql = `SELECT organizationId,organizationName FROM organization WHERE isDeleted = 0`;
        return sql;
    }
}
module.exports = Admin;