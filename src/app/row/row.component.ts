import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  constructor(private _bottomSheet:MatBottomSheet,private toastservice:ToastrService) { }

  ngOnInit(): void {
    
  }
  @Input("coll") top=[];
  @Input("type") t;
  booking=[]
  filter(){
    var c=[];
    for(let i of this.top){
      if(i.type==this.t){
          c.push(i)
      }
    }
    this.top=c;
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
    this.car.name=this.car.name.toUpperCase()
    this.car.company=this.car.company.toUpperCase()
    this.s=this.car.name;
    this.logged=sessionStorage.getItem("logged");
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
     this.toastservice.success("ADDED SUCESSFULLY",s,{timeOut:1500})
     sessionStorage.setItem("booking",JSON.stringify(this.booking))
    }
    }
}
