
const Hotel = require('../Models/hotel')

const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);
    try{
    const savedHotel = await newHotel.save();
    res.status(200).send(savedHotel)
    }
    catch(err){
     next(err);
    }

}

const updateHotel = async (req,res,next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).send(updatedHotel);
        }
    catch(err){
     next(err);
    }

}
const DeleteHotel = async (req,res,next)=>{
   
    try{
        await Hotel.findByIdAndDelete(req.params.id);
       res.status(200).send("HOtel has been deleted succesfully.");
       }
    catch(err){
     next(err);
    }

}
const getHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).send(hotel);
        }
    catch(err){
     next(err);
    }

}
const getHotels = async (req,res,next)=>{
    const {min,max,...others} = req.query;
    
    console.log('min:', min);
console.log('max:', max);
console.log('others:', others);
    try{
   const hotels = await Hotel.find({...others,
    
cheapest:{$gt:min || 1,$lt:max || 999},
}).limit(parseInt(req.query.limit))
   res.status(200).send(hotels)
        }
    catch(err){
     next(err);
    }

}
const countBycities = async (req,res,next)=>{
    const cities = req.query.cities.split(",");
    try{
  const list = await Promise.all(cities.map((city)=>{
    return Hotel.countDocuments({city:city})
  }))
  res.status(200).send(list)
    }
    catch(err){
        next(err)
    }
}
const countByType = async (req,res,next)=>{
   const hotelcount = await Hotel.countDocuments({type:"hotel"})
   const apartmentcount = await Hotel.countDocuments({type:"apartment"})
   const cabincount = await Hotel.countDocuments({type:"cabin"})
   const resortcount = await Hotel.countDocuments({type:"resort"})
   const villascount = await Hotel.countDocuments({type:"villas"})
    try{
  res.status(200).json([{type:"Hotel",count:hotelcount},
  {type:"apartment",count:apartmentcount},
  {type:"cabin",count:cabincount},
  {type:"resort",count:resortcount},
  {type:"villas",count:villascount}])
    }
    catch(err){
        next(err)
    }
}

module.exports ={createHotel,DeleteHotel,updateHotel,getHotel,getHotels,countBycities,countByType};
