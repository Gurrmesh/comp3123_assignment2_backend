const Employee = require('../models/Employee');

exports.list = async (req, res, next) => {
  try {
    const employees = await Employee.find({}).sort({ created_at: -1 });
    return res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      first_name, last_name, email, position,
      salary, date_of_joining, department
    } = req.body;

    if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
      return res.status(400).json({ status: false, message: 'Missing required employee fields' });
    }

    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    });

    return res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: employee._id.toString()
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { eid } = req.params;
    const employee = await Employee.findById(eid);
    if (!employee) {
      return res.status(404).json({ status: false, message: 'Employee not found' });
    }
    return res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { eid } = req.params;

    const employee = await Employee.findByIdAndUpdate(
      eid,
      { ...req.body, updated_at: new Date() },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    return res.status(200).json({ message: 'Employee details updated successfully.' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { eid } = req.query;
    if (!eid) {
      return res.status(400).json({ status: false, message: 'eid query parameter is required' });
    }

    const deleted = await Employee.findByIdAndDelete(eid);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    return res.status(200).json({ message: 'Employee deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
