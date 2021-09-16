import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Thing } from 'src/app/models/thing.model';
import { Observable } from 'rxjs'; 
import { GeneWriterService } from 'src/app/genewriter.service';

@Injectable({
  providedIn: 'root'
})

export class ThingResolverService implements Resolve<Thing> {

  thingID: string;
  
  constructor(private genewriterService: GeneWriterService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<any> | Promise<any> | Thing {
    this.thingID = route.paramMap.get('thingID');
    return this.genewriterService.getSelectedThing(this.thingID);
  }
}
