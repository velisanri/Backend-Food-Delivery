const express = require('express');
const cors = require('cors');
const app = express();
const {Sequelize, DataTypes} = require('sequelize');
const env = require("dotenv").config();




// global middleware

var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
   
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routers
const productRouter = require("./routes/productRouter");
app.use('/products', productRouter);   

const userRouter=require("./routes/userRouter");
app.use("/user",userRouter);

const cartRouter=require("./routes/cartRouter"); 
app.use("/cart",cartRouter);

const adressRouter=require("./routes/adressRouter");
app.use("/adres",adressRouter);  

const paymentRouter=require("./routes/paymentRouter");
app.use("/payments",paymentRouter);

const orderRouter=require("./routes/orderRouter");  
app.use("/orders",orderRouter);



 
// api
app.get('/', (req, res) => {
    res.json({
        message:"Merhabalar "
    });
})


// port
const PORT = 3000;

// server
app.listen(PORT, () => {
    console.log(`Server is running on 3000`)
})