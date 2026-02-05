import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsDashboardComponent } from './shared/component.firebase/postHTTP/posts-dashboard/posts-dashboard.component';
import { PostsFormComponent } from './shared/component.firebase/postHTTP/posts-form/posts-form.component';
import { PostsCardsComponent } from './shared/component.firebase/postHTTP/posts-cards/posts-cards.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GetConfirmComponent } from './shared/component.firebase/postHTTP/get-confirm/get-confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AuthInterceptor } from './shared/component.firebase/service/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PostsDashboardComponent,
    PostsFormComponent,
    PostsCardsComponent,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
