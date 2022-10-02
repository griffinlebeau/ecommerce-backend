const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

Product.belongsToMany(Tag, {
  through: ProductTag, 
  as: 'product-tag',
  foreignKey: 'product_id',
  onDelete: 'SET NULL'
})

Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'product-tag',
  foreignKey: 'tag_id',
  onDelete: 'SET NULL'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
