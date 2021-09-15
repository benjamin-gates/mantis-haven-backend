
exports.up = function(knex) {
    return knex.schema.createTable("products", (table) => {
        table.increments("product_id").primary();
        table.string("product_name").notNullable();
        table.string("product_url").notNullable();
        table.float("price").notNullable();
        table.integer("image_id").unsigned().nullable();
        table.foreign("image_id").references("image_id").inTable("images").onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
