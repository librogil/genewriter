import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Thing } from 'src/app/models/thing.model';
import { Observable } from 'rxjs'; 
import { GeneWriterService } from 'src/app/genewriter.service';

@Injectable({
  providedIn: 'root'
})

export class SearchResolverService {

  searchTerm: string;

  constructor(private genewriterService: GeneWriterService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<any> | Promise<any> | Thing[] {
    this.searchTerm = route.paramMap.get('searchTerm');
    return this.genewriterService.getSearchResults(this.searchTerm);
  }
}

