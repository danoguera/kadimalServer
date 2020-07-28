const { Schema, model, models } = require('mongoose');  

const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const uniqueEmail = {
  validator(value) {
    return models.User.findOne({ email: value })
      .then(user => !user)
      .catch(() => false);
  },
  message: 'Correo ya existe.'
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido."]
  },
  surname: {
    type: String,
    required: [true, "Apellido es requerido."]
  },
  password: {
    type: String,
    required: [true, "Clave es requerida."]
  },
  email: {
    type: String,
    required: [true, "Correo electrónico requerido."],
    validate: [uniqueEmail],
  },
  documentId: Number,
},{
  timestamps: true, 
});

const User = model('User', userSchema);
module.exports = User;