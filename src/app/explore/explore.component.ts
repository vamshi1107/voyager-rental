import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service'
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private cars1: CarService, private _bottomSheet: MatBottomSheet, private store: AngularFirestore) {
  }

  ngOnInit(): void {
    this.get()
  }

  hachback = [];
  sedan = [];
  jeep = [];
  suv = [];
  muv = [];

  get() {
    this.store.collection("cars").ref.where("type", "==", "JEEP").get().then(res => {
      res.forEach(res => {
        this.jeep.push(res.data())
      })
    })
    this.store.collection("cars").ref.where("type", "==", "MUV").get().then(res => {
      res.forEach(res => {
        this.muv.push(res.data())
      })
    })
    this.store.collection("cars").ref.where("type", "==", "SUV").get().then(res => {
      res.forEach(res => {
        this.suv.push(res.data())
      })
    })
    this.store.collection("cars").ref.where("type", "==", "SEDAN").get().then(res => {
      res.forEach(res => {
        this.sedan.push(res.data())
      })
    })
    this.store.collection("cars").ref.where("type", "==", "HATCHBACK").get().then(res => {
      res.forEach(res => {
        this.hachback.push(res.data())
      })
    })

  }

}
