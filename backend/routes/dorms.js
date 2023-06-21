const express = require('express');
const router = express.Router();
const multer = require('multer');

const { CreateDorm, getDorm, UpdateDorm, DeleteDorm, getAllDorms } = require("../controllers/dorms.js");
const auth = require('../middleware/auth.js');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// CREATE
router.post('/', auth, CreateDorm)

//FindDorm
router.get('/find/:id', getDorm)

router.get('/',getAllDorms)

//UpdateDorm
router.put('/:id', UpdateDorm)

//DeleteDorm
router.delete('/:schoolid/:dormid/:userid', DeleteDorm)


module.exports = router; 