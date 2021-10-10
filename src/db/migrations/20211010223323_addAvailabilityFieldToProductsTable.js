
exports.up = function(knex) {
    return knex.schema.table("products", (table) => {
        table.string("status").notNullable().defaultTo("available");
    });
};

exports.down = function(knex) {
    return knex.schema.table("products", (table) => {
        table.dropColumn("status");
    });
};
