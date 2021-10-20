async function syncDatabase(){
  const Category = require('./../categories/Category');
  await Category.sync({ force: true });

  const Article = require('./../articles/Article');
  Article.sync({ force: true });

  const Admin = require('./../admins/Admin');
  Admin.sync({ force: true });
}

syncDatabase();
