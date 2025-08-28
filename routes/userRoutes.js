const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
app.use('/api/v1/users', router);

const userController = require('../controllers/userController');

// app.use('/api/v1/users', router);
router
.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

  module.exports = router;