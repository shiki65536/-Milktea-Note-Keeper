const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("hmongodb://localhost:27017/noteDB");

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Note = mongoose.model("note", noteSchema);


app.get("/", function(req, res){
    res.render("/");
})

app.post("/", function(req, res){
    res.render("/");
});

app.listen(3000, ()=>{
    console.log("listen to 3000")
})