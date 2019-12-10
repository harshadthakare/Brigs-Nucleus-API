class Organization {

  constructor(obj) {
    obj && Object.assign(this, obj)
  }

  static getAllOrganizationsSQL(limit = 0, start = 0) {
    let startLimit = limit * start;

    let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

    let sql = `SELECT organizationId,organizationName,organizationCode,description,DATE_FORMAT(createdOn, '%d %M %Y')as createdDate,
               CASE
                   WHEN organizationId = 1 IS NOT NULL THEN 
                    (SELECT COUNT(assetId) as totalAssets FROM asset WHERE organizationIdFK = organizationId AND isDeleted = 0)
                    ELSE 0 
                   END as totalAssets,
               CASE
                   WHEN organizationId = 1 IS NOT NULL THEN 
                    (SELECT COUNT(adminId) as totalAdmins FROM admin WHERE organizationIdFK = organizationId AND isDeleted = 0)
                    ELSE 0
                   END as totalAdmins,
              CASE
                   WHEN organizationId = ${organizationId} IS NOT NULL THEN 
                   (SELECT COUNT(u.userId) as totalUsers FROM user u
                    JOIN department d ON u.departmentIdFK = d.departmentId
                    WHERE d.organizationIdFK = organizationId AND u.isDeleted = 0 AND d.isDeleted = 0)
                    ELSE 0
                   END as totalUsers
               FROM organization WHERE isDeleted = 0 ORDER BY createdOn DESC ${limitString}`;
    return sql;
  }

  static getAllOrganizationsSearchSQL(organizationId, keyword) {
    let sql = `SELECT organizationId,organizationName,organizationCode,description,DATE_FORMAT(createdOn, '%d %M %Y')as createdDate,
               CASE
                   WHEN organizationId = ${organizationId} IS NOT NULL THEN 
                      (SELECT COUNT(assetId) as totalAssets FROM asset WHERE organizationIdFK = organizationId AND isDeleted = 0)
                      ELSE 0 
               END as totalAssets,
               CASE
               WHEN organizationId = ${organizationId} IS NOT NULL THEN 
                      (SELECT COUNT(adminId) as totalAdmins FROM admin WHERE organizationIdFK = organizationId AND isDeleted = 0)
                      ELSE 0
               END as totalAdmins,
               CASE
                   WHEN organizationId = ${organizationId} IS NOT NULL THEN 
                   (SELECT COUNT(u.userId) as totalUsers FROM user u
                    JOIN department d ON u.departmentIdFK = d.departmentId
                    WHERE d.organizationIdFK = organizationId AND u.isDeleted = 0 AND d.isDeleted = 0)
                    ELSE 0
                   END as totalUsers
               FROM organization WHERE organizationName LIKE '%${keyword}%' AND isDeleted = 0`;
    return sql;
  }

  static getOrganizationByIdSQL(organizationId) {
    let sql = `SELECT organizationId,organizationName,organizationCode,description FROM organization  
                   WHERE organizationId = ${organizationId} AND isDeleted = 0`;
    return sql;
  }

  addOrganizationSQL() {
    let sql = `INSERT INTO organization (organizationName,organizationCode,description)
                 values ('${this.organizationName}',
                         '${this.organizationCode}',  
                         "${this.description}")`;
    return sql;
  }

  updateOrganizationSQL(organizationId) {
    let sql = `UPDATE organization 
                  SET organizationName = '${this.organizationName}',
                      description     =  "${this.description}"
                      WHERE organizationId = ${organizationId}`;
    return sql;
  }

  static deleteOrganizationByIdSQL(organizationId) {
    let sql = `UPDATE organization SET isDeleted = 1 WHERE organizationId = ${organizationId}`;
    return sql;
  }

  static checkOrganizationId(organizationId) {
    let sql = `SELECT organizationId FROM organization WHERE organizationId = ${organizationId} AND isDeleted = 0`;
    return sql;
  }

  static getAllOrganizationListSQL() {
    let sql = `SELECT organizationId,organizationName FROM organization WHERE isDeleted = 0`;
    return sql;
  }

  static getOrganizationsCountSQL(organizationId) {
    let sql = `SELECT organizationId,organizationName,organizationCode,description,DATE_FORMAT(createdOn, '%d %M %Y')as createdDate,
                 CASE
                 WHEN organizationId = ${organizationId} IS NOT NULL THEN 
                                   (SELECT COUNT(assetId) as totalAssets FROM asset WHERE organizationIdFK = organizationId AND isDeleted = 0)
                                   ELSE 0 
                 END as totalAssets,
                 CASE
                 WHEN organizationId = ${organizationId} IS NOT NULL THEN 
                                   (SELECT COUNT(adminId) as totalAdmins FROM admin WHERE organizationIdFK = organizationId AND isDeleted = 0)
                                   ELSE 0
                 END as totalAdmins
                 FROM organization WHERE isDeleted = 0`;
    return sql;
  }

  static getSuperAdminByAuthSQL() {
    let sql = `SELECT superAdminId,firstName,lastName,mobileNumber,emailId FROM superadmin`;
    return sql;
  }

  static getOrganizationNameByIdSQL(organizationId) {
    let sql = `SELECT organizationId,organizationName FROM organization WHERE organizationId = ${organizationId}`;
    return sql;
  }

}
module.exports = Organization;