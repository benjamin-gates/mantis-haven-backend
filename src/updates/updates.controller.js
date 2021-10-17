const service = require("./updates.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
    res.status(200).json({data: await service.list()});
}

async function create(req, res, next){
    const update = req.body.data;
    res.status(200).json({data: await service.create(update)});
}


module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create)
}