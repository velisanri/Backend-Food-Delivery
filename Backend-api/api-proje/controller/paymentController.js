const db = require("../models");
//Database ve token kısmını tanımlayalım.
const jwt = require("jsonwebtoken");

const Payment = db.payments;

//Kart ekleme fonksiyonu

const addPayment = async (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
  
    try {
      const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
      const userId = decoded.id;
      console.log(userId);
   
      // Değer'in varlığını kontrol edelim
      if (!req.body.cartNumber) {
        return res.status(400).send({
          message: "Kart kısmı boş olamaz",
        });
      }
  
      const user = await db.users.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
      }
  
      let payment = await db.payments.findOne({ where: { userId } });
   
      if (!payment) {
        payment = await db.payments.create({
          userId,
          fullname: req.body.fullname,
          cartNumber: req.body.cartNumber,
          CVV: req.body.CVV,
        });
      }
  
      res.status(200).send(payment);
      console.log(payment);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kart eklenirken hata oluştu' });
    }
};
  

module.exports = {addPayment}