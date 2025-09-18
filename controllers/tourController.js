const express = require('express');
const app = express();
const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try{
   const queryObj = {...req.query};
   const excludedFields = ['price', 'page', 'sort', 'limit', 'fields'];
  //  Filtring
   excludedFields.forEach(el => delete queryObj[el]);   
  //  Advance Filtering
    const queryStr = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(queryObj); 

    let query =  Tour.find(JSON.parse(queryStr));

  // sorting
   if(req.query.sort) {
     const sortBy = req.query.sort.split(',').join(' ');
     query = query.sort(sortBy);
   } else {
     query = query.sort('-createdAt');
   }

  //  Field Limiting

  if(req.query.fields){
    const fields =  req.query.fields.split(',').join(' ');
    query = query.select(fields);
  }else{
    query = query.select('-__v');
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if(req.query.page) {
    const numTours = await Tour.countDocuments();
    if(skip >= numTours) throw new Error('This page does not exist');
  }

  const tours = await query;


    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  }
  catch(err){
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateTour = async(req,res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteTour = async (req,res)=>{
  try{
     await Tour.findByIdAndDelete(req.params.id);
     res.status(200).json({
       status: 'success',
       data: null
     });
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};
