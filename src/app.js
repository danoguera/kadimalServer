const express = require("express");
const cors = require("cors");
const initDatabase = require('./db');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const User = require('./models/user.model');
const Admin = require('./models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

initDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendStatus(200);
})

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);
app.post('/login', async (req, res) => {
  try{
    let user;
    let typeOfUser = "user";
    user = await User.findOne({ email: req.body.email.toLowerCase() });
    if(!user){
      user = await Admin.findOne({ email: req.body.email.toLowerCase() });
      typeOfUser = "admin"; 
    }
    if(!user){
      throw Error("Datos de ingreso equivocados.");
    }
    const password = user.password;
    const result = await bcrypt.compare(req.body.password, password);
    if (result){
      const token = await jwt.sign({ "id": user._id }, process.env.SECRET, { expiresIn: 60 * 60 });
      res.status(200).json({ token, typeOfUser });
    } else{
      res.status(401).json("Correo/Contraseña equivocada.")
    }
  }
  catch(error){
    res.status(401).json({ message: error.message })
  }
})

module.exports = app;