const Category = require('./../categories/Category');
Category.sync({ force: true }).then(() => {
  const Article = require('./../articles/Article');
  Article.sync({ force: true });
});

const Admin = require('./../admins/Admin');
Admin.sync({ force: true })
