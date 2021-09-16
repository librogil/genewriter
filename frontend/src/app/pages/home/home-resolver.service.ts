import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Thing } from 'src/app/models/thing.model';
import { Observable } from 'rxjs'; 
import { GeneWriterService } from 'src/app/genewriter.service';

@Injectable({
  providedIn: 'root'
})

export class HomeResolverService implements Resolve<Thing[]> {

  constructor(private genewriterService: GeneWriterService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<any> | Promise<any> | Thing[] {
    return this.genewriterService.getThings();
  }
}
