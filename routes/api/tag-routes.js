const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { sequelize } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
      [sequelize.literal('SELECT * FROM producttag WHERE tag.id = producttag.tag_id'), 'products']
    ],
    include: [
      {
        model: Product,
        attributes: ['product_name']
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
      [sequelize.literal('SELECT * FROM producttag WHERE tag.id = producttag.tag_id'), 'products']
    ],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  }).then(dbTagData => res.json(dbTagData))
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
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
