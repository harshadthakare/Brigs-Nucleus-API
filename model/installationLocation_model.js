class InstallationLocationType {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    addInstallationLocationTypeSQL() {

        let sql = `INSERT INTO installationlocationtype(title)
                   VALUES('${this.title}')`;
        return sql;
    }

    updateInstallationlocationtypeSQL(installationLocationTypeId) {
        let sql = `UPDATE installationlocationtype 
                    SET title = '${this.title}'
                    WHERE installationLocationTypeId = ${installationLocationTypeId}`;
        return sql;
    }

    static deleteInstallationlocationtypeByIdSQL(installationLocationTypeId) {
        let sql = `UPDATE installationlocationtype SET isDeleted = 1 WHERE installationLocationTypeId = ${installationLocationTypeId}`;
        return sql;
    }

    static getInstallationLocationListSQL() {

        let sql = `SELECT installationLocationTypeId,title as installationLocationName FROM installationlocationtype WHERE isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }

    static checkInstallationLocationTypeIdSQL(installationLocationTypeId) {
        let sql = `SELECT installationLocationTypeId FROM installationlocationtype WHERE installationLocationTypeId = ${installationLocationTypeId} AND isDeleted = 0`;
        return sql;
    }
}

module.exports = InstallationLocationType;