class InstallationLocationType {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    addInstallationLocationTypeSQL(organizationIdFK) {
        let sql = `INSERT INTO installationlocationtype(title,organizationIdFK)
                   VALUES('${this.installationLocationName}', ${organizationIdFK})`;
        return sql;
    }

    updateInstallationlocationtypeSQL(installationLocationTypeId) {
        let sql = `UPDATE installationlocationtype 
                    SET title = '${this.installationLocationName}'
                    WHERE installationLocationTypeId = ${installationLocationTypeId}`;
        return sql;
    }

    static deleteInstallationlocationtypeByIdSQL(installationLocationTypeId) {
        let sql = `UPDATE installationlocationtype SET isDeleted = 1 WHERE installationLocationTypeId = ${installationLocationTypeId}`;
        return sql;
    }

    static getInstallationLocationListSQL(organizationIdFK) {
        let sql = `SELECT installationLocationTypeId,title as installationLocationName FROM installationlocationtype WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }

    static checkInstallationLocationTypeIdSQL(installationLocationTypeId) {
        let sql = `SELECT installationLocationTypeId FROM installationlocationtype WHERE installationLocationTypeId = ${installationLocationTypeId} AND isDeleted = 0`;
        return sql;
    }
}

module.exports = InstallationLocationType;