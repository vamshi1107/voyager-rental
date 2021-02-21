import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { WindowService } from '../window.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  constructor(private authfire: AngularFireAuth,
    private windowService: WindowService,
    private router: Router,
    private store: AngularFirestore,
    private toast: ToastrService
  ) {
    this.windowRef = this.windowService.windowRef;

  }

  ngOnInit(): void {
    document.getElementById("log").style.display = "none"
    if (eval(sessionStorage.getItem("extra"))) {
      var ph=JSON.parse(sessionStorage.getItem("user")).phone
     this.phone=ph
    }

  }
  phone = "+91";
  windowRef;
  otp;
  verify() {
    this.authfire.signOut()
    this.windowRef = this.windowService.windowRef;
    console.log(new firebase.default.auth.RecaptchaVerifier("repcon"))
    const appVerifier = new firebase.default.auth.RecaptchaVerifier("repcon");

    firebase.default.auth().signInWithPhoneNumber(this.phone, appVerifier).then(res => {
      if (res) {
        console.log(res)
        this.windowRef.confirmationResult = res;
        console.log("sett")
        document.getElementById("st").style.display = "none"
        document.getElementById("ed").style.display = "flex"
      }
    })
    this.authfire.authState.subscribe(res => {
      console.log(res)
    })
  }
  rec() {
    if (eval(sessionStorage.getItem("extra"))) {
      this.windowRef.confirmationResult.confirm(this.otp).then(p => {
        if (p) {
          this.toast.success("VERIFIED PHONE NUMBER", "SUCESS")
          document.getElementById("log").style.display = "block"
          sessionStorage.setItem("verified", "true")
          sessionStorage.setItem("ver", "true")
          document.getElementById("log").style.visibility = "visible"
          this.authfire.signOut()
          this.router.navigate(["/login"])
        }

      }).catch(err => {

        if (err.code === "auth/invalid-verification-code") {
          console.log("err")
          sessionStorage.setItem("verified", "false")
        }
      });

    }
    else {
      this.windowRef.confirmationResult.confirm(this.otp).then(p => {
        if (p) {
          var user =
            console.log(user)
          var phone = { "phone": this.phone }
          this.store.collection("users/" + sessionStorage.getItem("username").toString() + "/info").add(phone).then(res => {
            console.log(res)
          })
          this.toast.success("VERIFIED PHONE NUMBER", "SUCESS")
          document.getElementById("log").style.display = "block"
          sessionStorage.setItem("verified", "true")
          sessionStorage.setItem("ver", "true")
          document.getElementById("log").style.visibility = "visible"
          this.authfire.signOut()
          this.router.navigate(["/login"])
        }

      }).catch(err => {

        if (err.code === "auth/invalid-verification-code") {
          console.log("err")
          sessionStorage.setItem("verified", "false")
        }
      });

    }
  }
}
