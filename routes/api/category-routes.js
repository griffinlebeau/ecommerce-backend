const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  console.log('======================');
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    incude: [
      {
        model: Product,
        attributes:['product_name']
      }
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
        attributes: ['product_name']
      }
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
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbCatData => {
    if (!dbPostData) {
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
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbCatData)});
});

module.exports = router;
