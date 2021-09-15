
exports.up = function (knex) {
    return knex.schema.createTable("images", (table) => {
      table.increments("image_id").primary();
      table.string("caption").notNullable();
      table.string("image_url").notNullable();
      table.boolean("carousel_image").notNullable().defaultTo(false);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("images");
  };