  const  express =require("express");
 const app = express();
 const path=require("path");
 const port =1112;
  app.use(express.static("public"))
 app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
  const {v4:uuidv4 } = require('uuid');
  const methodOverride =require("method-override");
  app.use(methodOverride("_method"));

 app.listen(port, () => {
    console.log('app listen of port 6060 and other name ${port}');
 });
 let posts =[{
  id: uuidv4(),
   username:"@apnacollge",
   content:"i love coding in all language"
 } ,];
  app.get("/posts" , (req ,res )=>{
  res.render("index.ejs" ,{posts});
 });
  
   app.get("/posts/new" , (req ,res )=>{
    res.render("posts.ejs");
 });
app.get("/posts/:id" , (req ,res )=>{
    let {id} =req.params;
  let post=posts.find((p)=>id===p.id);
    res.render("show.ejs" ,{post});
 });
 app.delete("/posts/:id" , (req ,res )=>{
    let {id} =req.params;
   posts=posts.filter((p)=>id!==p.id);
   res.redirect("/posts");
 });

 app.post("/posts" , (req ,res )=>{
  let id= uuidv4();
   let {username , content} = req.body;
   posts.push({ id ,username , content });
  res.redirect("/posts");
 });
 app.patch("/posts/:id" , (req ,res )=>{
let {id} = req.params;
let newContent=req.body.content;
let post=posts.find((p)=>id===p.id);
  post.content=newContent;
   res.redirect("/posts");
 });
  app.get("/posts/:id/edit" , (req ,res )=>{
    let {id} =req.params;
  let post=posts.find((p)=>id===p.id);
    res.render("edite.ejs" ,{post});
 });