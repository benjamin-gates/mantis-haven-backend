const knex = require("../db/connection");

function list(){
    return knex("images").select("*").orderBy("caption");
}

function create(image){
    return knex("images").insert(image).returning("*").then((createdRecords) => createdRecords[0]);
}

function destroy(imageId){
    return knex("images").where({image_id: imageId}).del();
}

function updateImage(imageId, image){
    return knex("images").where({image_id: imageId}).update({...image}).returning("*").then((createdRecords) => createdRecords[0]); 
}

module.exports = {
    list,
    create,
    delete: destroy,
    updateImage
}