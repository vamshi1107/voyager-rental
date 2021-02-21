import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {

  constructor(
    private store: AngularFirestore,
    private toastservice: ToastrService
  ) { }
  booking;
  ngOnInit(): void {
    this.load()
  }
  cycles;
  load() {
    this.store.collection("cycles").valueChanges().subscribe(res => {
      this.cycles = res
    })
  }
  add(s, car) {
    if (!eval(sessionStorage.getItem("logged"))) {
      this.toastservice.error("LOGIN TO ADD", "SORRY", { timeOut: 1000 })
    }
    else {
      this.booking = JSON.parse(sessionStorage.getItem("booking"));
      this.booking.push(car)
      sessionStorage.removeItem("booking")
      this.toastservice.success("ADDED SUCESSFULLY", s, { timeOut: 1500 })
      sessionStorage.setItem("booking", JSON.stringify(this.booking))
    }
  }
}
