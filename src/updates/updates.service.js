const knex = require("../db/connection");

function list(){
    return knex("updates").select("*");
}

module.exports = {
    list
}