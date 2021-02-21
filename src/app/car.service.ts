import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient,private fire:AngularFireDatabase,private store :AngularFirestore) { }


  getCars1(){
    return this.http.get("/assets/cars.json")
  }
  getCars2(){
    return this.http.get("/assets/trending.json")
  }
  getCars3(){
    return this.http.get("/assets/cars.json")
  }
}
