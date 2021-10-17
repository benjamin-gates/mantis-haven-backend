const knex = require("../db/connection");

function list(){
    return knex("updates as u").leftJoin("images as i", "u.image_id", "i.image_id").select("i.image_url", "u.title", "u.message", "u.created_at");
}

function create(update){
    return knex("updates").insert(update).returning("*").then((createdRecords) => createdRecords[0]);
}

function readImage(imageId){
    return knex("images").where({image_id: imageId}).first();
}

module.exports = {
    list,
    create, 
    readImage
}