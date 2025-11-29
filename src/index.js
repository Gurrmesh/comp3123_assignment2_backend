require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);
app.use((req, res) => res.status(404).json({ status: false, message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  const code = err.statusCode || 500;
  res.status(code).json({ status: false, message: err.message || 'Server error' });
});

const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
});
