const express = require("express");
const cors = require('cors');
const data = require('mysql');
const bodyparser=require("body-parser"); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(express.static('public'));

let con = data.createConnection({
    host : "localhost",
    user : "root",
    password : "Priya9700@" ,
    database : "recipes"
})

con.connect(function(error){
    if(error)
    {
        console.log(error);
    }else{
        console.log("Success");
    }
})

app.post('/add',(request,response)=>{
    try{
        console.log(JSON.stringify(request.body));
        let {recipe_name,ingredients,instructions}=request.body;
        if(recipe_name!= null &&  ingredients!= null && instructions!= null){
        let sql='insert into  recipe (recipe_name,ingredients,instructions) values(?,?,?)';
        con.query(sql,[recipe_name,ingredients,instructions],(error,result)=>{
            if(error){
                let s={"status":"error"};
                response.send(s);
                console.log(error);
            }else{
                let s={"status":"success"};
                response.send(s);
            }
        })}else{
            let s={"status":"InvalidData"};
            response.send(s);
        }
    }catch(e){
        response.send(e);
    }
})

app.get('/getdetails',(request,res)=> {
    let sql = "select * from  recipe";
    con.query(sql,(error,result)=>{
        if(error){
            res.send(error);
        }else{
            res.send({status: true , data:result});
        }
        
    })
})


  app.put("/update/:sno", (req, res) => {
    let sql =
      "UPDATE recipe SET recipe_name='" +
      req.body.recipe_name +
      "',  ingredients='" +
      req.body. ingredients +
      "',instructions='" +
      req.body.instructions +
      "'  WHERE sno=" +
      req.params.sno;
    console.log(sql);
    con.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Receipe Updated Failed" });
      } else {
        res.send({ status: true, message: "Receipe Updated successfully" });
      }
    });
  });

  app.delete("/delete/:sno", (req, res) => {
    let sql = "DELETE FROM recipe WHERE sno=" + req.params.sno + "";
    con.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Receipe Deleted Failed" });
      } else {
        res.send({ status: true, message: "Receipe Deleted successfully" });
      }
    })});

    app.post('/home',(request,response)=>{
      try{
          console.log(JSON.stringify(request.body));
          let {image,name}=request.body;
          if(image!=null && name!=null ){
          let sql='insert into home(image,name) values(?,?)';
          con.query(sql,[image,name],(error,result)=>{
              if(error){
                  let s={"status":"error"};
                  response.send(s);
                  console.log(error);
              }else{
                  let s={"status":"success"};
                  response.send(s);
              }
          })}else{
              let s={"status":"InvalidData"};
              response.send(s);
          }
      }catch(e){
          response.send(e);
      }
  })

  app.get('/homedetails',(request,res)=> {
    let sql = "select * from  home";
    con.query(sql,(error,result)=>{
        if(error){
            res.send(error);
        }else{
            res.send({status: true , data:result});
        }
        
    })
})



app.listen(3308,()=>{
    console.log("server is running on 3308 port");
});

