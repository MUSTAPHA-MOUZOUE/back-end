const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../utils/ApiFeatures');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
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
