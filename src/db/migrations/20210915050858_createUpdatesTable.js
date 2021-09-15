
exports.up = function(knex) {
    return knex.schema.createTable("updates", (table) => {
        table.increments("update_id").primary();
        table.string("title").notNullable();
        table.string("message").notNullable();
        table.integer("image_id").unsigned().nullable();
        table.foreign("image_id").references("image_id").inTable("images").onDelete("cascade");
        table.timestamps(true, true);
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("updates");
  
};
