const knex = require("../db/connection");

function list(){
    return knex("products as p").leftJoin("images as i", "p.image_id", "i.image_id").select("p.*", "i.image_url").orderBy("p.product_name").orderBy("p.status");
}

function create(product){
    return knex("products").insert(product).returning("*").then((createdRecords) => createdRecords[0]);
}

function readImage(imageId){
    return knex("images").where({image_id: imageId}).first();
}

function destroy(productId){
    return knex("products").where({product_id: productId}).del();
}

function readProduct(productId){
    return knex("products").where({product_id: productId}).first();
}

function edit(productId, product){
    return knex("products").where({product_id: productId}).update({...product}).returning("*").then((createdRecords) => createdRecords[0]);
}


module.exports = {
    list,
    create,
    readImage,
    delete: destroy,
    readProduct,
    edit
}