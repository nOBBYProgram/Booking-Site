const express = require('express');
const router = express.Router();
const {createRoom, getroom} = require('../controllers/roomController');
const verifyAdmin = require('../utils/verifyToken');
router.post('/:hotelid',createRoom)
router.get('/find/:id',getroom)
module.exports = router;