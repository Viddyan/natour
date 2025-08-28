const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const tourController = require('../controllers/tourController');

// router.param('id', tourController.checkID);
// router.param('name', tourController.checkBody);

router
.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;