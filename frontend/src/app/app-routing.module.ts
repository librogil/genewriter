import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewComponent } from './pages/new/new.component';
import { ThingComponent } from './pages/thing/thing.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeResolverService } from './pages/home/home-resolver.service';
import { ThingResolverService } from './pages/thing/thing-resolver.service';
import { SearchResolverService } from './pages/search/search-resolver.service';
import { AboutComponent } from './pages/about/about.component';
import { RefreshComponent } from './parts/refresh/refresh.component';

const routes: Routes = [
  
  { 
    path: '',
    component: HomeComponent,
    resolve: { things: HomeResolverService } 
  },
  { 
    path: 'new', 
    component: NewComponent,
  },
  { 
    path: 'thing/:thingID', 
    component: ThingComponent,
    resolve: { thing: ThingResolverService }
   },
  { 
    path: 'search/:searchTerm', 
    component: SearchComponent,
    resolve: { things: SearchResolverService }
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'refresh',
    component: RefreshComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }