import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {
  HttpModule,
  JsonpModule
} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {  TabsModule } from 'ngx-bootstrap';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AboutComponent } from './about/about.component';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { CarouselModule } from 'ngx-bootstrap/carousel';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { EdserService } from './edser.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

// DATATABLE COMPONENT
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule  } from 'ngx-loading';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';





const appRoutes: Routes = [
  { path: 'vragenlijst', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id/:key', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AboutComponent,
    PageNotFoundComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    JsonpModule,
    ModalModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule, // required animations module
    NgxPaginationModule,
    ToastrModule.forRoot(), // ToastrModule added,
    TabsModule.forRoot(),
    NgxDatatableModule,
    NgxLoadingModule,
    // CarouselModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [EdserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
