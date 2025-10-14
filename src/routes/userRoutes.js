const router = require('express').Router();
const { body, oneOf } = require('express-validator');
const validate = require('../middleware/validateRequest');
const { signup, login } = require('../controllers/userController');

router.post('/signup', [
  body('username').isLength({ min:3 }).withMessage('username min 3 chars'),
  body('email').isEmail().withMessage('valid email required'),
  body('password').isLength({ min:8 }).withMessage('password min 8 chars')
], validate, signup);

router.post('/login', [
  oneOf([ body('email').isEmail(), body('username').isString().notEmpty() ],
        'email or username is required'),
  body('password').notEmpty().withMessage('password required')
], validate, login);

module.exports = router;
