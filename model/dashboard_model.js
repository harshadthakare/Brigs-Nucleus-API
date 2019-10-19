import { DATABASE } from "../config/constants";
class Dashboard {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllCounts(organizationIdFK) {
        let sql = `SELECT COUNT(assetId) AS totalAssetMate,
        (SELECT COUNT(documentId) AS totalDocuments FROM document where isDeleted = 0) AS totalDocuMate FROM asset WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;           
    }   
}
export default Dashboard;