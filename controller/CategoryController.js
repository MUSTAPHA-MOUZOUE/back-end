const CategoryModel = require('../modules/Category');

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