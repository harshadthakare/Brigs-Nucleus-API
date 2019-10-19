import { DATABASE } from "../config/constants";
class Manufacturer {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllManufacturersSQL(organizationIdFK,limit=0, start=0) {
        let startLimit = limit*start;

        let limitString = (limit>0) ? `LIMIT ${startLimit}, ${limit}`: '';

        let sql = `SELECT m.manufacturerId,m.title,o.organizationName FROM manufacturer m JOIN organization o 
                   on m.organizationIdFK = o.organizationId WHERE m.organizationIdFK = ${organizationIdFK} AND m.isDeleted = 0 ORDER BY m.createdOn DESC ${limitString}`;
        return sql;
    }

    static getManufacturerByIdSQL(manufacturerId) {
        let sql = `SELECT manufacturerId, title FROM manufacturer WHERE isDeleted = 0 AND manufacturerId = ${manufacturerId}`;
        return sql;
    }

    addManufacturerSQL() {

        let sql = `INSERT into manufacturer (title,organizationIdFK) 
                    VALUES ('${this.title}',${this.organizationIdFK})`;
        return sql;
    }
    
    updateManufacturerByIdSQL(manufacturerId) {
        let sql = `UPDATE manufacturer SET  
        title = '${this.title}'
        WHERE manufacturerId = ${manufacturerId}`;
        return sql;
    }

    static checkManufacturerId(manufacturerId) {
        let sql = `SELECT manufacturerId FROM manufacturer WHERE manufacturerId = ${manufacturerId} AND isDeleted = 0`;
        return sql;
    }

    static deleteManufacturerByIdSQL(manufacturerId) {
        let sql = `UPDATE manufacturer SET  
        isDeleted  = 1 
        WHERE manufacturerId = ${manufacturerId}`;
        return sql;
    }
}
export default Manufacturer;