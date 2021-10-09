const knex = require("../db/connection");

function list(){
    return knex("updates as u").leftJoin("images as i", "u.image_id", "i.image_id").select("i.image_url", "u.title", "u.message", "u.created_at");
}

module.exports = {
    list
}