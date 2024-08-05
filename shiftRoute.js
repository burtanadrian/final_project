let express = require('express');
let router = express.Router();
let shiftFunctions = require("./shiftFunctions.js");
let userFunctions=require("./userFunctions.js");
// 1. Crearea unui nou shift (POST)
router.post('/createShift',userFunctions.ProtectUser, shiftFunctions.addShift);

// 2. Obținerea tuturor shifturilor (GET)
router.get('/getAllShifts',userFunctions.ProtectUser ,shiftFunctions.getAllShifts);

// 3. Obținerea unui anumit shift după ID (GET)
router.get('/getShift/:id', userFunctions.ProtectUser,shiftFunctions.getShiftById);

// 4. Actualizarea unui shift după ID (PATCH)
router.patch('/updateShift/:id', userFunctions.ProtectUser,shiftFunctions.updateShiftById);

// 5. Ștergerea unui shift după ID (DELETE)
router.delete('/deleteShift/:id', userFunctions.ProtectUser,shiftFunctions.deleteShift);

module.exports = router;