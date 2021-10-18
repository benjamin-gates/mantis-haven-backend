const knex = require("../db/connection");

function list(){
    return knex("products as p").leftJoin("images as i", "p.image_id", "i.image_id").select("p.*", "i.image_url");
}

module.exports = {
    list
}