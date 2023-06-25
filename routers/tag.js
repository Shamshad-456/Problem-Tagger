const express = require("express");

const router = express.Router();
const tagController=require("../controllers/tagController");

router.get('/tag',tagController.getTaginfo);

router.post("/tag",tagController.selectedTag);

module.exports=router;