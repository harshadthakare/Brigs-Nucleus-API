const { BASE_URL } = require("../config/constants");
class Dashboard {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllCounts(organizationIdFK) {
        let sql = `SELECT COUNT(a.assetId) AS totalAssetMate,
                    (SELECT COUNT(documentId) AS totalDocuMate FROM document where organizationIdFK = ${organizationIdFK} AND isDeleted = 0) AS totalDocuMate,
                    (SELECT COUNT(complaintId) AS totalTaskMate FROM complaint where organizationIdFK = ${organizationIdFK} AND typeOfComplaintFK = 1 AND isDeleted = 0) AS totalTaskMate,
                    (SELECT COUNT(complaintId) AS totalComplaints FROM complaint where organizationIdFK = ${organizationIdFK} AND typeOfComplaintFK = 2 AND isDeleted = 0) AS totalComplaints
                    FROM asset a 
                    JOIN assetcatrelation a1 ON a1.assetIdFK = a.assetId 
                    JOIN category c ON a1.categoryIdFK = c.categoryId 
                    WHERE a.organizationIdFK = ${organizationIdFK} AND a.isVerified = 1 AND a.isDeleted = 0 AND c.isDeleted = 0`;
        return sql;
    }

    static getAllNotDoneMaintenceAssets(organizationIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT a.assetId,a.assetCode,a.assetTitle,a.modelNumber,a.companyAssetNo,c.title AS categoryName,CONCAT('${BASE_URL}','',a.image) as assetImage
                   FROM asset a 
                   JOIN assetcatrelation a1 ON a1.assetIdFK = a.assetId 
                   JOIN category c ON a1.categoryIdFK = c.categoryId 
                   LEFT JOIN donechecklist d ON d.assetIdFK = a.assetId    
                   WHERE d.assetIdFK IS NULL AND a.organizationIdFK = ${organizationIdFK} AND a.isDeleted = 0 AND a.isVerified = 1 AND isActive = 1 AND isRetired = 0
                   ORDER BY a.createdOn DESC ${limitString}`;
        return sql;
    }
    static getAllSuperCounts() {
        let sql = `SELECT COUNT(organizationId) AS totalOrganizations,
                   (SELECT COUNT(adminId) AS totalAdmins FROM admin where isDeleted = 0) AS totalAdmins
                   FROM organization WHERE isDeleted = 0`;
        return sql;
    }
    static getAllOrganizationCreationCounts(year) {
        // let sql = `SELECT sum(IF(Month(createdOn) = 1, 1,0)) AS january, 
    //           sum(IF(month(createdOn) = 2, 1,0)) AS february,
    //           sum(IF(month(createdOn) = 3, 1,0)) AS march, 
    //           sum(IF(month(createdOn) = 4, 1,0)) AS april, 
    //           sum(IF(month(createdOn) = 5, 1,0)) AS may, 
    //           sum(IF(month(createdOn) = 6, 1,0)) AS june, 
    //           sum(IF(month(createdOn) = 7, 1,0)) AS july, 
    //           sum(IF(month(createdOn) = 8, 1,0)) AS august, 
    //           sum(IF(month(createdOn) = 9, 1,0)) AS september, 
    //           sum(IF(month(createdOn) = 10, 1,0)) AS october, 
    //           sum(IF(month(createdOn) = 11, 1,0)) AS november,
    //           sum(IF(month(createdOn) = 12, 1,0)) AS december 
    // FROM organization WHERE isDeleted = 0 AND year(createdOn) = ${year}`;
        let sql = `SELECT MONTH(createdOn) AS monthCreatedON ,COUNT(*) AS totalOrganizations FROM organization 
        WHERE YEAR(createdOn)= ${year} AND isDeleted = 0 GROUP BY MONTH(createdOn)`;
        return sql;
    }
    static getAlltopOrganizationsAssetsCounts() {
        let sql = `SELECT organizationId,organizationName,
                    (SELECT COUNT(assetId) FROM asset a 
                    JOIN assetcatrelation a1 ON a1.assetIdFK = a.assetId 
                    JOIN category c ON a1.categoryIdFK = c.categoryId 
                    WHERE a.organizationIdFK = organizationId AND a.isVerified = 1 AND a.isDeleted = 0 AND c.isDeleted = 0) AS totalAssets
                FROM organization
                WHERE isDeleted = 0 GROUP BY totalAssets DESC LIMIT 0, 5`;
        return sql;
    }
    static getAllAssetsCreationCounts(organizationIdFK, year) {
        let sql = `SELECT MONTH(createdOn) AS monthCreatedON ,COUNT(*) AS totalAssets FROM asset 
        WHERE organizationIdFK = ${organizationIdFK} AND YEAR(createdOn)= ${year} AND isDeleted = 0 GROUP BY MONTH(createdOn)`;
        return sql;
    }
    static getTotalComplaintsAssignedCounts(organizationIdFK, year) {
        let sql = `SELECT MONTH(createdOn) AS monthCreatedON ,COUNT(*) AS totalComplaints FROM complaint
        WHERE organizationIdFK = ${organizationIdFK} AND complaintStatusIdFK = 2 AND YEAR(createdOn)= ${year} AND isDeleted = 0 GROUP BY MONTH(createdOn)`;
        return sql;
    }
    static getCategoryWiseAssetsCounts(organizationIdFK) {
        let sql = `SELECT categoryId,title AS categoryTitle,
        (SELECT COUNT(a.assetIdFK) FROM assetcatrelation a
         JOIN asset a1 ON a.assetIdFK = a1.assetId 
         WHERE a.categoryIdFK= categoryId  AND a1.isDeleted = 0) AS totalAssets
         FROM category 
         WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;
    }
    static getCategoryPendingMAssetsCounts(organizationIdFK) {
        let sql = `SELECT c.categoryId,c.title as categoryName,
                 (SELECT COUNT(assetcatrelationId) FROM assetcatrelation ac 
         	      INNER JOIN asset a on ac.assetIdFK = a.assetId 
         		  WHERE ac.categoryIdFK = c.categoryId AND a.isDeleted = 0 AND ac.assetIdFK NOT IN(SELECT assetIdFK from donechecklist)) as pendingMaintenanceAssets
                  from category c     
                  WHERE c.organizationIdFK =${organizationIdFK} and c.isDeleted = 0`;
        return sql;
    }
    static getInstallationLocAssetsCounts(organizationIdFK) {
        let sql = `SELECT installationLocationTypeId,title AS installationLocationName,
                    (SELECT COUNT(a.assetId) FROM asset a 
                    WHERE a.installationLocationTypeIdFK = installationLocationTypeId AND a.isDeleted = 0 AND a.organizationIdFK = ${organizationIdFK}) AS totalAssets
                    FROM installationlocationtype WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;
    }
}
module.exports = Dashboard;