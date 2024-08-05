let express =require('express');
let router= express.Router();
let userFunctions =require("./userFunctions.js");
// 1.postam un user(cu post) sign up
router.post('/createUser',userFunctions.CreateUser);
//1.1 login
router.post('/loginUser',userFunctions.loginUser);
//2.aducem toti utilizatorii (cu get)
router.get('/AllUsers',userFunctions.ProtectUser,userFunctions.IsAdmin,userFunctions.allUsers);
//3.cautam un anumit user dupa "id" (cu get)
router.get('/GetUser/:id',userFunctions.ProtectUser,userFunctions.getUser);
//4.delete user
router.delete('/DeleteUser/:id',userFunctions.ProtectUser,userFunctions.IsAdmin,userFunctions.DeleteUser);
///5.update user(cu patch)
router.patch('/UpdateUser/:id',userFunctions.ProtectUser,userFunctions.UpdateUser);
module.exports = router;