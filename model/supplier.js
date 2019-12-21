class Supplier {
    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllSuppliersSQL(organizationIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT s.supplierId,s.firstName,s.lastName,s.businessName,s.mobileNumber,s.emailId,o.organizationName FROM supplier s 
                   JOIN organization o on s.organizationIdFK = o.organizationId WHERE s.organizationIdFK = ${organizationIdFK} AND s.isDeleted = 0 ORDER BY s.createdOn DESC ${limitString}`;
        return sql;
    }

    static getSupplierByIdSQL(supplierId) {
        let sql = `SELECT supplierId,firstName,lastName,businessName,mobileNumber,emailId
        FROM supplier WHERE isDeleted = 0 AND supplierId = ${supplierId}`;
        return sql;
    }

    addSupplierSQL() {

        let sql = `INSERT into supplier ( firstName, lastName, businessName, mobileNumber, emailId,organizationIdFK) 
                    VALUES ('${this.firstName}','${this.lastName}','${this.businessName}','${this.mobileNumber}','${this.emailId}',${this.organizationIdFK})`;
        return sql;
    }

    updateSupplierByIdSQL(supplierId) {
        let sql = `UPDATE supplier SET  
        firstName = '${this.firstName}',
        lastName = '${this.lastName}',
        businessName = '${this.businessName}',
        mobileNumber = '${this.mobileNumber}',
        emailId = '${this.emailId}'
        WHERE supplierId = ${supplierId}`;
        return sql;
    }

    static checkSupplierId(supplierId) {
        let sql = `SELECT supplierId FROM supplier WHERE supplierId = ${supplierId} AND isDeleted = 0`;
        return sql;
    }

    static deleteSupplierByIdSQL(supplierId) {
        let sql = `UPDATE supplier SET  
        isDeleted  = 1 
        WHERE supplierId = ${supplierId}`;
        return sql;
    }

    static getSupplierAssignedOrNot(supplierId) {
        let sql = `SELECT s.supplierId,a.assetTitle from asset a JOIN supplier s ON a.supplierIdFK = s.supplierId WHERE s.supplierId = ${supplierId}`;
        return sql;
    }

}
module.exports = Supplier;