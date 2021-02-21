import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ToastrService } from 'ngx-toastr';
import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-hone',
  templateUrl: './hone.component.html',
  styleUrls: ['./hone.component.css']
})
export class HoneComponent implements OnInit {

  constructor(private cars: CarService, private store: AngularFirestore) { }

  top = []
  ngOnInit(): void {
    this.load()

  }
  private booking = [];
  load() {
    this.store.collection("cars").ref.where("rating", ">=", "3.5").get().then(res => {
      res.forEach(obj => {
        this.top.push(obj.data())
      })
    })
  }
}

