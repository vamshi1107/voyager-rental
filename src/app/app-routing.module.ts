import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarComponent } from './car/car.component';
import { CycleComponent } from './cycle/cycle.component';
import { ExploreComponent } from './explore/explore.component';
import { HoneComponent } from './hone/hone.component';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component'
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { DateComponent } from './date/date.component';
import {EmailComponent} from './email/email.component'
import { WorkComponent } from './work/work.component';
import { OrdersComponent } from './orders/orders.component';
import {CheckService} from './check.service'
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path:'home',component:HoneComponent
  },
  {
    path:'explore',component:ExploreComponent
  },
  {
    path:'cycle',component:CycleComponent,
  },
  {
    path:'',redirectTo:"home",pathMatch:"full"
  },
  {
    path:'*',redirectTo:"home",pathMatch:"full"
  },
  {
    path:'login' , component:LoginComponent,
  },
  {
    path:'car',component:CarComponent
  },
  {
    path:'bookings',component:RegisterComponent
  },
  {
    path:'phone',component:DateComponent,canActivate:[AuthGuard]
  }
  ,{
    path:'email',component:EmailComponent
  },
  {
    path:'work',component:WorkComponent,canActivate:[CheckService]
  },
  {
    path:'orders',component:OrdersComponent,canActivate:[CheckService]
  },
  {
    path:'admin',component:AdminComponent
  }
];
export const routecomp=[HoneComponent,ExploreComponent,CycleComponent,LoginComponent,CarComponent,RegisterComponent,DateComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
