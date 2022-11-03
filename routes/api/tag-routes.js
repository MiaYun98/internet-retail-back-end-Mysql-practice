const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // be sure to include its associated Product data
    include: [Product]
  }).then(allTag => {
    res.json(allTag);
  }).catch(err => {
    console.log(err);
    res.status(500).json({err:err});
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    // be sure to include its associated Product data
    include:[Product]
  }).then(onePro => {
    res.json(onePro);
  }).catch(err => {
    console.log(err);
    res.status(500).json({err:err})
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    product_name: product_name,
    price: price,
    stock: stock,
    category_id: category_id,
  }).then(data => {
    res.json(data);
  }).catch(err => {
    console.log(err);
    res.status(500).json({err:err})
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      product_name: product_name,
      price: price,
      stock: stock,
      category_id: category_id,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  ).then(updatePro => {
    res.json(updatePro);
  }).catch(err => {
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then(deletePro => {
    res.json(deletePro);
  }).catch(err => {
    res.json(err);
  })
});

module.exports = router;
