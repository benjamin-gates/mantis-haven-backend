
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("user_name").notNullable();
        table.string("password").notNullable();
    });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
