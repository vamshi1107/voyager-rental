import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private store:AngularFirestore,private router:Router,private _bottomSheet:MatBottomSheet) { }

  ngOnInit(): void {
this.runner()
document.body.style.backgroundColor="black";
  }
  orders;
 
  runner(){
this.store.collection("orders").valueChanges().subscribe(res=>{
  this.orders=res;
})
  }
  logout(){
    this.router.navigate(["/login"])
    sessionStorage.setItem("logged","false")
  }
  pass(s){
    sessionStorage.setItem("s_name",s);
    this.openBottomSheet()
  }
  openBottomSheet(){
    this._bottomSheet.open(BottomSheetOverviewExampleSheet)
    }
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'tp.html',
  styleUrls: ['./design.css']
})
export class BottomSheetOverviewExampleSheet implements OnInit{
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,private store:AngularFirestore) {}
  ngOnInit(): void {
    this.get();
  }
  user
  get(){
    var details;
    var det2;
    var name=sessionStorage.getItem("s_name")
    this.store.collection("users/"+name+"/info").valueChanges().subscribe(res=>{
      details=res[0];
      det2=res[1];
      console.log(det2)
      if (det2.phone !== undefined) {
        document.getElementById("first").innerHTML = details.firstname;
        document.getElementById("last").innerHTML = details.lastname;
        document.getElementById("phone").innerHTML = det2.phone
        document.getElementById("address").innerHTML = details.address;
        var img = document.createElement("img")
        img.src = details.proof
        img.height = 200
        document.getElementById("pr").appendChild(img)
      }
      else {
        document.getElementById("first").innerHTML = det2.firstname;
        document.getElementById("last").innerHTML = det2.lastname;
        document.getElementById("phone").innerHTML = details.phone
        document.getElementById("address").innerHTML = det2.address;
        var img = document.createElement("img")
        img.src = det2.proof
        img.height = 200
        document.getElementById("pr").appendChild(img)
      }
      sessionStorage.removeItem("user")
      sessionStorage.removeItem("car")
    })
    sessionStorage.removeItem("s_name")
  }
 }
