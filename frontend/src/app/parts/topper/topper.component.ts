import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topper',
  templateUrl: './topper.component.html',
  styleUrls: ['./topper.component.scss']
})

export class TopperComponent implements OnInit {

  @Input() page: number;
  @Output() pageChange = new EventEmitter<number>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  home() {
    this.pageChange.emit(1);
    this.router.navigate(['']);
    if (!(this.router.url.includes('about')) && !(this.router.url.includes('thing')) && !(this.router.url.includes('new'))) {
      window.scrollTo(0, 0);
    }
  }

  about() {
    this.router.navigate(['/about']);
    window.scrollTo(0, 0);
  }
}
