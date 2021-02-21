import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routecomp } from './app-routing.module';
import { AppComponent } from './app.component';
import {CarService} from './car.service'
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { RegisterComponent } from './register/register.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {environment} from '../environments/environment'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AngularFireModule} from '@angular/fire'
import {AngularFireDatabaseModule} from '@angular/fire/database'
import {AngularFireStorageModule} from '@angular/fire/storage';
import { RowComponent } from './row/row.component';
import {AngularFireAuthModule} from '@angular/fire/auth'
import { GuardService } from './guard.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatButtonModule} from '@angular/material/button';
import { DateComponent } from './date/date.component';
import {MatDialogModule} from '@angular/material/dialog';
import {WindowService} from './window.service';
import { EmailComponent } from './email/email.component';
import { AdminComponent } from './admin/admin.component';
import { WorkComponent } from './work/work.component';
import { OrdersComponent } from './orders/orders.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    routecomp,
    RegisterComponent,
    RowComponent,
    DateComponent,
    EmailComponent,
    AdminComponent,
    WorkComponent,
    OrdersComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatBottomSheetModule,
    MatTabsModule,
    ToastrModule.forRoot(),
    MatExpansionModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatDatepickerModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CarService,
    GuardService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
