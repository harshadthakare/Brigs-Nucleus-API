const { BASE_URL } = require("../config/constants");
class Alert {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllAlerts(organizationIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT alertId,masterIdType as alertName,title,CONCAT('${BASE_URL}','',image) as alertImage, 
                   (SELECT COUNT(alertIdFK) FROM alerttracking WHERE isRead = 1 AND alertId = alertIdFK)as isRead, 
                   (SELECT COUNT(alertIdFK) FROM alerttracking WHERE isDeliver = 1 AND alertId = alertIdFK)as isDeliver,message 
                   FROM alert WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0 ORDER BY createdOn ASC ${limitString}`;
        return sql;
    }

    static getAllAlertSearchSQL(organizationIdFK, keyword) {
        let sql = `SELECT alertId,masterIdType as alertName,title,CONCAT('${BASE_URL}','',image) as alertImage, 
                   (SELECT COUNT(alertIdFK) FROM alerttracking WHERE isRead = 1 AND alertId = alertIdFK)as isRead, 
                   (SELECT COUNT(alertIdFK) FROM alerttracking WHERE isDeliver = 1 AND alertId = alertIdFK)as isDeliver,message 
                   FROM alert WHERE organizationIdFK = ${organizationIdFK} AND title LIKE '%${keyword}%' AND isDeleted = 0`;
        return sql;
    }

    static getAlertCount(organizationIdFK) {
        let sql = `SELECT COUNT(alertId) as totalAlerts from alert WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;
    }

    static getAlertTrackCount(alertId) {
        let sql = `SELECT COUNT(alertTrackingId) as totalAlertTrack,
                   (SELECT COUNT(alertIdFK) FROM alerttracking WHERE isRead = 1 AND alertIdFK = ${alertId})as isRead,
                   (SELECT COUNT(alertIdFK) FROM alerttracking WHERE isDeliver = 1 AND alertIdFK = ${alertId})as isDeliver 
                   FROM alerttracking WHERE isDeleted = 0 AND alertIdFK = ${alertId}`;
        return sql;
    }

    static getAlertTrackById(alertId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT a1.alertTrackingId,CONCAT('${BASE_URL}','',u.profileImage)as userImage,CONCAT(u.firstName,' ',u.lastName)as userName,isRead,isDeliver,
                   DATE_FORMAT(a1.createdOn, '%d %M %Y %h:%i %p') as readDate FROM alerttracking a1 JOIN typeofuser t ON a1.typeOfUserIdFK = t.typeOfUserId 
                   JOIN user u ON u.userId = a1.masterId 
                   WHERE a1.isDeleted = 0 AND a1.alertIdFK = ${alertId} ORDER BY a1.createdOn ASC ${limitString}`;
        return sql;
    }

    static getAlertTrackSearch(alertId, keyword) {
        let sql = `SELECT a1.alertTrackingId,CONCAT('${BASE_URL}','',u.profileImage)as userImage,CONCAT(u.firstName,' ',u.lastName)as userName,isRead,isDeliver,
                   DATE_FORMAT(a1.createdOn, '%d %M %Y %h:%i %p') as readDate FROM alerttracking a1 JOIN typeofuser t ON a1.typeOfUserIdFK = t.typeOfUserId 
                   JOIN user u ON u.userId = a1.masterId 
                   WHERE a1.isDeleted = 0 AND a1.alertIdFK = ${alertId} AND CONCAT(u.firstName, '' , u.lastName) LIKE '%${keyword}%'`;
        return sql;
    }

    static getAlertByIdSQL(alertId) {
        let sql = `SELECT masterIdType as alertName,title,CONCAT('${BASE_URL}','',image) as alertImage,message from alert WHERE isDeleted = 0 AND alertId = ${alertId}`;
        return sql;
    }

    static checkAlertById(alertId) {
        let sql = `SELECT alertId FROM alert WHERE alertId = ${alertId} AND isDeleted = 0`;
        return sql;
    }

    static deleteAlertByIdSQL(alertId) {
        let sql = `UPDATE alert SET isDeleted = 1 WHERE alertId = ${alertId}`;
        return sql;
    }
}
module.exports = Alert;