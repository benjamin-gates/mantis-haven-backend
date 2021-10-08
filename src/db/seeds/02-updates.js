const updates = require("../fixtures/updates");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE updates RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex('updates').insert(updates);
    });
};
