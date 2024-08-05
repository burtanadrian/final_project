//Importă modulul express, necesar pentru crearea și configurarea aplicației Express.
let express =require('express');
//Creează un nou router Express, care va fi utilizat pentru a defini rutele pentru comentarii.
let router =express.Router();
//Importă funcțiile necesare pentru gestionarea utilizatorilor din fișierul userFunctions.js.
let userFunctions =require('./userFunctions');
///Importă funcțiile necesare pentru gestionarea comentariilor din fișierul commentFunctions.js.
let commentFunctions=require('./commentFunctions');
//Defineste o rută POST pentru crearea unui nou comentariu
router.post("/comment",userFunctions.ProtectUser,commentFunctions.createComment);
// Defineste o rută GET pentru obținerea tuturor comentariilor.
router.get("/comment",userFunctions.ProtectUser,userFunctions.IsAdmin,commentFunctions.getAllComments);
//Defineste o rută PATCH pentru actualizarea unui comentariu existent, identificat prin ID-ul său.
 router.patch("/comment/:id", userFunctions.ProtectUser, commentFunctions.updateCommentById);
//Defineste o rută DELETE pentru ștergerea unui comentariu existent, identificat prin ID-ul său
 router.delete("/comment/:id",userFunctions.ProtectUser,userFunctions.IsAdmin,commentFunctions.deleteComment);
// Defineste o rută GET pentru obținerea tuturor comentariilor asociate unui anumit utilizator, identificat prin ID-ul său
 router.get("/comment/:id",userFunctions.ProtectUser,commentFunctions.getCommentById);
module.exports=router;