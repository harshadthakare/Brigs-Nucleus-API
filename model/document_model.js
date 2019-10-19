import {BASE_URL} from "../config/constants";
class Document {
    
    constructor(obj) {
      obj && Object.assign(this,obj)
    }

    static getAllDocumentsSQL(limit=0, start=0) {
        let startLimit = limit*start;

        let limitString = (limit>0) ? `LIMIT ${startLimit}, ${limit}`: '';    
        
        let sql = `SELECT documentId,title,description FROM document WHERE isDeleted = 0 ORDER BY createdOn DESC ${limitString}`           
        return sql;       
    }
    
    static getDocumentByIdSQL(documentId) {
        let sql = `SELECT d.documentId,d.title,d.description,CONCAT('${BASE_URL}','',d.filepath) as categoryDoc,dt.title as documentType FROM document d 
                   JOIN documenttype dt ON d.documentTypeIdFK = dt.documentTypeId WHERE d.isDeleted = 0 AND d.documentId = ${documentId}`           
        return sql;           
    }
    
    addDocumentSQL() {
            let sql = `INSERT INTO document(title,
            description,
            filepath,
            documentTypeIdFK,
            masterId)
            VALUES('${this.title}',
                    '${this.description}',
                    '${this.filepath}',
                    ${this.documentTypeIdFK},
                    ${this.masterId})`;
            return sql;           
    } 

    updateDocumentByIdSQL(documentId) {
            let sql = `UPDATE document SET
            title = '${this.title}',
            description = '${this.description}',
            filepath = '${this.filepath}',
            documentTypeIdFK = ${this.documentTypeIdFK},
            masterId = ${this.masterId}
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
export default Document;