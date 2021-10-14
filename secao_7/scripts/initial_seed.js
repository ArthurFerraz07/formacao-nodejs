const Category = require('./../categories/Category');
const Article = require('./../articles/Article');
const Admin = require('./../admins/Admin');

[
  'Javascript',
  'Ruby',
  'Python',
  'SQL'
].forEach(categoryTitle => {
  Category.create({
    title: categoryTitle
  }).then(category => {
    for(var i = 0; i < 10; i++){
      Article.create({
        categoryId: category.id,
        title: `Artigo de ${category.title} #${i + 1}`,
        body: `<p>Parágrafo 1</p><p>Parágrafo 2</p><p>Parágrafo 3</p>`
      });
    };
  });
});

Admin.create({
  email: 'admin@example.com',
  password: '123456'
});

