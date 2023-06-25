const express=require("express");
const createController=require("../controllers/createController");
const router=express.Router();

router.get("/addProblem",createController.getInputForm);

router.post("/addProblem",createController.createQuestion);

module.exports=router;