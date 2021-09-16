import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onPageChange(event) {
    this.page = event;
    this.pageChange.emit(this.page);
    window.scrollTo(0, 0);
  }

  previous() {
    this.page--;
    this.pageChange.emit(this.page);
    window.scrollTo(0, 0);
  }

  next() {
    this.page++;
    this.pageChange.emit(this.page);
    window.scrollTo(0, 0);
  }
}
