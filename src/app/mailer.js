const nodemailer=require('nodemailer')
const express=require("express")
const cors=require('cors')

const app=express()

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rentalvoyager@gmail.com',
      pass: '@9848396526Mm'
    }
  });
  
app.use(cors({origin:"http://localhost:4200"}))
  

  var mailOptions = {
    from: 'rentalvoyager@gmail.com',
    subject: 'Sending from voyager-rental', 
  };
  
  app.get("/send/:email/:code",(req,res)=>{
      mailOptions["to"]=req.params.email
      mailOptions["html"]="<h1 style='text-align:center'>WELCOME TO VOYAGER</h1><h1 style='color:red'>OTP FOR VERIFICATION:</h1>"+"<h2>"+req.params.code+"</h2>"
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send(false);
        } else {
          res.send(true);
        }
      });
      
  })
  app.get("/sug/:email/:stuff",(req,res)=>{
    mailOptions["to"]="rentalvoyager@gmail.com"
    mailOptions["html"]="<h2>"+req.params.stuff+"</h2><br>"+"<h3>"+req.params.email+"</h3>"
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          res.send(false);
      } else {
        mailOptions["to"]=req.params.email
        mailOptions["html"]="<h2>THANK YOU WE RECIEVED YOUR SUGGESTION</h2>"
        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            console.log("error")
          }
          else{
            console.log(req.params.email)
          }
        });
        res.send(true);
        
      }
    });
    
})
  app.listen("1107",()=>{
      console.log("listening")
  })
  