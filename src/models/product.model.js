const { Schema, model, models } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required:[true, 'El nombre del producto es requerido.']
  },
  reference: {
    type: String,
    required:[true, 'La referencia es obligatoria.']
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required:[true, 'El precio es obligatorio.']
  },
  amount: {
    type: Number,
    required:[true, 'La cantidad es requerida.']
  },
  post_image: {
    type: String,
    required:[true, 'La foto es requerida.']
  },
  category: {
    type: String,
    required:[true, 'La categoría es requerida.']
  }
},{
  timestamps: true,
});

const Product = model('Product', productSchema);

module.exports = Product;