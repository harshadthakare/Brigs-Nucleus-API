class AssetHome {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getRootCategory(organizationIdFK) {
        let sql = `SELECT categoryId,title, (SELECT COUNT(a.assetId) AS totalAssets FROM asset a JOIN assetcatrelation a1 ON a1.assetIdFK = a.assetId WHERE a.organizationIdFK = ${organizationIdFK} AND a1.categoryIdFK = categoryId AND isVerified = 1 AND a.isDeleted = 0) as totalAssets, 
        (SELECT COUNT(checklistId) AS totalChecklists FROM checklist WHERE organizationIdFK = ${organizationIdFK} AND categoryIdFK = categoryId AND  isDeleted = 0) as totalChecklists, 
        (SELECT COUNT(d.documentId) AS totalDocuments FROM document d JOIN documenttype dt ON d.documentTypeIdFK = dt.documentTypeId WHERE d.organizationIdFK = ${organizationIdFK} AND d.documentTypeIdFK = 1 AND d.masterId = categoryId AND d.isDeleted = 0) AS totalDocuments,
        (SELECT COUNT(u.userCatAssignmentId) AS totalUsersAssigned FROM usercatassignment u JOIN assignmenttype at ON u.assignmentTypeIdFK = at.assignmentTypeId WHERE u.assignmentTypeIdFK = 1 AND u.masterIdFK = categoryId AND u.isDeleted = 0) AS totalAssignedUsers FROM category 
        WHERE categoryId = parentId AND organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;
    }

    static getAllCategorySearchSQL(organizationIdFK, keyword) {
        let sql = `SELECT categoryId,title, (SELECT COUNT(a.assetId) AS totalAssets FROM asset a JOIN assetcatrelation a1 ON a1.assetIdFK = a.assetId WHERE a.organizationIdFK = ${organizationIdFK} AND a1.categoryIdFK = categoryId AND isVerified = 1 AND a.isDeleted = 0) as totalAssets, 
        (SELECT COUNT(checklistId) AS totalChecklists FROM checklist WHERE organizationIdFK = ${organizationIdFK} AND categoryIdFK = categoryId AND isDeleted = 0) as totalChecklists, 
        (SELECT COUNT(d.documentId) AS totalDocuments FROM document d JOIN documenttype dt ON d.documentTypeIdFK = dt.documentTypeId WHERE d.organizationIdFK = ${organizationIdFK} AND d.documentTypeIdFK = 1 AND d.masterId = categoryId AND d.isDeleted = 0) AS totalDocuments,
        (SELECT COUNT(u.userCatAssignmentId) AS totalUsersAssigned FROM usercatassignment u JOIN assignmenttype at ON u.assignmentTypeIdFK = at.assignmentTypeId WHERE u.assignmentTypeIdFK = 1 AND u.masterIdFK = categoryId AND u.isDeleted = 0) AS totalAssignedUsers from category WHERE categoryId = parentId AND organizationIdFK = ${organizationIdFK} AND title LIKE '%${keyword}%' AND isDeleted = 0`;
        return sql;
    }

    static getAllCategory(organizationIdFK, categoryId) {
        let sql = `SELECT categoryId,title, (SELECT COUNT(a.assetId) AS totalAssets FROM asset a JOIN assetcatrelation a1 ON a1.assetIdFK = a.assetId WHERE a.organizationIdFK = ${organizationIdFK} AND a1.categoryIdFK = categoryId AND isVerified = 1 AND a.isDeleted = 0) as totalAssets, 
        (SELECT COUNT(checklistId) AS totalChecklists FROM checklist WHERE organizationIdFK = ${organizationIdFK} AND categoryIdFK = categoryId AND isDeleted = 0) as totalChecklists, 
        (SELECT COUNT(d.documentId) AS totalDocuments FROM document d JOIN documenttype dt ON d.documentTypeIdFK = dt.documentTypeId WHERE d.organizationIdFK = ${organizationIdFK} AND d.documentTypeIdFK = 1 AND d.masterId = categoryId AND d.isDeleted = 0) AS totalDocuments,
        (SELECT COUNT(u.userCatAssignmentId) AS totalUsersAssigned FROM usercatassignment u JOIN assignmenttype at ON u.assignmentTypeIdFK = at.assignmentTypeId WHERE u.assignmentTypeIdFK = 1 AND u.masterIdFK = categoryId AND u.isDeleted = 0) AS totalAssignedUsers FROM category 
        WHERE organizationIdFK = ${organizationIdFK} AND categoryId = ${categoryId} AND isDeleted = 0`;
        return sql;
    }
}
module.exports = AssetHome;