const db = require("../models");

// Modelden aldığımz data'yı tanımlayalım
const jwt = require("jsonwebtoken");

const Product = db.products;
const User = db.users;

// Ürün oluşturma fonksiyonu

const addProduct = async (req, res) => {

  if (!req.body.title || !req.body.categoryId) {
    res.status(400).send({
      message: "Title(başlık) ve categoryId(Kategori) boş olamaz",
    });
    return;
  }
  // Ürün oluşturalım
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    categoryId: req.body.categoryId,
  }; 

  // Token'dan giriş yapan kullanıcının userId'sini alalım
  const token = req.headers.authorization;
  const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
  const userId = decoded.id;
  info.userId = userId;
  console.log(userId);
  // Ürünü database'in içine yerleştirelim

  try {

    const product = await Product.create(info);
    res.status(200).send(product);
    console.log(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    }); 
  }
};


// Tüm ürünleri gösteren fonksiyon

const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.status(200).send(products);
  console.log(products);
};

// Tek bir ürünü gösteren fonksiyonu

const getSingleProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

// Ürünleri güncelleme fonksiyonu

const updateProduct = async (req, res) => {
  let id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send('Product is Updated');
};

// Ürünleri silme fonksiyonu

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send("Product is deleted");
};


//ürünleri dışarı aktarma

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};