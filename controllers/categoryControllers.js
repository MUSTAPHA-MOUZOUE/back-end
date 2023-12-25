const CategoryModel = require('../models/Category');

exports.CreateCategories = (req, res) => {
  const { name, description, parentCategory, isActive } = req.body;
  console.log(req.body);

  const newCategory = new CategoryModel({
    name,
    description, // Make sure to include the description field
    parentCategory,
    isActive,
  });

  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};
exports.getCategories = (req, res) => {
  CategoryModel.find()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getCategoryById = (req, res) => {
  CategoryModel.findById(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.updateCategory = (req, res) => {
  CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.deleteCategory = (req, res) => {
  CategoryModel.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};