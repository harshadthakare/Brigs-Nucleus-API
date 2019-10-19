import {BASE_URL} from "../config/constants";
class User {
    
    constructor(obj) {
      obj && Object.assign(this,obj)
    }

    static getAllUserSQL(deptId, limit=0, start=0) {
        let startLimit = limit*start;

        let limitString = (limit>0) ? `LIMIT ${startLimit}, ${limit}`: '';    
        
        let sql = `SELECT u.userId,CONCAT(u.firstName ,' ', u.lastName)as userName,u.userRoleIdFK,ur.title,CONCAT('${BASE_URL}','',u.profileImage) as profileImage,d.departmentTitle,u.mobileNumber,
                   u.emailId FROM user u 
                   LEFT JOIN department d ON u.departmentIdFK = d.departmentId 
                   JOIN userrole ur ON u.userRoleIdFK = ur.userRoleId
                   WHERE u.departmentIdFK = ${deptId} AND u.isDeleted = 0 ORDER BY u.createdOn DESC ${limitString}`
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
}
export default User;