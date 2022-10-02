const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  console.log('======================');
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: ProductTag,
          as: 'product-tag'
        }
      },
    ]
  })
    .then(dbCatData => res.json(dbCatData))
});

router.get('/:id', (req, res) => {
  console.log('======================');
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: ProductTag,
          as: 'product-tag'
        }
      },
    ]
  })
    .then(dbCatData => res.json(dbCatData))
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCatData => res.json(dbCatData))
});

router.put('/:id', (req, res) => {
  Category.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbCatData)});
});

router.delete('/:id', (req, res) => {
  Category.destroy(
    {
        where: {
          id: req.params.id
        }
    }
  )
  .then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbCatData)});
});

module.exports = router;
