import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NewComponent } from './pages/new/new.component';
import { ThingComponent } from './pages/thing/thing.component';
import { AboutComponent } from './pages/about/about.component';
import { SearchComponent } from './pages/search/search.component';
import { TopperComponent } from './parts/topper/topper.component';
import { PaginationComponent } from './parts/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { RefreshComponent } from './parts/refresh/refresh.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewComponent,
    ThingComponent,
    AboutComponent,
    SearchComponent,
    TopperComponent,
    PaginationComponent,
    RefreshComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
