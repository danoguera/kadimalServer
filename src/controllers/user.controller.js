const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async create(req, res){
    try{
      const password = await bcrypt.hash(req.body.password,10);
      const email = req.body.email.toLowerCase();
      const user = await User.create({ ...req.body, email, password });
      const token = await jwt.sign({ "id": user._id }, process.env.SECRET, { expiresIn: 60 * 60 });
      res.status(200).json(token);
    } 
    catch (error){
      res.status(401).json({ message: error.message })
    }
  },
  async signIn(req,res){
    try{
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
      if(!user){
        throw Error("Datos de ingreso equivocados.")
      }
      const password = user.password;
      const result = await bcrypt.compare(req.body.password, password);
      if (result){
        const token = await jwt.sign({ "id": user._id }, process.env.SECRET, { expiresIn: 60 * 60 });
        res.status(200).json(token);
      } else{
        res.status(401).json("Correo/Contraseña equivocada.")
      }
    }
    catch(error){
      res.status(401).json({ message: error.message })
    }
  },
  async show (req, res){
    const userId = req.user.id;
    const user = await User.findById(userId, req.body);
    res.status(200).json(user);
  },
  async update(req, res){
      const options = {
        new: true,
      }
      const userId = req.user.id;
      const user = await User.findByIdAndUpdate(userId, req.body, options);
      res.status(200).json(user);
  },
  async destroy(req, res){
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);
    this.status(200).json(user);
  }
} 