const knex = require("../db/connection");

function list(){
    return knex("products as p").leftJoin("images as i", "p.image_id", "i.image_id").select("p.*", "i.image_url");
}

function create(product){
    return knex("products").insert(product).returning("*").then((createdRecords) => createdRecords[0]);
}

function readImage(imageId){
    return knex("images").where({image_id: imageId}).first();
}

module.exports = {
    list,
    create,
    readImage
}