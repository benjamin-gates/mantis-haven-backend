const knex = require("../connection");

function list(){
    return knex("products").select("*").orderBy("product_name");
}

module.exports = {
    list
}