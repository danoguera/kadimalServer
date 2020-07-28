const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async list(req, res){
    const admins = await Admin.find();
    res.status(200).json(admins);
  },
  async create (req, res){
    try{
      if (!req.body.email){
        throw Error("Por favor incluya su correo electrónico.")
      }
      if (!req.body.password){
        throw Error("Por favor incluya su clave.")
      }
      const password = await bcrypt.hash(req.body.password, 10);
      const email = req.body.email.toLowerCase();
      const admin = await Admin.create({ ...req.body, email, password });
      const token = await jwt.sign({ "id": admin._id }, process.env.SECRET, { expiresIn: 60 * 60 });
      res.status(200).json(token);
    }
    catch(error) {
      res.status(401).json({ message: error.message });
    }
  },
  async signIn(req, res){
    try{
      const admin = await Admin.findOne({ email: req.body.email.toLowerCase() });
      if (!admin){
        throw Error("Datos de ingreso equivocados.");
      }
      const password = admin.password;
      const result = await bcrypt.compare(req.body.password, password);
      if (result){
        const token = await jwt.sign({ "id": admin._id }, process.env.SECRET);
        res.status(200).json(token);
      }
    }
    catch
    {
      res.status(401).json({ message: error.message }); 
    }
  },
  async update(req, res){
    const options = {
      new: true,
    }
    const userId = req.user.id;
    const admin = await Admin.findByIdAndUpdate(userId, req.body, options);
    res.status(200).json(admin);
  },
  async show (req, res){
    const userId = req.user.id;
    const admin = await Admin.findById(userId, req.body);
    res.status(200).json(admin);
  },
  async destroy (req, res){
    const userId = req.user.id;
    const admin = await Admin.findByIdAndDelete(userId);
    res.status(200).json(admin);
  }
}