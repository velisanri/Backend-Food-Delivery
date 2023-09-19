const db = require("../models");

//bcrypt ve token'i tanımlayalım.

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistedToken = db.tokens;

// Modelden aldığımz data'yı tanımlayalım
const User = db.users;

//Kullanıcı kayıt fonksiyonu

const register = async (req,res,next)=>{
    let already=await User.findOne({where:{email:req.body.email}}).catch((err)=>{
        console.log("error",err);
    })
    if(already)
    {
        return res.json({message:"Hatalı email"})
    } 
    bcrypt.hash(req.body.password,10,function(err,hashedPass) {
        if(err)
        { 
            res.json({error:err})
        }
        let user = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })

        user.save().then(user=>{
            res.json({message:"Kullanıcı ekledim"});
        })
        .catch(error=>{
            res.json({
                message:"Hatalı kullanici"
            })
        })
    })

}

//Kullanıcı giriş fonksiyonu 

const login = async (req,res,next) => {
  var password = req.body.password
  var email = req.body.email
  
  let userWithEmail = await User.findOne({where:{email:req.body.email}}).catch((err)=>{
      console.log("err",err);
  })
  if(!userWithEmail)
  {
      return res.json({message:"Geçersiz email"})
  }

  User.findOne({ where: {email} })
  .then(user=>{
      if(user){
          bcrypt.compare(password,user.password,function(err,result){
              if(err) {
                  res.json({
                      error:err
                  })
              }
              if(result)
              {
                 const payload = {
                   id:user.id,
                   email:user.email,
                }
                let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"5d"});
                console.log("token",token);
                res.status(200).json({success:true,token:token});
              }
              else
              {
                  res.json({
                      message:"Hatalı şifre"
                  })
              }
          });
      }
      else
      {
          res.json({message:"Kullanıcı bulunamadi"})
      }
             
  }) 
  
  
}

//Kullanıcı ekleme fonksiyonu

const addUser = async (req, res) => {
  let info = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone:req.body.phone,
    password:req.body.password
  };


  try {
    const user = await User.create(info);
    res.status(200).send(user);
    console.log(user);
  } 
  catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};


//Tüm kullanıcıları gösteren fonksiyon

const getAllUsers = async (req, res) => {
  let users = await User.findAll({});
  res.status(200).send(users);
  console.log(users);
};


//Tek bir kullanıcıyı gösteren fonksiyon

const getSingleUser = async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({ where: { id: id } });
  res.status(200).send(user);
};

//Kullancıyı güncelleyen fonksiyon

const updateUser = async (req, res) => {
  let id = req.params.id;
  const user = await User.update(req.body, { where: { id: id } });
  res.status(200).send('User is Updated');
};

//Kullanıcıyı silen fonksiyon

const deleteUser = async (req, res) => {
  let id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.status(200).send("User is deleted");
};

const logout = async (req, res) => {
  const invalidatedTokens = [];
  const token = req.header("Authorization").replace("Bearer ", ""); // Header'dan token alınır

  // Bu logout fonksiyonunda sadece token'i geçersiz hale getiriyoruz
  invalidatedTokens.push(token);

  res.status(200).json({ message: "Çıkış yapıldı" });
};



module.exports = {
  register,
  login,
  addUser,
  getAllUsers,
  getSingleUser, 
  updateUser,
  deleteUser,
  logout,
};