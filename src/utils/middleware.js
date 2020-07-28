const jwt = require('jsonwebtoken');
const Product = require('../models/product.model');   

module.exports = {
  async auth (req, res, next){
    try{
      const token = req.headers.authorization;
      req.user = await jwt.verify(token, process.env.SECRET); 
      next();
    }catch (error){
      res.status(401).json({ message: error.message });
    }
  },

  async verify (req, res, next){
    try{
      const token = req.headers.authorization;
      req.user = await jwt.verify(token, process.env.SECRET);
      const product = await Product.findById(req.params.productId);
      if(!product){
        throw Error("El producto no existe.")
      }
    }
    catch{
      res.status(401).json({ message: error.message });
    }
  }
}