import {BASE_URL} from "../config/constants";
class Profile{
    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAdminProfile(aId)
    {
        let sql = `SELECT a.adminId,CONCAT(a.firstName,' ',a.lastName)as adminName,a.mobileNumber,a.emailId,o.organizationName from admin a 
                   JOIN organization o ON a.organizationIdFK = o.organizationId WHERE a.adminId = ${aId}`;
        return sql;
    }

    static getPerAdminData(password)
    {
        let sql = `SELECT adminId,password from admin WHERE password = '${password}'`;
        return sql;
    }

    static updatePasswordById(newPassword,aId,password){
        let sql = `UPDATE admin SET password = '${newPassword}' WHERE adminId = '${aId}' AND password = '${password}'`
        return sql; 
    }
}
export default Profile;