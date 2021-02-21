import { resolveForwardRef } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

    
  constructor(private toast:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.email=sessionStorage.getItem("v-email")
  }
 email;
 random;
 pass;
 verify(){
  this.random=Math.floor(Math.random() * 10000) + 1000;
  var user=this.email
  const link="http://localhost:1107/send/"+user+"/"+this.random
  fetch(link).then(res=>res.text()).then(res=>{
    if(eval(res)){
      this.toast.success("otp sent","sucess")
      document.getElementById("on").style.display="none"
      document.getElementById("boa").style.display="flex"
    }
  }).catch(err=>{
    console.log(err)
    console.log("here")
  })
 }
 check(){
   var ran=this.random+""
  if(ran===this.pass){
    this.toast.success("LOGGED IN","sucess")
    sessionStorage.setItem("ver","true")
    document.getElementById("log").style.visibility="visible"
    this.router.navigate(["/login"])

  }
  else{
    this.toast.error("wrong otp","error")
  }
 }
 gran(){
   sessionStorage.setItem("want","true")
   sessionStorage.setItem("extra","true")
 }
}
