const { DATABASE } = require("../config/constants");
class Dept {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllDeptSQL(organizationIdFK) {
        let sql = `SELECT departmentId,departmentTitle,parentId FROM department WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;               
    }

    static getDeptByIdSQL(departmentId) {
        let sql = `SELECT d.departmentId,d.departmentTitle FROM department d  
                   JOIN organization o ON d.organizationIdFK = o.organizationId WHERE d.isDeleted = 0 AND d.departmentId = ${departmentId}`;
        return sql;
    }

    static getOrganizationId(adminId) {
        let sql = `SELECT o.organizationId FROM  admin a 
        join department d on a.departmentIdFK = d.departmentId 
        join organization o on d.organizationIdFK = o.organizationId  
        WHERE a.adminId =  ${adminId}`;
        return sql;
    }

    addDeptSQL() {

        let sql = `INSERT into department (parentId, departmentTitle, organizationIdFK) 
                    VALUES (if(${this.parentId}=0,(SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "${DATABASE}" AND TABLE_NAME = "department"),
                    ${this.parentId}), '${this.departmentTitle}', ${this.organizationIdFK})`;
        return sql;
    }

    static deleteDeptByIdSQL(departmentId) {
        let sql = `UPDATE department SET  
        isDeleted = 1 
        WHERE departmentId = ${departmentId}`;
        return sql;
    }

    updateDeptByIdSQL(departmentId) {
        let sql = `UPDATE department SET  
        parentId = if(${this.parentId}=0, ${departmentId}, ${this.parentId}), 
        departmentTitle = '${this.departmentTitle}'
        WHERE departmentId = ${departmentId}`;
        return sql;
    }

    static checkDepartmentId(departmentId) {
        let sql = `SELECT departmentId FROM department WHERE departmentId = ${departmentId} AND isDeleted = 0`;
        return sql;
    }

    static getDeptSQL(organizationIdFK) {
        let sql = `SELECT departmentId,departmentTitle FROM department WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }
}
module.exports = Dept;