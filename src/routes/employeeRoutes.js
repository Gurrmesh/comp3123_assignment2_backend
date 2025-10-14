const router = require('express').Router();
const { body, param, query } = require('express-validator');
const validate = require('../middleware/validateRequest');
const c = require('../controllers/employeeController');

router.get('/employees', c.list);

router.post('/employees', [
  body('first_name').notEmpty(),
  body('last_name').notEmpty(),
  body('email').isEmail(),
  body('position').notEmpty(),
  body('salary').isNumeric(),
  body('date_of_joining').isISO8601(),
  body('department').notEmpty()
], validate, c.create);

router.get('/employees/:eid', [ param('eid').isMongoId() ], validate, c.getById);

router.put('/employees/:eid', [ param('eid').isMongoId() ], validate, c.update);

router.delete('/employees', [ query('eid').isMongoId() ], validate, c.remove);

module.exports = router;
