const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./products.service");

/**
 * Middleware functions for all /products routes
 */
 function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in'});
  return next();
}

function bodyExists(req, res, next) {
  !req.body
    ? next({ status: 400, message: "A body is required for this request" })
    : next();
}

function fieldsExist(req, res, next) {
  const product = req.body;
  if (!product.data) {
    next({
      status: 400,
      message: "A data property is required in this request",
    });
  } else if (!product.data.product_name) {
    next({
      status: 400,
      message: "A product_name is required in this request",
    });
  } else if (!product.data.price) {
    next({
      status: 400,
      message: "A price property is required in this request",
    });
  } else if (!product.data.product_url) {
    next({
      status: 400,
      message: "A product_url property is required in this request",
    });
  } else {
    next();
  }
}

function correctFormat(req, res, next) {
  const product = req.body.data;
  if (product.image_id && typeof product.image_id !== "number") {
    next({ status: 400, message: "The image_id must be a number" });
  } else if (typeof product.price !== "number") {
    next({ status: 400, message: "The price must be a number" });
  } else if (
    product.product_url.substring(0, 22) !== "https://square.link/u/"
  ) {
    next({
      status: 400,
      message: "The product_url is not in the correct format",
    });
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

async function productExists(req, res, next){
    const {productId} = req.params;
    const product = await service.readProduct(productId);
    !product ? next({status: 400, message: `The product with ID, ${productId}, does not exist`}) : next();
}

/**
 * Route handlers for all /products routes
 */
async function list(req, res, next) {
  res.status(200).json({ data: await service.list() });
}

async function create(req, res, next) {
  const product = req.body.data;
  res.status(200).json({ data: await service.create(product) });
}

async function destroy(req, res, next){
    const {productId} = req.params;
    await service.delete(productId);
    res.sendStatus(204);
}

async function edit(req, res, next){
  const {productId} = req.params;
  const product = req.body.data;
  res.status(200).json({ data: await service.edit(productId, product)});
}


module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    loginRequired,
    bodyExists,
    fieldsExist,
    correctFormat,
    asyncErrorBoundary(imageExists),
    asyncErrorBoundary(create),
  ],
  delete: [asyncErrorBoundary(productExists), asyncErrorBoundary(destroy)],
  edit: [bodyExists, fieldsExist, correctFormat, asyncErrorBoundary(imageExists), asyncErrorBoundary(edit)]
};
