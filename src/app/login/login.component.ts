import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { stringify } from '@angular/compiler/src/util';
import * as firebase from 'firebase'

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resp: string;
  file: any;
  url;

  constructor(private toastservice: ToastrService,
    private router: Router,
    private auth: AngularFireAuth
    , private db: AngularFireDatabase,
    private dbs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.booking = JSON.parse(sessionStorage.getItem('booking'))
    this.role();
    if (eval(sessionStorage.getItem("logged")) && eval(sessionStorage.getItem("ver"))) {
      this.router.navigate(["/bookings"])
    }
    if(!eval(sessionStorage.getItem("ver")) && eval(sessionStorage.getItem("logged")) && !eval(sessionStorage.getItem("admin"))){
      this.router.navigate(["/email"])
    }
    if(eval(sessionStorage.getItem("admin")))
    {
      this.router.navigate(["/admin"])
    }
  }
  logged
  booking = [];
  private pass;
  entered = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  @Output() event = new EventEmitter();
  first = "";
  last = "";
  age = "";
  username = "";
  password = "";
  address = "";
  msg = "";
  enter(value: string) {
    this.pass = value;
    this.entered = true
  }
  in
  private member: string = "none";
  role() {
    sessionStorage.setItem("do", "false");
    this.in = setInterval(this.check, 100);
    firebase.default.auth.ActionCodeInfo
    this.auth.signInWithEmailLink("vamshi.a4u@gmail.com",window.location.href).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
    
    setTimeout(function () {
      clearInterval(this.in)
    }, 2400)

  }

  out = false
  check() {

    if (eval(sessionStorage.getItem("logged")) && document.getElementById("start") != null) {
      document.getElementById("start").style.display = "none"
      document.getElementById("end").style.display = "flex"

    }
    else if (!this.out && document.getElementById("start") != null && document.getElementById("end") != null) {
      document.getElementById("start").style.display = "block"
      document.getElementById("end").style.display = "none"

    }

  }
  validate(pass: Array<string>) {
    if (pass[1] != null) {
      sessionStorage.setItem("ver","false");
      this.auth.signInWithEmailAndPassword(pass[0], pass[1]).then(res => {
        if (res) {
          var p = pass[0].toLocaleLowerCase()
          sessionStorage.setItem("v-email",p)
          var u_det = []
          var u;
          var phone;
          sessionStorage.setItem("username",p)
          this.dbs.collection("users/" + p + "/info").valueChanges().subscribe(res => {
            u = res[0]
            phone=res[1]
            if(Object.keys(res).length==1 && u.phone == undefined){
                u_det=u;
            }
            else{
             sessionStorage.setItem("response",Object.keys(res).length.toString())
            if(phone.phone!==undefined){
              u_det=u
              u_det["phone"]=phone.phone
            }
            else{
              u_det=phone
              u_det["phone"]=u.phone
            }
          }
            sessionStorage.setItem("user", JSON.stringify(u_det));
          })
          this.member = pass[res.user.email];
          this.logged = true;
          sessionStorage.setItem("logged", "true");
          sessionStorage.setItem("email","true")
          this.router.navigate(["/email"])
          sessionStorage.setItem("booking", JSON.stringify([]))
          this.logged = eval(sessionStorage.getItem("logged"))
          console.log(eval(sessionStorage.getItem("response")))
         
          this.check()
        }
      }).catch(error => {
        if (error.code == "auth/wrong-password") {
          document.getElementById("back").style.display = "block";
          document.getElementById("username").style.display = "none"
          document.getElementById("password").style.display = "block"
          document.getElementById("adlink").style.display="none";
          if (pass[1] != "") {
            document.getElementById("password").style.boxShadow = "0px 0px 5px 3px red"
          }
        }
        else {
          document.getElementById("username").style.boxShadow = "0px 0px 7px red"
        }
      })
    }
    
  }
  back() {
    document.getElementById("username").style.display = "block"
    document.getElementById("password").style.display = "none"
    document.getElementById("back").style.display="none"
    document.getElementById("adlink").style.display="block";
  }
  clear() {
    this.out = true
    sessionStorage.setItem("user","")
    sessionStorage.setItem("logged", "false")
    this.auth.signOut()
    document.getElementById("end").style.display = "none"
    sessionStorage.clear()
    location.reload()
    setTimeout(function () {
      document.getElementById("out").style.display = "block"
      sessionStorage.setItem("do", "true");
      clearInterval(this.in)
    }, 1000)

  }
  remove(car) {
    this.booking = JSON.parse(sessionStorage.getItem("booking"))
    this.booking = this.booking.filter(function (obj) {
      return obj.name !== car.name;
    });
    sessionStorage.removeItem("booking")
    sessionStorage.setItem("booking", JSON.stringify(this.booking))
  }
  dis(s) {

  }
  register() {
    sessionStorage.setItem("want", "true")
    var user = {};
    user["firstname"] = this.first;
    user["lastname"] = this.last;
    user["username"] = this.username;
    user["password"] = this.password;
    user["age"] = this.age;
    user["address"] = this.address;
    sessionStorage.setItem("username",this.username)
    if (this.first != "" && this.username != "" && this.password != "")
      if (this.file != null) {
        var meta = {
          contentType: this.file.type
        }
          this.auth.createUserWithEmailAndPassword(this.username, this.password).then(res => {
            if (res) {
              document.getElementById("msg").style.color = "green"
              this.first = " ", this.last = " ", this.address = " ", this.age = " ", this.username = " ", this.password = " ",
              this.storage.upload(sessionStorage.getItem("username").toString().toLowerCase(), this.file, meta).then(res => {
                res.ref.getDownloadURL().then(url => {
                  user["proof"] = url
                  this.dbs.collection("users/" + sessionStorage.getItem("username").toString().toLowerCase() + "/info").add(user).then(res => {
                    console.log(res)
                   
                    this.router.navigate(["/phone"])
                  }).catch(err => {

                  })
                })
              })
             
            }

          }).catch(err => {
            this.msg = "INVALID USER"
            document.getElementById("msg").style.color = "red"
            this.first = "", this.last = "", this.address = "", this.age = "", this.username = "", this.password = ""

          })
      }
      else {
        this.msg = "upload file"
        document.getElementById("msg").style.color = "red"

      }
  }
  upload(event) {
    this.file = event.target.files[0];
  }
}
