const db = require("../models");
//Tokeni oluşturup tanımlayalım

const jwt = require("jsonwebtoken");

//Databaseden gelecek olan verileri tanımlayalım.
const Product = db.products;
const cartItems = db.cartItems;
const User = db.users;
const Cart = db.carts;
const Order = db.orders;

//Sepet kısmına ekleyeceğimiz ürünler için fonksiyon

const addCart = async (req, res) => {
  const { productId,quantity } = req.body;
  const token = req.headers.authorization;
  console.log(token)
  
  const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
  const userId=decoded.id;
  console.log(userId)

  try {
    const user = await db.users.findByPk(userId);
    if (!user) 
    {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const product = await db.products.findByPk(productId);

    if (!product) 
    {
      return res.status(404).json({ error: 'Ürün bulunamadı.' });
    }

    let cart = await db.carts.findOne({ where: { userId } });

    if (!cart) 
    {
      cart = await db.carts.create({ userId });
    }

    let cartItem = await db.cartItems.findOne({ where: { CartId: cart.id, productId } });

    if (cartItem) {
      // Eğer ürün zaten sepetinizde varsa, miktarını artırın
      
      cartItem.quantity = quantity;
      

      await cartItem.save();
    } else {
      // Eğer ürün sepetinizde yoksa, yeni bir ürün olarak sepete ekleyin
      await db.cartItems.create({ cartId: cart.id, productId, quantity });
    }

    res.json({ message: 'Ürün sepete eklendi.' });
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sepeti eklerken bir hata oluştu' });
  }
};

//Sepet kısmını göreceğimiz ürünler için fonksiyon

const getCart = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  
  try {
    const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log(userId);
    
    const user = await db.users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    
    let cart = await db.carts.findOne({ where: { userId } });
    const cartProducts = await db.cartItems.findAll(
      {
        where:{cartId:cart.id},
            include: {
              model: db.products,
              as: 'product', 
            }      
      }); // İlişkilendirme adınıza uygun şekilde güncelleyin

      let totalPrice = 0;

      cartProducts.forEach((cartItem) => {
        totalPrice += cartItem.quantity * cartItem.product.price; // totalPrice'i kullanarak hesaplama yapın
      });


    res.json({ cartItems: cartProducts,totalPrice }); 
 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Sepeti alırken bir hata oluştu' });
  }
};

//Sepet kısmını silebileceğimiz ürünler için fonksiyon

const deleteCart = async (req, res) => {
  const { productId } = req.body;
  const token = req.headers.authorization;
  
  try {
    const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
    const userId = decoded.id;
    
    const user = await db.users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    
    let cart = await db.carts.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ error: 'Sepet bulunamadı.' });
    }
    
    await db.cartItems.destroy({ where: { CartId: cart.id, productId } });
    
    res.json({ message: 'Ürün sepetten kaldırıldı.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sepeti silerken bir hata oluştu' });
  }
};

//Sepet kısmını güncelleyebileceğimiz ürünler için fonksiyon

const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const token = req.headers.authorization;
  
  try {
    const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
    const userId = decoded.id;
    
    const user = await db.users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    
    let cart = await db.carts.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ error: 'Sepet bulunamadı.' });
    }
    
    const cartItem = await db.cartItems.findOne({ where: { CartId: cart.id, productId } });
    if (!cartItem) {
      return res.status(404).json({ error: 'Ürün sepetinizde bulunamadı.' });
    }
    
    cartItem.quantity = quantity;
    await cartItem.save();
    
    res.json({ message: 'Ürün sepetinizde güncellendi.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sepeti güncellerken bir hata oluştu' });
  }
};





module.exports = { addCart, getCart, deleteCart, updateCart};



