const { Schema, model } = require('mongoose');

const employeeSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  position: String,
  salary: Number,
  date_of_joining: Date,
  department: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

employeeSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.employee_id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = model('Employee', employeeSchema);
