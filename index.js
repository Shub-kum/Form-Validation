const express = require("express");
const app = express();
const {body, validationResult} = require("express-validator");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : false}));

var validationRagistration = [
   body("username").notEmpty()
   .withMessage("Username is required.")
   .isLength({min : 3}).withMessage("Username must be at 3 character long")
   .trim()
   .isAlpha()
   .withMessage("Username must contain only Latters")
   .custom(value =>{
    if(value === "admin"){
    throw new Error('Username "admin" is not allowed.')
    }
    return true 
   })   
   .customSanitizer(value =>value.toLowerCase()),
   
   
   body("email").isEmail()
   .withMessage("Please provide the valid Email Id")
   .normalizeEmail(),
   
   body("password").isLength({min : 6, max : 10})
   .withMessage("Password must be between 6 and 10 character long.")
   .isStrongPassword().withMessage("Password must be strong."),
   
   body("age").isNumeric()
   .withMessage("Please enter the numeric value only.")
   .isInt({min : 18}).withMessage("Age must be at least 18 year."),

   body("city").isIn(["New York","Delhi","Chicago","Noida","Mumbai"])
   .withMessage("City must be New York, Delhi, Chicago, Noida, Mumbai"),
]

app.get("/myform",(req, res)=>{
res.render("myform.ejs",{errors : 0});
});

app.post("/saveform", validationRagistration ,(req, res)=>{
    const error = validationResult(req);
    if((error.isEmpty)){
// res.send(req.body);
    }
res.render("myform.ejs",{errors : error.array()})
});

app.listen(3000,()=>{
console.log("Yes");
});