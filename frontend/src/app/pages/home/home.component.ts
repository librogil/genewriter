import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Thing } from 'src/app/models/thing.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  things: Thing[];
  searchInput = '';
  page = 1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.data.subscribe((data: { things: Thing[] }) => {
      this.things = data.things.slice().reverse();
    });
  }  

  search(searchTerm: string) {
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