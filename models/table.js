var bookshelf = require('../lib/common/mysqlClient').bookshelf;

var table = {};
// 枚举值关系表
table.gbl_value_mapping = bookshelf.Model.extend({
    tableName: 'gbl_value_mapping'
});

module.exports = table;
