const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

const { signin, signup, allusers, deleteuser,MakeAdmin } = require("../controllers/users.js")

router.post('/signin', signin);

router.post('/signup', signup);

router.get('/', allusers);

router.delete('/:id', deleteuser)

router.put('/:id',MakeAdmin)
module.exports = router;