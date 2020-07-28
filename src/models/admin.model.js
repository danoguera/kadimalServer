const { Schema, model, models } = require('mongoose');

const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const uniqueEmail = {
  validator(value){
    return models.Admin.findOne({ email: value })
      .then(user => !user)
      .catch(() => false);
  },
  message: "El correo ingresado ya existe."
}

const checkUsers =  {
  validator(value) {
    return models.User.countDocuments({ email: value })
      .then(response => { 
          if (response >= 1){
              return false;
          } else{
              return true;
          };
      })
      .catch(() => false);
  },
  message: 'El corrego ingresado ya existe.'
}

const adminSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio."]
  },
  surname: {
    type: String,
    required: [true, "El apellido es requerido."]
  },
  password: String,
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio."],
    validate: [uniqueEmail],
    validate: [checkUsers]
  },
  documentId: Number,
},{
  timestamps: true,
});

const Admin = model('Admin', adminSchema);
module.exports = Admin;