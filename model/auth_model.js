import {BASE_URL} from "../config/constants";
class Auth {
    
    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    getAdminByAuthSQL() {
        let sql = `SELECT a.adminId,a.firstName,a.lastName,a.mobileNumber,a.emailId,a.organizationIdFK,o.organizationName 
                   FROM admin a JOIN organization o on a.organizationIdFK = o.organizationId WHERE a.emailId ='${this.emailId}' AND a.password= '${this.password}'`;
        return sql;           
    } 

    static getUserByIdSQL(email) {
        let sql = `SELECT * FROM admin WHERE emailId ='${email}' AND isDeleted = 0`
        return sql;           
    }

    static getUserByNoSQL(mobile_number) {
        let sql = `SELECT * FROM admin WHERE mobileNumber ='${mobile_number}' AND isDeleted = 0`
        return sql;           
    }

    static updateOTPByEmailSQL(otp,email){
        let sql = `UPDATE admin SET otp = '${otp}' WHERE emailId='${email}'`
        return sql;
    }

    getUserEmailOtp(){
        let sql = `SELECT * FROM admin WHERE emailId ='${this.email}' AND otp='${this.otp}' AND isDeleted=0`
        return sql;   
    }
    
    static updatePasswordByIdSQL(newPassword,email,otp){
        let sql = `UPDATE admin SET password = '${newPassword}' WHERE emailId='${email}' AND otp='${otp}'`
        return sql; 
    }

    static updatePasswordByNoSQL(newPassword,mobileNumber){
        let sql = `UPDATE admin SET password = '${newPassword}' WHERE mobileNumber= '${mobileNumber}'`
        return sql; 
    }
}
export default Auth;