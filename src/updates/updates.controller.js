const service = require("./updates.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Middleware Functions
 */
function bodyExists(req, res, next){
    !req.body ? next({status: 400, message: "A body is required for this request"}) : next();
}

function fieldsExist(req, res, next){
    const update = req.body;
    if(!update.data){
        next({status: 400, message: "A data property is required in this request"});
    } else if (!update.data.title){
        next({status: 400, message: "A title property is required in this request"});
    } else if(!update.data.message){
        next({status: 400, message: "A message property is required in this request"});
    } else {
        next();
    }
}

function correctFormat(req, res, next){
    const update = req.body.data;
    if(update.image_id && typeof update.image_id !== "number"){
        next({status: 400, message: "The image_id must be a number"});
    } else {
        next();
    }
}

async function imageExists(req, res, next) {
    const { image_id } = req.body.data;
    if (!image_id) {
      next();
    } else {
      const image = await service.readImage(image_id);
      !image
        ? next({
            status: 400,
            message: `The image_id, ${image_id}, does not exist`,
          })
        : next();
    }
  }

async function updateExists(req, res, next){
    const {updateId} = req.params;
    const update = await service.readUpdate(updateId);
    !update ? next({ status: 400, message: `The update_id, ${update_id}, does not exist`}) : next();
}
/** 
 * Route Handlers
 */
async function list(req, res, next){
    res.status(200).json({data: await service.list()});
}

async function create(req, res, next){
    const update = req.body.data;
    res.status(200).json({data: await service.create(update)});
}

async function destroy(req, res, next){
    const {updateId} = req.params;
    await service.delete(updateId);
    res.sendStatus(204);
}

async function edit(req, res, next){
    const {updateId} = req.params;
    const update = req.body.data;
    res.status(200).json({data: await service.edit(updateId, update)});
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [bodyExists, fieldsExist, correctFormat, asyncErrorBoundary(imageExists), asyncErrorBoundary(create)],
    delete: [asyncErrorBoundary(updateExists), asyncErrorBoundary(destroy)],
    edit: [bodyExists, fieldsExist, correctFormat, asyncErrorBoundary(updateExists), asyncErrorBoundary(imageExists), asyncErrorBoundary(edit)]
}