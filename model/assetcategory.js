const { DATABASE } = require("../config/constants");
class AssetCategory {

    constructor(obj) {
        obj && Object.assign(this, obj)
    }

    static getAllCategories(organizationIdFK) {
        let sql = `SELECT categoryId,title,parentId FROM category WHERE organizationIdFK = ${organizationIdFK} AND isDeleted = 0`;
        return sql;
    }

    static getCategorySearchSQL(organizationIdFK, keyword) {
        let sql = `SELECT categoryId,title from category WHERE organizationIdFK = ${organizationIdFK} AND title LIKE '%${keyword}%' AND isDeleted = 0`;
        return sql;
    }

    addAssetCategorySQL() {

        let sql = `INSERT into category (parentId, title, organizationIdFK) 
                    VALUES (if(${this.parentId}=0,(SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "${DATABASE}" AND TABLE_NAME = "category"),
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
module.exports = AssetCategory;