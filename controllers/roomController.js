const Hotel = require('../Models/hotel')
const Room = require('../Models/room');


const createRoom = async (req,res,next)=>{
    const hotelid = req.params.hotelid
    const newRoom = new Room(req.body);
    try{
    const savedHotel = await newRoom.save();
    try{
await Hotel.findByIdAndUpdate(hotelid,{$push:{rooms:savedHotel._id}})
    }
    catch(err){
next(err)
    }
    res.status(200).send(savedHotel);
    }
    catch(err){
     next(err);
    }

}
const getroom = async(req,res,next)=>{
    const id = req.params.id;
    const hotel = await Hotel.findById(id);
    const list = await Promise.all( hotel.rooms.map((room)=>{
       return Room.findById(room)
}))
res.status(200).json({list})
}
module.exports = {createRoom,getroom};