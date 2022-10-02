const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { sequelize } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['product_name'],
        through: ProductTag,
        as: 'product-tag'
      }
    ]
  }).then(dbTagData => res.json(dbTagData))
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['product_name'],
        through: ProductTag,
        as: 'product-tag'
      }
    ]
  }).then(dbTagData => res.json(dbTagData))
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(dbTagData => res.json(dbTagData))
});

router.put('/:id', (req, res) => {
  Tag.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
