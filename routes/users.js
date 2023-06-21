const express = require('express');
const router = express.Router();
const {verifyToken,verifyUser,verifyAdmin} = require('../utils/verifyToken')

const {DeleteUsers,updateUsers,getUser,getUsers} = require('../controllers/userController');
// router.get('/check-authentication', verifyToken, (req, res,next) => {
//         res.send("Hello user, You are authorized!");
//       });
//       router.get('/check-authentication/:id', verifyUser, (req, res,next) => {
//         res.send("Hello user, You are verified and now you can delete your account!");
//       });
//       router.get('/check-admin/:id', verifyAdmin, (req, res,next) => {
//         res.send("Welcome admin! You can delete any account from this site.");
//       });
router.delete('/:id',verifyUser,DeleteUsers)
router.put('/:id',verifyUser,updateUsers)
router.get('/:id',verifyUser,getUser)
router.get('/',verifyAdmin,getUsers)

module.exports = router;