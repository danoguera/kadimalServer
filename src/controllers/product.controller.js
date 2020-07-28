const Product = require('../models/product.model');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

module.exports = {
  async list (req, res){
    const products = await Product.find();
    res.status(200).json(products);
  },
  async create (req, res){
    try{
      console.log(req.body);
      const image = req.body["photo"].url;
      const product = await Product.create({ ...req.body, post_image: image });
      res.status(200).json(product);
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  },
  async update (req, res){
    try{
      let newPic, postImg;
      if (req.body["photo"]) {
        postImg = req.body["photo"].url;
        newPic = { ...req.body, postImg };
      } else {
        newPic = { ...req.body };
      }
      const options = {
        new: true,
      }

      const productId = req.parms.productId;
      const product = await Product.findByIdAndUpdate(productId, newPic, options);
      res.status(200).json(product);
    } catch (error){
      res.status(401).json({ message: error.message });
    }
  },
  async show (req, res){
    try{
      const productId = req.params.productId;
      const product = await Product.findById(productId, req.body);
      res.status(200).json(product);    
    }
    catch {
      res.status(401).json({ message: error.message });
    }
  },
  async showAll (req, res){
      const subcategoryName = req.params.subcategoryName;
      const products = await Product.find({ subcategory: subcategoryName });
      res.status(200).json(products);
  },
  async showAllCategory (req, res){
      const categoryName = req.params.categoryName;
      const products = await Product.find({ category: categoryName });
      res.status(200).json(products);
  },
  async destroy (req, res){
    const productId = req.params.productId;
    const products = await Product.findByIdAndDelete(productId);
    res.status(200).json(products);
  }
}