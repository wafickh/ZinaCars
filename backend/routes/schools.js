const express = require('express');
const router = express.Router();

const { getSchoolByName, DeleteAllSchools, getSchools,getSchool, CreateSchool, DeleteSchool, UpdateSchool }=require("../controllers/schools.js")
//Get All Schools
router.get('/', getSchools)

router.delete('/',DeleteAllSchools)

// CREATE
router.post('/', CreateSchool)

//Delete
router.delete('/:id', DeleteSchool);

//Update
router.put('/:id', UpdateSchool);

//Get
router.get("/find/:id", getSchool);

//GetByName
router.get("/findName/:name", getSchoolByName);




module.exports = router;