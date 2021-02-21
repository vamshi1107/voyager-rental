import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private store: AngularFirestore,
    private _bottomSheet:MatBottomSheet,
    private toastservice:ToastrService ) { }

  ngOnInit(): void {
    this.val()
  }
  booking=[]
  s={"name":""}
  cars;
  old;
  val() {
    this.store.collection("cars").valueChanges().subscribe(res => {
      this.cars = res
      this.old=res
    })
  }
  goon(name:string)
  {
    var done;
    var c=this.old
    var sam=name
    name=name.replace(" ","")
    if(name==""){
      this.cars=this.old
    }
    if(name !=""){
    this.cars=[]
    c.forEach((obj)=>{
      if(obj.name.toLocaleLowerCase()==name.toLocaleLowerCase()){
        this.cars.push(obj)
      }
      done=true;
    })
    }
    if(done && Object.keys(this.cars).length<=0){
      c.forEach((obj)=>{
        if(obj.company.toLocaleLowerCase()==name.toLocaleLowerCase()){
          this.cars.push(obj)
        }
        done=true;
      })
  }
  if(done && Object.keys(this.cars).length<=0){
    c.forEach((obj)=>{
      if(obj.type.toLocaleLowerCase()==name.toLocaleLowerCase()){
        this.cars.push(obj)
      }
      done=true;
    })
}
  }
  open(car){
    sessionStorage.setItem("car",JSON.stringify(car));
    this.openBottomSheet()
  }
  openBottomSheet(){
    this._bottomSheet.open(BottomSheetOverviewExampleSheet)
    }
    add(s,car){
     if(!eval(sessionStorage.getItem("logged"))){
      this.toastservice.error("LOGIN TO ADD","SORRY",{timeOut:1000})
     }
     else{
      this.booking=JSON.parse(sessionStorage.getItem("booking"));
      this.booking.push(car)
      sessionStorage.removeItem("booking")
      this.toastservice.success("ADDED SUCESSFULLY",s,{timeOut:1500})
      sessionStorage.setItem("booking",JSON.stringify(this.booking))
     }
     }
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'tp.html',
  styleUrls: ['./design.css']
})
export class BottomSheetOverviewExampleSheet implements OnInit{
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,private toastservice:ToastrService) {}
  ngOnInit(): void {
    this.set();
    this.check();
  }

  s:string;
  logged;
  car;
  booking=[]
  set(){
    this.car=JSON.parse(sessionStorage.getItem("car"))
    this.s=this.car.name;
    this.logged=sessionStorage.getItem("logged");
    this.link=this.car.link;
  }
  name;
  username;
  i;
  link;
  check(){
    if(sessionStorage.getItem("user") !== null){
    this.i=JSON.parse(sessionStorage.getItem("user"))
     this.username=this.i.username;
     this.name=this.i.name;
    }
    this.link=this.car.link;
  }
  add(s){
    var car=this.car
    if(!eval(sessionStorage.getItem("logged"))){
     this.toastservice.error("LOGIN TO ADD","SORRY",{timeOut:1000})
    }
    else{
     this.booking=JSON.parse(sessionStorage.getItem("booking"));
     this.booking.push(car)
     sessionStorage.removeItem("booking")
     this.toastservice.success("ADDED SUCESSFULLY",s.toUpperCase(),{timeOut:1500})
     sessionStorage.setItem("booking",JSON.stringify(this.booking))
    }
    }
}
