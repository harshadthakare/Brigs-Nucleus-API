import { DATABASE } from "../config/constants";
class Dept {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllDeptSQL(parentId, organizationIdFK) {
        let rootSql = `SELECT dept.departmentId,dept.departmentTitle,
                       (SELECT COUNT(dept1.departmentId) FROM department AS dept1 WHERE dept1.isDeleted = 0 AND dept1.parentId = dept.departmentId AND dept1.parentId != dept1.departmentId AND dept1.organizationIdFK = ${organizationIdFK}) As isChild
                       FROM department as dept WHERE dept.departmentId = dept.parentId AND dept.organizationIdFK = ${organizationIdFK} AND dept.isDeleted = 0`;
        let childSql = `SELECT dept.departmentId,dept.departmentTitle,
                       (SELECT COUNT(dept1.departmentId) FROM department AS dept1 WHERE dept1.isDeleted = 0 AND dept1.parentId = dept.departmentId AND dept1.parentId != dept1.departmentId AND dept1.organizationIdFK = ${organizationIdFK}) As isChild 
                       FROM department as dept WHERE dept.parentId = ${parentId} AND dept.organizationIdFK = ${organizationIdFK} AND dept.departmentId != ${parentId} AND dept.isDeleted = 0`;
        if(!parentId || parentId == 0)
        {
            return rootSql;
        }
        else
        {
            return childSql;
        }
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

        let sql = `INSERT into DEPARTMENT (parentId, departmentTitle, organizationIdFK) 
                    VALUES (if(${this.parentId}=0,(SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "${DATABASE}" AND TABLE_NAME = "DEPARTMENT"),
                    ${this.parentId}), '${this.departmentTitle}', ${this.organizationIdFK})`;
        return sql;
    }

    static deleteDeptByIdSQL(departmentId) {
        let sql = `UPDATE DEPARTMENT SET  
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
export default Dept;