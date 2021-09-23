const knex = require("../db/connection");

function list(){
    return knex("images").select("*").orderBy("caption");
}

function create(image){
    return knex("images").insert(image).returning("*").then((createdRecords) => createdRecors[0]);
}

module.exports = {
    list,
    create
}