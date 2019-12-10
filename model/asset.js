const { BASE_URL } = require("../config/constants");
class Asset {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllAssetSQL(organizationIdFK, categoryId, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT a.assetId,a.assetTitle,c.title as categoryName,a.assetCode,a.modelNumber,a.companyAssetNo,
                   CONCAT('${BASE_URL}','',a.image) as assetImage,o.organizationName from asset a
                   LEFT JOIN installationlocationtype i on a.installationLocationTypeIdFK = i.installationLocationTypeId
                   LEFT JOIN durationtype d ON a.durationTypeIdFK = d.durationTypeId
                   LEFT JOIN department d1 ON a.departmentIdFK = d1.departmentId
                   LEFT JOIN organization o ON a.organizationIdFK = o.organizationId
                   LEFT JOIN supplier s ON a.supplierIdFK = s.supplierId
                   LEFT JOIN manufacturer m ON a.manufacturerIdFK = m.manufacturerId
                   LEFT JOIN assetcatrelation a2 ON a2.assetIdFK = a.assetId
                   LEFT JOIN category c on a2.categoryIdFK = c.categoryId
                   WHERE a.organizationIdFK = ${organizationIdFK} AND a2.categoryIdFK = ${categoryId} AND a.isDeleted = 0 
                   ORDER BY a.createdOn DESC ${limitString}`;
        return sql;
    }

    static getAllAssetSearchSQL(organizationIdFK, categoryId, keyword) {

        let sql = `SELECT a.assetId,a.assetTitle,c.title as categoryName,a.assetCode,a.modelNumber,a.companyAssetNo,
                   CONCAT('${BASE_URL}','',a.image) as assetImage,o.organizationName from asset a
                   LEFT JOIN installationlocationtype i on a.installationLocationTypeIdFK = i.installationLocationTypeId
                   LEFT JOIN durationtype d ON a.durationTypeIdFK = d.durationTypeId
                   LEFT JOIN department d1 ON a.departmentIdFK = d1.departmentId
                   LEFT JOIN organization o ON a.organizationIdFK = o.organizationId
                   LEFT JOIN supplier s ON a.supplierIdFK = s.supplierId
                   LEFT JOIN manufacturer m ON a.manufacturerIdFK = m.manufacturerId
                   LEFT JOIN assetcatrelation a2 ON a2.assetIdFK = a.assetId
                   LEFT JOIN category c on a2.categoryIdFK = c.categoryId
                   WHERE a.organizationIdFK = ${organizationIdFK} AND a.assetTitle LIKE '%${keyword}%' AND a2.categoryIdFK = ${categoryId} AND a.isDeleted = 0`;
        return sql;
    }

    static getAssetHistorySQL(assetIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT d.doneChecklistId,c.title as checkListTitle,CONCAT(u.firstName, ' ' ,u.lastName)as doneBy,DATE_FORMAT(d.doneOn, '%d %M %Y')as doneOn,d.assetIdFK 
                   from donechecklist d JOIN checklist c on d.checkListIdFK = c.checklistId 
                   JOIN user u on d.doneBy = u.userId 
                   JOIN asset a ON d.assetIdFK = a.assetId 
                   WHERE d.assetIdFK = ${assetIdFK} AND d.isDeleted = 0 ORDER BY d.createdOn DESC ${limitString}`;
        return sql;
    }

    static getQuestionAnswerSQL(doneChecklistIdFK, limit = 0, start = 0) {
        let startLimit = limit * start;

        let limitString = (limit > 0) ? `LIMIT ${startLimit}, ${limit}` : '';

        let sql = `SELECT a.answerId,a.questionIdFK,q1.title as questionType,q.title as question,a.answer,IF(a.isDanger = 1, 'Yes','No') AS isDanger from answer a 
                   JOIN question q on a.questionIdFK = q.questionId 
                   JOIN questiontype q1 ON q.questionTypeIdFK = q1.questionTypeId 
                   WHERE a.doneChecklistIdFK = ${doneChecklistIdFK} AND a.isDeleted = 0 ORDER BY a.answerId DESC ${limitString}`;
        return sql;
    }

    static getAssetByIdSQL(assetId) {
        let sql = `SELECT a.assetId,a.assetTitle,a2.categoryIdFK,c.title as categoryName,a.assetCode,a.modelNumber,a.companyAssetNo,
                   a.description,CONCAT('${BASE_URL}','',a.image) as image,DATE_FORMAT(a.installationDate,'%d %M %Y') as installationDate,a.installedLocation,
                   i.title as installedAt,a.installationLocationTypeIdFK,CONCAT('${BASE_URL}',a.userGuideBook) as userGuideBook,a.checkingDuration,d.title as durationTitle,
                   a.durationTypeIdFK,a.warrenty,d.title as warrentyPeriod,a.warrantyDurationTypeIdFK,o.organizationName,d1.departmentTitle,a.departmentIdFK,
                   CONCAT(s.firstName,' ', s.lastName) AS supplierName,a.supplierIdFK,m.title as manufacturerName,a.manufacturerIdFK,
                   (SELECT COUNT(doneChecklistId)as totalDoneChecklist from donechecklist WHERE assetIdFK = assetId AND isDeleted = 0) as totalDoneChecklist,
                   (SELECT COUNT(documentId)as totalDocuments from document WHERE documentTypeIdFK = 2 AND masterId = assetId AND isDeleted = 0) as totalDocuments,
                   (SELECT COUNT(userCatAssignmentId) AS totalAssignedUsers FROM usercatassignment WHERE assignmentTypeIdFK = 3 AND masterIdFK = assetId AND isDeleted = 0) as totalAssignedUsers 
                   from asset a LEFT JOIN installationlocationtype i on a.installationLocationTypeIdFK = i.installationLocationTypeId
                   LEFT JOIN durationtype d ON a.durationTypeIdFK = d.durationTypeId
                   LEFT JOIN department d1 ON a.departmentIdFK = d1.departmentId
                   LEFT JOIN organization o ON a.organizationIdFK = o.organizationId
                   LEFT JOIN supplier s ON a.supplierIdFK = s.supplierId
                   LEFT JOIN manufacturer m ON a.manufacturerIdFK = m.manufacturerId
                   LEFT JOIN assetcatrelation a2 ON a2.assetIdFK = a.assetId
                   LEFT JOIN category c on a2.categoryIdFK = c.categoryId
                   WHERE a.isDeleted = 0 AND a.assetId = ${assetId}`;
        return sql;
    }

    addAssetSQL() {
        let sql = `INSERT INTO asset
        (assetTitle,
         modelNumber,
         companyAssetNo,
         description,
         image,
         installationDate,
         installationLocationTypeIdFK,
         installedLocation,
         userGuideBook,
         checkingDuration,
         durationTypeIdFK,
         assetCode,
         warrenty,
         warrantyDurationTypeIdFK,
         supplierIdFK,departmentIdFK, 
         manufacturerIdFK,
         organizationIdFK)
         VALUES('${this.assetTitle}',
                '${this.modelNumber}',
                '${this.companyAssetNo}',
                '${this.description}',
                '${this.image}',
                '${this.installationDate}',
                 ${this.installationLocationTypeIdFK},
                '${this.installedLocation}',
                '${this.userGuideBook}',
                 ${this.checkingDuration},
                 ${this.durationTypeIdFK},
                '${this.assetCode}',
                 ${this.warrenty},
                 ${this.warrantyDurationTypeIdFK},
                 ${this.supplierIdFK},
                 ${this.departmentIdFK},
                 ${this.manufacturerIdFK},
                 ${this.organizationIdFK})`;
        return sql;
    }

    addAssetCatRelation(assetId, categoryId) {
        let sql = `INSERT INTO assetcatrelation(assetIdFK,categoryIdFK)VALUES('${assetId}','${categoryId}')`;
        return sql;
    }

    updateAssetByIdSQL(assetId) {
        let sql = `UPDATE asset SET  
            assetTitle                   = '${this.assetTitle}',
            modelNumber                  = '${this.modelNumber}',
            companyAssetNo               = '${this.companyAssetNo}',
            description                  = '${this.description}',
            image                        = '${this.image}',
            installationDate             = '${this.installationDate}',
            installationLocationTypeIdFK = '${this.installationLocationTypeIdFK}',
            installedLocation            = '${this.installedLocation}',
            userGuideBook                = '${this.userGuideBook}',
            checkingDuration             =  ${this.checkingDuration},
            durationTypeIdFK             = '${this.durationTypeIdFK}',
            warrenty                     =  ${this.warrenty},
            warrantyDurationTypeIdFK     =  '${this.warrantyDurationTypeIdFK}',
            supplierIdFK                 =  '${this.supplierIdFK}',
            departmentIdFK               =  '${this.departmentIdFK}',
            manufacturerIdFK             =  '${this.manufacturerIdFK}'
            
        WHERE assetId = ${assetId}`;

        return sql;
    }

    updateAssetCatRelation(assetId, categoryId) {
        let sql = `UPDATE assetcatrelation SET categoryIdFK = '${categoryId}' WHERE assetIdFK = ${assetId}`
        return sql;
    }

    static checkAssetById(assetId) {
        let sql = `SELECT assetId FROM asset WHERE assetId = ${assetId} AND isDeleted = 0`;
        return sql;
    }

    static deleteAssetByIdSQL(assetId) {
        let sql = `UPDATE asset SET isDeleted = 1 WHERE assetId = ${assetId}`;
        return sql;
    }

    static getInstallationLocationType(organizationIdFK) {
        let sql = `SELECT installationLocationTypeId as installationLocationTypeIdFK,title FROM installationlocationtype WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }

    static getDurationType() {
        let sql = `SELECT durationTypeId,title FROM durationtype WHERE isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }

    static getSupplier(organizationIdFK) {
        let sql = `SELECT supplierId,CONCAT(firstName,' ',lastName) AS supplierName FROM supplier WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }

    static getManufacturer(organizationIdFK) {
        let sql = `SELECT manufacturerId,title FROM manufacturer WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }

    static getAsset(organizationIdFK) {
        let sql = `SELECT assetId,assetTitle from asset WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;
    }
    static getAssetCodeDetailsByCategory(organizationIdFK, categoryId) {

        let sql = `SELECT a.assetId,a.assetTitle,a.assetCode,a.modelNumber FROM asset a
        LEFT JOIN assetcatrelation a2 ON a2.assetIdFK = a.assetId
        LEFT JOIN category c on a2.categoryIdFK = c.categoryId
        WHERE a.organizationIdFK =${organizationIdFK} AND a2.categoryIdFK =${categoryId} AND a.isDeleted = 0 ORDER BY a.createdOn DESC`;
        return sql;
    }
}
module.exports = Asset;