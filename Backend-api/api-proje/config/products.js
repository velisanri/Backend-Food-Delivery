const db = require("../models");
const category = require("../models/category");
const Product = db.products;
const Category = db.categories;
const User = db.users;

const products = [
  {
    title: "Klasik Pizza",
    price: 120,
    description: "Mantar,kaşar peyniri,domates,sucuk,salam ve sosis",
    userId: 1,
    categoryTitle: "Pizzalar",
  },
  {
    title: "Margarita Pizza",
    price: 120,
    description: "Mozarella peyniri ve kekik",
    userId: 1,
    categoryTitle: "Pizzalar",

  },
  {
    title: "Sosisli Pizza",
    price: 120,
    description: "Mozarella peyniri dilimlenmiş sosis , taze mantar , siyah zeytin",
    userId: 1,
    categoryTitle: "Pizzalar",

  },
  { 
    title: "Vejeteryan Pizza",
    price: 120,
    description: "Mozarella peyniri , Mısır , siyah zeytin , yesil biber",
    userId: 1,
    categoryTitle: "Pizzalar",

  },
  {
    title: "Patates Kızartmasi",
    price: 120,
    description: "Patates kizartmasi",
    userId: 1,
    categoryTitle: "Citir Lezzetler",
  },
  {
    title: "6'li sogan halkasi",
    price: 120,
    description: "6'li sogan halkasi",
    userId: 1,
    categoryTitle: "Citir Lezzetler",
  },
  {
    title: "6 li nugget",
    price: 120,
    description: "6 li nugget",
    userId: 1,
    categoryTitle: "Citir Lezzetler",
  },
  {
    title: "4 lu kanat",
    price: 120,
    description: "4 lu kanat",
    userId: 1,
    categoryTitle: "Citir Lezzetler",
  },
  {
    title: "2 li but",
    price: 120,
    description: "2 li but",
    userId: 1,
    categoryTitle: "Citir Lezzetler",
  },
  {
    title: "Coca cola  1 lt",
    price: 120,
    description: "Coca cola  1 lt",
    userId: 1,
    categoryTitle: "Icecekler",
  },
  {
    title: "Fanta  1 lt",
    price: 120,
    description: "Fanta  1 lt",
    userId: 1,
    categoryTitle: "Icecekler",
  },
  {
    title: "Fuse Tea Seftali  1 lt",
    price: 120,
    description: "Fuse Tea Seftali  1 lt",
    userId: 1,
    categoryTitle: "Icecekler",
  },
  {
    title: "Fuse Tea Limon  1 lt",
    price: 120,
    description: "Fuse Tea Limon  1 lt",
    userId: 1,
    categoryTitle: "Icecekler",
  },
  {
    title: "Sprite  1 lt",  
    price: 120,
    description: "Sprite  1 lt",
    userId: 1,
    categoryTitle: "Icecekler",
  }, 
];

const categories = [
  {
    title: "Pizzalar",
  }, 
  {
    title: "Citir Lezzetler", 
  },
  { 
    title: "Icecekler",
  },
]; 

async function createProducts() {
  try {
    for (const productData of products) {
      const categoryTitle = productData.categoryTitle; 
      const category = await Category.findOne({ where: { title: categoryTitle } });
      if (category) {
        await Product.findOrCreate({
          where: { title: productData.title },
          defaults: { ...productData, categoryId: category.id },
        });
      } else {
        const newCategory = await Category.create({ title: categoryTitle });
        await Product.findOrCreate({
          where: { title: productData.title },
          defaults: { ...productData, categoryId: newCategory.id },
        });
        console.log(`Yeni kategori oluşturuldu: ${categoryTitle}`);
      }
    }

    console.log("Ürünler ve kategoriler veritabanına eklendi.");
  } catch (err) {
    console.error("Ürünleri ve kategorileri eklerken bir hata oluştu:", err.message);
  }
}

module.exports = createProducts;




