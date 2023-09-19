const db = require("../models");
const jwt = require("jsonwebtoken");

const Adres = db.adress;
const User = db.users;

//Adress ekleme fonksiyonu

const addAdress = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);

  try {
    const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log(userId);

    // Değer'in varlığını kontrol edelim
    if (!req.body.adress) {
      return res.status(400).send({
        message: "Adres boş olamaz",
      });
    }

    const user = await db.users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    let adres = await db.adress.findOne({ where: { userId } });

    if (!adres) {
      adres = await db.adress.create({
        userId,
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        phone: req.body.phone,
        city: req.body.city,
        adress: req.body.adress
      });
    }

    res.status(200).send(adres);
    console.log(adres);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Adres eklenirken hata oluştu' });
  }
};

//Adress güncelleme fonksiyonu

const updateAdress = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
  const userId = decoded.id;

  // Değerin varlığını kontrol edelim
  if (!req.body.adressId || !req.body.newAdress) {
    return res.status(400).json({
      message: "Adres ID (adressId) ve yeni adres(newAdress) bilgisi gereklidir",
    });
  }

  try {
    const user = await db.users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const adress = await Adres.findByPk(req.body.adressId);
    if (!adress) {
      return res.status(404).json({ error: 'Adres bulunamadı.' });
    }

    // Güncellenen alanları kontrol edin ve gerektiğinde güncelleyin
    if (req.body.firstname) {
      adress.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
      adress.lastname = req.body.lastname;
    }
    if (req.body.phone) {
      adress.phone = req.body.phone;
    }
    if (req.body.city) {
      adress.city = req.body.city;
    }

    // Adresi güncelle
    adress.adress = req.body.newAdress;
    await adress.save();

    res.status(200).json(adress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Adres güncellenirken hata oluştu' });
  }
};

//Adress silme fonksiyonu

const deleteAdress = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
  const userId = decoded.id;

  // Adres kimliği (ID) kontrolü
  const adressId = req.body.adressId;
  if (!adressId) {
    return res.status(400).json({
      message: "Adres ID gereklidir",
    });
  }

  try {
    const user = await db.users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const adress = await Adres.findByPk(adressId);
    if (!adress) {
      return res.status(404).json({ error: 'Adres bulunamadı.' });
    }


    await adress.destroy();

    res.status(200).json({ message: "Adres başarıyla silindi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Adres silinirken hata oluştu' });
  }
};

//Adress getirme fonksiyonu

const getAdress = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  
  try {
    const decoded = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
    const userId = decoded.id;
    
    const user = await db.users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    let adres = await db.adress.findOne({ where: { userId } });
    if (!adres) {
      return res.status(404).json({ error: 'Kullanıcının adresi bulunamadı.' });
    }

    res.json({ adress: adres });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Adresleri alırken bir hata oluştu' });
  }
};





module.exports = { addAdress, updateAdress, deleteAdress, getAdress };








