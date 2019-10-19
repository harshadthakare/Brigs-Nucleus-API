import {BASE_URL} from "../config/constants";
class Alert{
    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllAlerts(limit=0, start = 0)
    {
        let startLimit = limit*start;

        let limitString = (limit>0) ? `LIMIT ${startLimit}, ${limit}`: '';

        let sql = `SELECT alertId,masterIdType as alertType,title,
                   CONCAT('${BASE_URL}','',image) as alertImage,message from alert WHERE isDeleted = 0 ORDER BY createdOn DESC ${limitString}`;
        return sql;
    }

    static getAlertByIdSQL(alertId)
    {
        let sql = `SELECT alertId,masterIdType as alertType,title,CONCAT('${BASE_URL}','',image) as alertImage,message from alert WHERE isDeleted = 0 AND alertId = ${alertId}`;
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
export default Alert;