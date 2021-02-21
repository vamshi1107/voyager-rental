import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SwUpdate } from '@angular/service-worker'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private update: SwUpdate) {

  }
  ngOnInit(): void {
    this.role();
    sessionStorage.setItem("want", "false")
    this.checkUpdate()
  }
  login = "Login";
  checkUpdate() {
    if (this.update.isEnabled) {
      this.update.available.subscribe(res => {
        this.update.activateUpdate().then(res => {
          console.log(res)
          location.reload()
        })
      })
    }
  }
  check() {
    if (eval(sessionStorage.getItem("logged"))) {
      var i;
      i = JSON.parse(sessionStorage.getItem("user"))
      document.getElementById("logname").innerHTML = i.firstname

    }
    else {
      document.getElementById("logname").innerHTML = "Login";
    }
    if (eval(sessionStorage.getItem("admin"))) {
      document.getElementById("itemex").style.display = "block"
    }
    else {
      document.getElementById("itemex").style.display = "none"
    }
  }
  ngAfterViewInit(): void {

  }
  title = 'Vamshi';
  admin
  role() {
    document.getElementById("header").classList.remove("inter")
    setInterval(this.check, 2000)
    document.body.style.margin = "0px";
    document.body.style.left = "0px";
    document.body.style.padding = "0px";
    document.body.style.backgroundColor = "black";
    setTimeout(() => {
      console.clear()
      console.log("%cVOYAGER", "color:red;word-spacing:20px;font-size:80px;font-family:fantasy;text-align:center;")
    }, 8000)
  }
  color(id) {
    document.getElementById(id).style.color = "blue";
  }
  hide() {
    document.getElementById("sidebar").style.marginLeft = "100%"
  }
  open() {
    if (parseInt(document.getElementById("sidebar").style.marginLeft) == 100)
      document.getElementById("sidebar").style.marginLeft = "70%"
    else {
      document.getElementById("sidebar").style.marginLeft = "100%"
    }
  }
  home() {
    this.router.navigate(["/home"])
  }
}

