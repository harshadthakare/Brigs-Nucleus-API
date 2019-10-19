import { DATABASE } from "../config/constants";
class AssetCategory {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }
        
    static getAllAssetCategories(parentId,organizationIdFK) {
        let rootSql = `SELECT cat.categoryId,cat.title,
                       (SELECT COUNT(cat1.categoryId) FROM category AS cat1 WHERE cat1.isDeleted = 0 AND cat1.parentId = cat.categoryId AND cat1.parentId != cat1.categoryId AND cat1.organizationIdFK = ${organizationIdFK}) As isChild 
                       FROM category as cat WHERE cat.categoryId = cat.parentId AND cat.organizationIdFK = ${organizationIdFK} AND cat.isDeleted = 0`;
        let childSql = `SELECT cat.categoryId,cat.title,
                       (SELECT COUNT(cat1.categoryId) FROM category AS cat1 WHERE cat1.isDeleted = 0 AND cat1.parentId = cat.categoryId AND cat1.parentId != cat1.categoryId AND cat1.organizationIdFK = ${organizationIdFK}) As isChild
                       FROM category as cat WHERE cat.parentId = ${parentId} AND cat.organizationIdFK = ${organizationIdFK} AND cat.categoryId != ${parentId} AND cat.isDeleted = 0`;
        if(!parentId || parentId == 0)
        {
            return rootSql;
        }
        else
        {
            return childSql;
        }
    }

    addAssetCategorySQL() {

        let sql = `INSERT into category (parentId, title, organizationIdFK) 
                    VALUES (if(${this.parentId}=0,(SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "${DATABASE}" AND TABLE_NAME = "CATEGORY"),
                    ${this.parentId}), '${this.title}', ${this.organizationIdFK})`;
        return sql;
    }
    
    updateAssetCategoryByIdSQL(categoryId) {
        let sql = `UPDATE category SET  
        parentId = if(${this.parentId}=0, ${categoryId}, ${this.parentId}), 
        title = '${this.title}'
        WHERE categoryId = ${categoryId}`;
        return sql;
    }

    static deleteAssetCategoryByIdSQL(categoryId) {
        let sql = `UPDATE category SET  
        isDeleted = 1 
        WHERE categoryId = ${categoryId}`;
        return sql;
    }

    static getAssetCategorySQL(organizationIdFK) {
        let sql = `SELECT categoryId,title FROM category WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0 ORDER BY createdOn DESC`;
        return sql;
    }
    
    static checkAssetCategoryId(categoryId) {
        let sql = `SELECT categoryId FROM category WHERE categoryId = ${categoryId} AND isDeleted = 0`;
        return sql;
    }

}
export default AssetCategory;