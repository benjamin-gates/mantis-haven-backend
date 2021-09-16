const images = require("../fixtures/images");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE images RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex('images').insert(images);
    });
};
