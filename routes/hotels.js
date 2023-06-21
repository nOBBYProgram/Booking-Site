const express = require('express');
const router = express.Router();

const createError = require('../utils/Error')

const {createHotel,DeleteHotel,updateHotel,getHotel,getHotels, countBycities, countByType} = require('../controllers/hotelControl');
const { verifyAdmin } = require('../utils/verifyToken');
  router.post('/',createHotel)
  router.delete('/:id',verifyAdmin,DeleteHotel)
      router.put('/:id',verifyAdmin,updateHotel)
  router.get('/find/:id',getHotel)
  router.get('/',getHotels)
  router.get('/countbycity',countBycities)
  router.get("/countBytype",countByType)
  
  module.exports = router;