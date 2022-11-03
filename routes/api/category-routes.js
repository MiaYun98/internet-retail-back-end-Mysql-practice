const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [Product]
  }).then(allCata => {
    res.json(allCata);
  }).catch(err => {
    console.log(err);
    res.status(500).json({err:err});
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    // be sure to include its associated Products
    include:[Product]
  }).then(oneCata => {
    res.json(oneCata);
  }).catch(err => {
    console.log(err);
    res.status(500).json({err:err})
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(data => {
    res.json(data);
  }).catch(err => {
    console.log(err);
    res.status(500).json({err:err})
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  ).then(updateCata => {
    res.json(updateCata);
  }).catch(err => {
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then(deleteCata => {
    res.json(deleteCata);
  }).catch(err => {
    res.json(err);
  })
});

module.exports = router;
