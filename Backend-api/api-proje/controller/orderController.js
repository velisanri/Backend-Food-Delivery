const db = require("../models");
const jwt = require("jsonwebtoken");

const Product = db.products;
const CartItem = db.cartItems;
const User = db.users;
const Cart = db.carts;
const Order = db.orders;
const OrderItem = db.orderItems;

// Siparişi oluşturmak için fonksiyon
const createOrder = async (req, res) => {
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

    const cartProducts = await db.cartItems.findAll({
      where: { cartId: cart.id },
      include: {
        model: db.products,
        as: 'product', 
      },
    }); 

    const orderItems = cartProducts.map((cartItem) => ({
      productId: cartItem.productId,
      quantity: cartItem.quantity, 
    }));

    const newOrder = await db.orders.create({
      userId: user.id,
    });

    await Promise.all(orderItems.map(async (orderItem) => {
      const product = await db.products.findByPk(orderItem.productId);
      if (product) {
        await OrderItem.create({
          orderId: newOrder.id,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
        });
      }
    }));

    // Siparişi oluşturduktan sonra sepeti temizleme
    await db.cartItems.destroy({ where: { cartId: cart.id } });

    // Oluşturulan siparişi ve içeriğini döndürme
    const orderWithItems = {
      order: newOrder,
      orderItems: orderItems 
    }; 

    res.json({ message: 'Sipariş oluşturuldu ve sepet temizlendi.', orderWithItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sipariş oluştururken bir hata oluştu.' });
  } 
};

const getOrder = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await db.users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    let orders = await db.orders.findOne({ where: { userId } });
    const orderProduct = await db.orderItems.findAll(
      {
        where:{orderId:orders.id},
            include: {
              model: db.products,
              as: 'product', 
            }      
      }); // İlişkilendirme adınıza uygun şekilde güncelleyin
    res.json({ orderItems: orderProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Siparişleri alırken bir hata oluştu.' });
  }
};


 
module.exports = { createOrder ,getOrder};
