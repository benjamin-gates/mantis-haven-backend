const service = require("./images.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
    res.status(200).json({data: await service.list()});
}

async function create(req, res, next){
    const image = req.body.data;
    res.status(200).json({data: await service.create(image)});
}

async function destroy(req, res, next){
    const imageId = req.body.data;
    await service.delete(imageId);
    res.sendStatus(204);
}
module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create)
}