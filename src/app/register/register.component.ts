import { query } from '@angular/animations';
import { stringify } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database'
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage'
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private firestor:AngularFireDatabase ,
    private dbs:AngularFirestore,
    private storage:AngularFireStorage,private auth:AngularFireAuth,private router:Router,
    private dialog:MatDialog,
    private toastservice:ToastrService
    ) { }
  ref;
  url;
  out;
  booking=[];
  total;
  phone;
  days=0;
  to;
  from;
  ngOnInit(): void {
    this.get();
    this.response=sessionStorage.getItem("response")
    this.booking=JSON.parse(sessionStorage.getItem('booking'))
  }
  call(event){
    this.ref=event
  }
  yes;
  previous;
  response;
  get(){
        var user=JSON.parse(sessionStorage.getItem("user"))
        this.dbs.collection("users/"+user.username+"/bookings").valueChanges().subscribe(res=>{
          this.previous=res
        })
  }
  clear(){
    this.out=true
     sessionStorage.removeItem("user")
     sessionStorage.setItem("logged","false")
     this.auth.signOut()
     this.router.navigate(["/login"])
     document.getElementById("start").style.display="none"
     document.getElementById("end").style.display="none"
     sessionStorage.clear()
     location.reload()
     setTimeout(function(){
       document.getElementById("out").style.display="block"
       sessionStorage.setItem("do","true");
       clearInterval(this.in)
     },1000)

     }
     remove(car){
      this.booking=JSON.parse(sessionStorage.getItem("booking"))
      this.booking =this.booking.filter(function(obj) {
        return obj.name !==car.name ; 
    });
    sessionStorage.removeItem("booking")
    sessionStorage.setItem("booking",JSON.stringify(this.booking))
        }
        book(car:JSON){
          if(sessionStorage.getItem("response")!="2"){
            this.toastservice.error("COMPLETE YOUR VERIFICATION","SORRY")
           }
          else{
          if(this.days>0){
          alert("DO YOU CONFIRM BOOKING?")
          var user=JSON.parse(sessionStorage.getItem("user"))
          var no:string=user.phone;
          car["hours"]=this.days;
          car["date"]=this.from;
          this.dbs.collection("users/"+user.username+"/bookings").add(car).then(res=>{
            console.log(res)
            this.toastservice.success("BOOKED SUCESSFULLY","THANK YOU")
            this.remove(car)
          
          })
          this.dbs.collection("orders").add({"username":user.username,"order":car}).then(res=>{
            console.log(res)})
        }
        else{
          this.toastservice.error("SELECT HOURS","SORRY")
        }
      }
      }
      del;
      ck=false;
      prom(s,car){
        if(s && !this.ck){
       this.booking[this.booking.indexOf(car)]["total"]=this.tot+200
       this.booking[this.booking.indexOf(car)]["delivery"]="true"
       this.tot+=200
       this.ck=true
        }
        if(this.ck && !s){
          this.booking[this.booking.indexOf(car)]["total"]=this.tot-200
          this.booking[this.booking.indexOf(car)]["delivery"]="false"
          this.tot-=200
          this.ck=false
        }
      }
        dis(a){
            this.from=a;
        }
        tot=0;
        cal(s,cost,car){
          
          this.days=s;
          this.tot=cost*s
          if(this.del){
            this.booking[this.booking.indexOf(car)]["total"]=this.tot+200
            this.tot+=200
          }
          else{
            this.booking[this.booking.indexOf(car)]["total"]=this.tot
          }
          this.booking[this.booking.indexOf(car)]["date"]=this.from
        }
        openDialog() {
          const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '300px',
          });
      
          dialogRef.afterClosed().subscribe(result => { this.phone = result;
          });
        }
        release(){
          sessionStorage.setItem("want","true")
        }
        suge
        send(){
          var user=sessionStorage.getItem("username")
        const link="http://localhost:1107/sug/"+user+"/"+this.suge
          
          fetch(link).then(res=>res.text()).then(res=>{
            if(eval(res)){
             this.suge=""
             this.toastservice.success("sucess","thank you")
            }
          }).catch(err=>{
            console.log(err)
          })
        }
}

export interface DialogData {
  phone:string

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  send(phone){
    this.data.phone=phone;
    this.dialogRef.close();
  }

}