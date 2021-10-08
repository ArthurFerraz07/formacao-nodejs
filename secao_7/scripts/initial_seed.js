const Category = require('./../categories/Category');
const Article = require('./../articles/Article');

[
  'Javascript',
  'Ruby',
  'Python',
  'SQL'
].forEach(categoryTitle => {
  category = Category.build({
    title: categoryTitle
  })
  category.save();
});
