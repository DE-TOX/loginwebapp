const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const port = 3000;
const app = express();

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))

// mongoose.connect("mongodb://localhost:27017/userDB" , {useNewUrlParser: true});
// const connectDatabase=()=>{ mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true})
// .then(data=>{
//     console.log(`MongoDB connected with server: ${data.connection.host}`);
// })
// }
const connect = mongoose.connect("mongodb://localhost:27017/userDB", {
        //useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Mondo db connected...."))
    .catch((err) => console.log(err));
// module.exports=connectDatabase;
const userSchema = {
  email: String,
  password: String
}
const User = new mongoose.model("User", userSchema)
app.get("/" ,(req,res) =>{
  res.render("home")} )
app.get("/login" ,(req,res) =>{
  res.render("login")} )
app.get("/register" ,(req,res) =>{
  res.render("register")} )

app.post("/register" , async (req,res) =>{
    const newUser = await User.create({
    email: req.body.username,
    password: req.body.password
  })
  await newUser.save((err)=>{
    if(err){
      console.log(err);
    }else{
      res.render("secrets")
    }
  })
})




app.listen(port,() =>{
  console.log("SERVERs");
})
