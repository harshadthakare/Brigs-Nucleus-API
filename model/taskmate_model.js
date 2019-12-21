const { BASE_URL } = require("../config/constants");
class Taskmate {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static addTaskmateImageSQL(complaintId, complaintImage) {
        let sql = `INSERT INTO complaintimages(complaintIdFK,imageName)VALUES('${complaintId}','${complaintImage}')`;
        return sql;
    }

    addTaskSQL(adminId) {
        let sql = `INSERT INTO complaint (typeOfComplaintFK, assetIdFK, complaintStatusIdFK, title, message, typeOfUserIdFK, raiseBy, organizationIdFK) 
        VALUES (1, 0, 2, '${this.title}',"${this.message}", 2 ,${adminId}, ${this.organizationIdFK})`;
        return sql;
    }

    addTaskTrackingSQL(complaintIdFK, userIdFK) {
        let sql = `INSERT INTO complainttrack (complaintIdFK, complaintStatusIdFK, typeOfUserIdFK, masterId)
                    VALUES (${complaintIdFK}, 2, 3,${userIdFK})`;
        return sql;
    }

    addResponsiblePersonSQL(complaintIdFK, userIdFK) {
        let sql = `INSERT INTO responsibleperson (complaintIdFK, userIdFK )
                    VALUES (${complaintIdFK},${userIdFK})`;
        return sql;
    }

    static getAllTasksSQL(organizationIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT c.complaintId,c.title,tc.title as typeOfComplaint,cs.title as complaintStatus,tu.title as typeOfUser,
                  (SELECT CONCAT('${BASE_URL}','',ci.imageName) as complaintImage from complaintimages ci where ci.complaintIdFK = c.complaintId LIMIT 1) as complaintImage, 
                   DATE_FORMAT(c.createdOn, '%d %M %Y %h:%i %p')as createdDate,  
                   CASE 
                       WHEN c.typeOfUserIdFK = 1 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM superadmin WHERE superAdminId = c.raiseBy)
                       WHEN c.typeOfUserIdFK = 2 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM admin WHERE adminId = c.raiseBy)
                       WHEN c.typeOfUserIdFK = 3 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM user WHERE userId = c.raiseBy)
                   END AS raisedByName
                   FROM complaint c JOIN complaintstatus cs ON cs.complaintStatusId = c.complaintStatusIdFK
                   JOIN typeofuser tu ON c.typeOfUserIdFK = tu.typeOfUserId
                   JOIN typeofcomplaint tc ON c.typeOfComplaintFK = tc.typeComplaintId
                   WHERE c.organizationIdFK = ${organizationIdFK} AND c.isDeleted = 0 AND c.typeOfComplaintFK = 1 ORDER BY c.createdOn DESC ${limitString}`;
        return sql;
    }

    static getTaskCount(organizationIdFK) {
        let sql = `SELECT COUNT(complaintId) AS totalTasks FROM complaint where organizationIdFK = ${organizationIdFK} AND typeOfComplaintFK = 1 AND isDeleted = 0`;
        return sql;
    }

    static getAllTasksSearchSQL(organizationIdFK, keyword) {
        let sql = `SELECT c.complaintId,c.title,tc.title as typeOfComplaint,cs.title as complaintStatus,tu.title as typeOfUser,
                   (SELECT CONCAT('${BASE_URL}','',ci.imageName) as complaintImage from complaintimages ci where ci.complaintIdFK = c.complaintId LIMIT 1) as complaintImage,
                   DATE_FORMAT(c.createdOn, '%d %M %Y %h:%i %p')as createdDate,
                   CASE 
                       WHEN c.typeOfUserIdFK = 1 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM superadmin WHERE superAdminId = c.raiseBy)
                       WHEN c.typeOfUserIdFK = 2 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM admin WHERE adminId = c.raiseBy)
                       WHEN c.typeOfUserIdFK = 3 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM user WHERE userId = c.raiseBy)
                   END AS raisedByName
                   FROM complaint c JOIN complaintstatus cs ON cs.complaintStatusId = c.complaintStatusIdFK
                   JOIN typeofuser tu ON c.typeOfUserIdFK = tu.typeOfUserId
                   JOIN typeofcomplaint tc ON c.typeOfComplaintFK = tc.typeComplaintId
                   WHERE c.organizationIdFK = ${organizationIdFK} AND c.title LIKE '%${keyword}%' AND c.isDeleted = 0 AND c.typeOfComplaintFK = 1`;
        return sql;
    }

    static getParticularTaskByIdSQL(complaintId) {
        let sql = `SELECT ct.title as typeOfComplaint,c.title,cs.title as complaintStatus,tu.title as typeOfUser,c.message,
                   CONCAT('${BASE_URL}','',ci.imageName) as complaintImage,
                   DATE_FORMAT(c.createdOn, '%d %M %Y %h:%i %p')as createdDate,
                   CASE 
                       WHEN c.typeOfUserIdFK = 1 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM superadmin WHERE superAdminId = c.raiseBy)
                       WHEN c.typeOfUserIdFK = 2 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM admin WHERE adminId = c.raiseBy)
                       WHEN c.typeOfUserIdFK = 3 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM user WHERE userId = c.raiseBy)
                   END AS raisedByName
                   FROM complaint c JOIN typeofcomplaint ct ON ct.typeComplaintId = c.typeOfComplaintFK
                   JOIN complaintstatus cs ON cs.complaintStatusId = c.complaintStatusIdFK
                   JOIN typeofuser tu ON c.typeOfUserIdFK = tu.typeOfUserId
                   LEFT JOIN complaintimages ci ON ci.complaintIdFK = c.complaintId
                   WHERE c.complaintId = ${complaintId} AND c.isDeleted = 0 AND c.typeOfComplaintFK = 1`;
        return sql;
    }

    static deleteTaskSQL(complaintId) {
        let sql = `UPDATE complaint SET isDeleted = 1 WHERE complaintId = ${complaintId}`;
        return sql;
    }

    static deleteResponsiblePersonSQL(complaintId) {
        let sql = `UPDATE responsibleperson SET isDeleted = 1 WHERE complaintIdFK = ${complaintId}`;
        return sql;
    }

    static deleteTaskTrackSQL(complaintId) {
        let sql = `UPDATE complainttrack SET isDeleted = 1 WHERE complaintIdFK = ${complaintId}`;
        return sql;
    }

    static getTaskTrackListSQL(complaintId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT IF(u.profileImage='' || profileImage is NULL ,CONCAT('${BASE_URL}','user.png'), CONCAT('${BASE_URL}',u.profileImage)) as userProfile,
                   tc.title as typeOfComplaint,tu.title AS typeOfUser,CONCAT(u.firstName,' ',u.lastName)as userName,DATE_FORMAT(ct.createdOn, '%d %M %Y %h:%i %p')as createdDate,
                   cs.title as complaintStatus FROM complainttrack ct 
                   JOIN complaint c ON ct.complaintIdFK = c.complaintId 
                   JOIN typeofcomplaint tc ON c.typeOfComplaintFK = tc.typeComplaintId 
                   JOIN complaintstatus cs ON ct.complaintStatusIdFK = cs.complaintStatusId 
                   JOIN typeofuser tu ON ct.typeOfUserIdFK = tu.typeOfUserId 
                   JOIN user u ON ct.masterId = u.userId 
                   WHERE ct.complaintIdFK = ${complaintId} AND c.typeOfComplaintFK = 1 AND ct.typeOfUserIdFK = 3 AND ct.isDeleted = 0 ORDER BY c.createdOn DESC ${limitString} `;
        return sql;
    }

    static getTaskTrackSearch(complaintId, keyword) {
        let sql = `SELECT IF(u.profileImage='' || profileImage is NULL ,CONCAT('${BASE_URL}','user.png'), CONCAT('${BASE_URL}',u.profileImage)) as userProfile,
                   tc.title as typeOfComplaint,tu.title AS typeOfUser,CONCAT(u.firstName,' ',u.lastName)as userName,DATE_FORMAT(ct.createdOn, '%d %M %Y %h:%i %p')as createdDate,
                   cs.title as complaintStatus FROM complainttrack ct 
                   JOIN complaint c ON ct.complaintIdFK = c.complaintId 
                   JOIN typeofcomplaint tc ON c.typeOfComplaintFK = tc.typeComplaintId 
                   JOIN complaintstatus cs ON ct.complaintStatusIdFK = cs.complaintStatusId 
                   JOIN typeofuser tu ON ct.typeOfUserIdFK = tu.typeOfUserId 
                   JOIN user u ON ct.masterId = u.userId 
                   WHERE ct.complaintIdFK = ${complaintId} AND c.typeOfComplaintFK = 1 AND ct.typeOfUserIdFK = 3 AND CONCAT(u.firstName, '' , u.lastName) LIKE '%${keyword}%' AND ct.isDeleted = 0`;
        return sql;
    }

    updateTaskStatusByIdSQL(complaintId) {
        let sql = `UPDATE complainttrack SET complaintStatusIdFK = ${this.complaintStatusIdFK} WHERE complaintIdFK = ${complaintId}`;
        return sql;
    }

    static getTransferTaskListSQL(complaintId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT tc.transferComplaintId,c.complaintId,c.title AS complaintTitle,CONCAT(u1.firstName,' ',u1.lastName)AS fromUser,CONCAT(u.firstName,' ',u.lastName)AS toUser,
                   ts.title as transferStatus,DATE_FORMAT(tc.createdOn, '%d %M %Y %h:%i %p')as createdDate FROM transfercomplaint tc 
                   JOIN complaint c ON tc.complaintIdFK = c.complaintId 
                   JOIN user u ON tc.toUserIdFK = u.userId 
                   JOIN user u1 ON tc.fromUserIdFK = u1.userId
                   JOIN transferstatus ts ON tc.transferStatusIdFK = ts.transferStatusId 
                   WHERE tc.complaintIdFK = ${complaintId} AND c.typeOfComplaintFK = 1 AND tc.isDeleted = 0 ORDER BY tc.createdOn DESC ${limitString}`;
        return sql;
    }

    static getTaskTransferSearch(complaintId, keyword) {
        let sql = `SELECT tc.transferComplaintId,c.complaintId,c.title AS complaintTitle,CONCAT(u1.firstName,' ',u1.lastName)AS fromUser,CONCAT(u.firstName,' ',u.lastName)AS toUser,
                   ts.title as transferStatus,DATE_FORMAT(tc.createdOn, '%d %M %Y %h:%i %p')as createdDate FROM transfercomplaint tc 
                   JOIN complaint c ON tc.complaintIdFK = c.complaintId 
                   JOIN user u ON tc.toUserIdFK = u.userId 
                   JOIN user u1 ON tc.fromUserIdFK = u1.userId
                   JOIN transferstatus ts ON tc.transferStatusIdFK = ts.transferStatusId 
                   WHERE tc.complaintIdFK = ${complaintId} AND c.typeOfComplaintFK = 1 AND CONCAT(u1.firstName, '' , u1.lastName) LIKE '%${keyword}%' OR CONCAT(u.firstName, '' , u.lastName) LIKE '%${keyword}%' AND tc.isDeleted = 0`;
        return sql;
    }

    addTransferTaskSQL(complaintId) {
        let sql = `INSERT INTO transfercomplaint(complaintIdFK,fromUserIdFK,toUserIdFK,transferStatusIdFK)VALUES('${complaintId}',${this.fromUserIdFK},${this.toUserIdFK},1)`;
        return sql;
    }

    updateTransferStatusByIdSQL(complaintId) {
        let sql = `UPDATE transfercomplaint SET transferStatusIdFK = ${this.transferStatusIdFK} WHERE complaintIdFK = ${complaintId}`;
        return sql;
    }

    static deleteTransferTaskByIdSQL(complaintId) {
        let sql = `UPDATE transfercomplaint SET isDeleted = 1 WHERE complaintIdFK = ${complaintId}`;
        return sql;
    }
    static getPendingTasksSQL(organizationIdFK, limit) {

        let limitString = (limit > 0 && limit !== 0) ? `LIMIT 0, ${limit}` : '';

        let sql = `SELECT c.complaintId,c.title,tc.title as typeOfComplaint,cs.title as complaintStatus,tu.title as typeOfUser,
                  (SELECT CONCAT('${BASE_URL}','',ci.imageName) as complaintImage from complaintimages ci where ci.complaintIdFK = c.complaintId LIMIT 1) as complaintImage, 
                   DATE_FORMAT(c.createdOn, '%d %b %Y %h:%i %p')as createdDate,  
                   CASE 
                       WHEN c.typeOfUserIdFK = 1 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM superadmin WHERE superAdminId = c.raiseBy)
                       WHEN c.typeOfUserIdFK = 2 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM admin WHERE adminId = c.raiseBy)
                       WHEN c.typeOfUserIdFK = 3 THEN (SELECT CONCAT(firstName ,' ', lastName)as raiseByName FROM user WHERE userId = c.raiseBy)
                   END AS raisedByName
                   FROM complaint c JOIN complaintstatus cs ON cs.complaintStatusId = c.complaintStatusIdFK
                   JOIN typeofuser tu ON c.typeOfUserIdFK = tu.typeOfUserId
                   JOIN typeofcomplaint tc ON c.typeOfComplaintFK = tc.typeComplaintId
                   WHERE c.complaintStatusIdFK = 6 AND c.organizationIdFK = ${organizationIdFK} AND c.isDeleted = 0 AND c.typeOfComplaintFK = 1 ORDER BY c.createdOn DESC ${limitString}`;
        return sql;
    }
}
module.exports = Taskmate;