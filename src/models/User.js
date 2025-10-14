const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email:    { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.updated_at = new Date();
  next();
});

userSchema.methods.comparePassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = model('User', userSchema);
