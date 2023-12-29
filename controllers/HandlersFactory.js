const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../utils/ApiFeatures');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
     const { code } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
        return res.status(500).json({ error: `No document for this id ${id}` });
    }
    res.status(204).send();
  });


  exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
        return res.status(500).json({ error: `No document for this id ${id}` });
    }
    res.status(200).json({ data: document });
  });






exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.create(req.body);
    if (!document) {
      return res.status(500).json({ error: `error on insert data` });
    }
    res.status(201).json({ data: document });
  });

// GET operation
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return res.status(500).json({ error: `No document for this id ${id}` });
    }
    res.status(200).json({ data: document });
  });

// GET all operation
exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const documents = await Model.find();

    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }

    res.status(200).json({ data: documents });
  });
