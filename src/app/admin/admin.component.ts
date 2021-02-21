import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private store:AngularFirestore,
    private router:Router
    ) { }

  ngOnInit(): void {
    document.body.style.backgroundColor="black"
    this.reval();
     var o;
  }
  log;
  username;
  password;
  check(){
    this.store.collection("admin").ref.where("username","==",this.username).where("password","==",this.password)
    .get().then(res=>{
      res.forEach(obj=>{
        var o;
        var user={};
        o=obj.data()
        console.log(o)
        this.log=o.name
        user["username"]=o.username
        user["firstname"]=o.name
        console.log(user)
        sessionStorage.setItem("user",JSON.stringify(user))
        sessionStorage.setItem("admin","true")
        sessionStorage.setItem("logged","true")
        this.reval()
      })
    }).catch(err=>{
      console.log(err)
    })
  }
  reval(){
    if(eval(sessionStorage.getItem("admin"))){
      document.getElementById("ad_on").style.display="none"
      document.getElementById("ad_boa").style.display="flex"
    }
    else{
      document.getElementById("ad_on").style.display="flex"
      document.getElementById("ad_boa").style.display="none"
    }
  }
  
  logoff(){
    sessionStorage.setItem("admin","false")
    sessionStorage.setItem("logged","false")
    this.router.navigate(["/login"])
  }
}
