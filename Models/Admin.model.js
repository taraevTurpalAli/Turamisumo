const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
