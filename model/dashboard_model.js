const { BASE_URL } = require("../config/constants");
class Dashboard {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllCounts(organizationIdFK) {
        let sql = `SELECT COUNT(assetId) AS totalAssetMate,
        (SELECT COUNT(documentId) AS totalDocuMate FROM document where isDeleted = 0) AS totalDocuMate,
        (SELECT COUNT(complaintId) AS totalTaskMate FROM complaint where typeOfComplaintFK = 1 AND isDeleted = 0) AS totalTaskMate,
        (SELECT COUNT(complaintId) AS totalComplaints FROM complaint where typeOfComplaintFK = 2 AND isDeleted = 0) AS totalComplaints
        FROM asset WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;
    }
    static getAllNotDoneMaintenceAssets(organizationIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT a.assetId,a.assetCode,assetTitle,a.modelNumber,a.description,CONCAT('${BASE_URL}','',a.image) as assetImage
                    FROM asset a 
                    LEFT JOIN donechecklist d ON d.assetIdFK = a.assetId    
                    WHERE d.assetIdFK IS NULL AND a.organizationIdFK = ${organizationIdFK} AND a.isDeleted = 0
                    ORDER BY a.createdOn DESC ${limitString}`;
        return sql;
    }
    static getMaintenanceNotDoneAssetCount(organizationIdFK) {
        let sql = `SELECT COUNT(a.assetId) AS totalMaintenceRemainingAssets 
                    FROM asset a 
                    LEFT JOIN donechecklist d ON d.assetIdFK = a.assetId 
                    WHERE d.assetIdFK IS NULL AND a.organizationIdFK = ${organizationIdFK} AND a.isDeleted = 0`
        return sql;
    }
}
module.exports = Dashboard;