import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Thing } from 'src/app/models/thing.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {
  
  things: Thing[];
  searchTerm: string;
  searchResults: Thing[];
  searchInput = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    window.scrollTo(0, 0);
    this.searchResults = [];
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.searchTerm = params.searchTerm;
      });
    this.activatedRoute.data.subscribe((data: { things: Thing[] }) => {
      this.things = data.things.slice().reverse();
    });
    this.searchFilter('all');
  }
  
  searchFilter(filterOption: string) {
    this.searchResults = [];
    for (var i in this.things) {
      switch (filterOption) {
        case 'all': {
          if (this.things[i].title.includes(this.searchTerm) || this.things[i].writer.includes(this.searchTerm)
          || this.things[i].description.includes(this.searchTerm) || this.things[i].content.includes(this.searchTerm))  {
            this.searchResults.push(this.things[i]); } break; }
        case 'title': {
          if (this.things[i].title.includes(this.searchTerm)) { this.searchResults.push(this.things[i]); } break; }
        case 'description': { 
          if (this.things[i].description.includes(this.searchTerm)) { this.searchResults.push(this.things[i]); } break; }
        case 'writer': { 
          if (this.things[i].writer.includes(this.searchTerm)) { this.searchResults.push(this.things[i]); } break; }
        case 'content': {
          if (this.things[i].content.includes(this.searchTerm)) { this.searchResults.push(this.things[i]); } break; }
      }
    }
  }
  
  search(searchTerm: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (this.searchInput.length > 0) {
      this.router.navigate(['/search', searchTerm]);
    }
    else {
      document.getElementById("search-error-message").textContent = 
      'לחפש כלום זה מעניין, אין ספק. אבל אם אתם רוצים לקבל תוצאות – תקלידו לפחות משהו...';
    }
  }

  hideErrorMessage() {
    document.getElementById("search-error-message").textContent = '';
  }
}