const knex = require("../db/connection");

function list(){
    return knex("images").select("*").orderBy("caption");
}

module.exports = {
    list
}