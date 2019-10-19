import { DATABASE } from "../config/constants";
class AssetHome {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getRootCategory(organizationIdFK) {
        let sql = `SELECT categoryId,title, (SELECT COUNT(assetIdFK) AS totalAssets FROM assetcatrelation WHERE categoryIdFK = categoryId AND isDeleted = 0) as totalAssets, 
        (SELECT COUNT(checklistId) AS totalChecklists FROM checklist WHERE categoryIdFK = categoryId AND isDeleted = 0) as totalChecklists, 
        (SELECT COUNT(d.documentId) AS totalDocuments FROM document d JOIN documenttype dt ON d.documentTypeIdFK = dt.documentTypeId WHERE d.masterId = categoryId AND d.isDeleted = 0) AS totalDocuments,
        (SELECT COUNT(u.userCatAssignmentId) AS totalUsersAssigned FROM usercatassignment u JOIN assignmenttype at ON u.assignmentTypeIdFK = at.assignmentTypeId WHERE u.masterIdFK = categoryId AND u.isDeleted = 0) AS totalAssignedUsers FROM category 
        WHERE categoryId = parentId AND organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;           
    }   

    static getAllCategorySearchSQL(organizationIdFK,keyword){
        let sql = `SELECT categoryId,title, (SELECT COUNT(assetIdFK) AS totalAssets FROM assetcatrelation WHERE categoryIdFK = categoryId AND isDeleted = 0) as totalAssets, 
        (SELECT COUNT(checklistId) AS totalChecklists FROM checklist WHERE categoryIdFK = categoryId AND isDeleted = 0) as totalChecklists, 
        (SELECT COUNT(d.documentId) AS totalDocuments FROM document d JOIN documenttype dt ON d.documentTypeIdFK = dt.documentTypeId WHERE d.masterId = categoryId AND d.isDeleted = 0) AS totalDocuments,
        (SELECT COUNT(u.userCatAssignmentId) AS totalUsersAssigned FROM usercatassignment u JOIN assignmenttype at ON u.assignmentTypeIdFK = at.assignmentTypeId WHERE u.masterIdFK = categoryId AND u.isDeleted = 0) AS totalAssignedUsers from category WHERE organizationIdFK = ${organizationIdFK} AND title LIKE '%${keyword}%' AND isDeleted = 0`;
        return sql;
    }
}
    export default AssetHome;