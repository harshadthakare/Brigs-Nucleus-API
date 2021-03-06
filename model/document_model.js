const { BASE_URL } = require("../config/constants");
class Document {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllDocumentsByAssetIdSQL(organizationIdFK, assetId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT d.documentId,d.documentCode,d.title,d.description,CONCAT('${BASE_URL}','',d.filepath) as filepath,d.documentTypeIdFK,d.masterId 
                   FROM document d JOIN asset a ON d.masterId = a.assetId WHERE d.organizationIdFK = ${organizationIdFK} AND a.assetId = ${assetId} AND d.documentTypeIdFK = 2 
                   AND d.isDeleted = 0 ORDER BY d.createdOn DESC ${limitString}`
        return sql;
    }

    static getAllDocumentsByCategoryIdSQL(organizationIdFK, categoryId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT d.documentId,d.documentCode,d.title,d.description,CONCAT('${BASE_URL}','',d.filepath) as filepath,d.documentTypeIdFK,d.masterId 
                   FROM document d JOIN category c ON d.masterId = c.categoryId WHERE d.organizationIdFK = ${organizationIdFK} AND c.categoryId = ${categoryId} AND d.documentTypeIdFK = 1
                   AND d.isDeleted = 0 ORDER BY d.createdOn DESC ${limitString}`
        return sql;
    }

    static getAllDocuments(organizationIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT d.documentId,d.documentCode,d.title,d.description,CONCAT('${BASE_URL}','',d.filepath) as filepath,d.documentTypeIdFK,d1.title as documentType 
                   FROM document d JOIN documenttype d1 ON d.documentTypeIdFK = d1.documentTypeId WHERE d.organizationIdFK = ${organizationIdFK} AND d.isDeleted = 0
                   ORDER BY d.createdOn DESC ${limitString}`
        return sql;
    }

    static getAllDocumentSearchSQL(organizationIdFK, keyword) {
        let sql = `SELECT d.documentId,d.documentCode,d.title,d.description,d1.title as documentType FROM document d
                   JOIN documenttype d1 ON d.documentTypeIdFK = d1.documentTypeId
                   WHERE d.organizationIdFK = ${organizationIdFK} AND d.title LIKE '%${keyword}%' AND d.isDeleted = 0`;
        return sql;
    }

    static getAllDocumentSearchByCategory(organizationIdFK, categoryId, keyword) {

        let sql = `SELECT d.documentId,d.documentCode,d.title,d.description 
                   FROM document d JOIN category c ON d.masterId = c.categoryId 
                   WHERE d.organizationIdFK = ${organizationIdFK} AND c.categoryId = ${categoryId} AND d.documentTypeIdFK = 1 AND d.title LIKE '%${keyword}%' AND d.isDeleted = 0`
        return sql;
    }

    static getAllDocumentSearchByAsset(organizationIdFK, assetId, keyword) {

        let sql = `SELECT d.documentId,d.documentCode,d.title,d.description 
                   FROM document d JOIN asset a ON d.masterId = a.assetId 
                   WHERE d.organizationIdFK = ${organizationIdFK} AND a.assetId = ${assetId} AND d.documentTypeIdFK = 2 AND d.title LIKE '%${keyword}%' AND d.isDeleted = 0`
        return sql;
    }

    static getDocumentByIdSQL(documentId) {
        let sql = `SELECT d.documentId,d.documentCode,d.title,d.description,CONCAT('${BASE_URL}','',d.filepath) as categoryDoc,dt.title as documentType FROM document d 
                   JOIN documenttype dt ON d.documentTypeIdFK = dt.documentTypeId WHERE d.isDeleted = 0 AND d.documentId = ${documentId}`
        return sql;
    }

    addDocumentSQL() {
        let sql = `INSERT INTO document(documentCode,
            title,
            description,
            filepath,
            documentTypeIdFK,
            masterId,
            organizationIdFK)
            VALUES('${this.documentCode}',
                    '${this.title}',
                    "${this.description}",
                    '${this.filepath}',
                    ${this.documentTypeIdFK},
                    ${this.masterId},
                    ${this.organizationIdFK})`;
        return sql;
    }

    static getOrganizationCodeById(organizationIdFK) {

        let sql = `SELECT organizationCode FROM organization WHERE organizationId = ${organizationIdFK}`;
        return sql;
    }

    addDocumateSQL() {
        let sql = `INSERT INTO document(documentCode,
        title,
        description,
        filepath,
        documentTypeIdFK,
        masterId,
        organizationIdFK)
        VALUES('${this.documentCode}',
                '${this.title}',
                "${this.description}",
                '${this.filepath}',
                3,
                0,
                ${this.organizationIdFK})`;
        return sql;
    }

    updateDocumentByIdSQL(documentId) {
        let sql = `UPDATE document SET
            title = '${this.title}',
            description = "${this.description}",
            filepath = '${this.filepath}',
            documentTypeIdFK = ${this.documentTypeIdFK},
            masterId = ${this.masterId}
            WHERE documentId = ${documentId}`
        return sql;
    }

    updateDocumateByIdSQL(documentId) {
        let sql = `UPDATE document SET
        title = '${this.title}',
        description = "${this.description}",
        filepath = '${this.filepath}',
        documentTypeIdFK = 3,
        masterId = 0
        WHERE documentId = ${documentId}`
        return sql;
    }

    static checkDocumentId(documentId) {
        let sql = `SELECT documentId FROM document WHERE documentId = ${documentId} AND isDeleted = 0`;
        return sql;
    }

    static deleteDocumentByIdSQL(documentId) {
        let sql = `UPDATE document SET  
            isDeleted  = 1 
            WHERE documentId = ${documentId}`;
        return sql;
    }

    static getDocumentTypeList() {
        let sql = `SELECT documentTypeId,title FROM documenttype WHERE isDeleted = 0`;
        return sql;
    }
}
module.exports = Document;