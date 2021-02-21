import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  constructor(private store: AngularFirestore,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.get()
  }
  name = "";
  company = "";
  mileage = "";
  link = "";
  cost = "";
  msg = "";
  type = "";
  rating = "";
  cname="";
  clink="";
  ccost="";
  crating="";
  ctype="";
  get() {
  
  }
  insert() {
    var car = {}
    if (this.name != "" && this.company != "" && this.link != "") {
      car["name"] = this.name;
      car["company"] = this.company;
      car["link"] = this.link;
      car["cost"] = this.cost;
      car["type"] = this.type;
      car["rating"] = this.rating;
      car["mileage"] = this.mileage
      this.store.collection("cars").add(car).then(res => {
        console.log(res)
        document.getElementById("msg").style.color="green";
        this.msg = "sucess";
        this.name=" ",this.company=" ",this.rating=" ",this.cost=" "
        this.link=" ",this.mileage=" ",this.type=" "
      })
    }
  }
  insert2() {
    var cycle = {}
    if (this.cname != "" && this.ctype != "" && this.clink != "") {
      cycle["name"] = this.cname;
      cycle["link"] = this.clink;
      cycle["cost"] = this.ccost;
      cycle["type"] = this.ctype;
      cycle["rating"] = this.crating;
      this.store.collection("cycles").add(cycle).then(res => {
        console.log(res)
        document.getElementById("msg").style.color="green";
        this.msg = "sucess";
        this.cname=" ",this.crating=" ",this.ccost=" "
        this.clink=" ",this.ctype=" "
      })
    }
  }
  logout(){
    this.router.navigate(["/login"])
    sessionStorage.setItem("logged","false")
  }
}
