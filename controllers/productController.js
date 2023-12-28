const asyncHandler = require("express-async-handler");
const productModel = require("../models/Product");
const ApiFeatures = require("../utils/ApiFeatures");

// @desc    Get list of product
// @route   GET /api/v1/product
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    .paginate()
    .filter()
    .limitFields()
    .sort()
    .search();
  // execute query
  const { mongooseQuery, paginationResult } = apiFeature;
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    res.status(500).json({ error: `No product for this id ${id}` });
  }
  res.status(200).json({ data: product });
});

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    res.status(500).json({ error: `No product for this id ${id}` });
  }
  res.status(200).json({ data: product });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);

  if (!product) {
    res.status(500).json({ error: `No product for this id ${id}` });
  }
  res.status(204).send();
});
