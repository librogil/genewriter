import { Component, OnInit } from '@angular/core';
import { GeneWriterService } from 'src/app/genewriter.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Thing } from 'src/app/models/thing.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-something',
  templateUrl: './thing.component.html',
  styleUrls: ['./thing.component.scss']
})

export class ThingComponent implements OnInit {

  thing: Thing;
  thingID: string;
  comments: [{content: String, writer: String, date: String, time: String}];
  commentInputCheck = '';
  writerInputCheck = '';

  constructor(private genewriterService: GeneWriterService, private route: ActivatedRoute, public _router: Router, public _location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe((params: Params) => {
      this.thingID = params.thingID;
    });
    this.activatedRoute.data.subscribe((data: { thing: Thing }) => {
      this.thing = data.thing;
      this.comments = data.thing.comments;
    });
  }

  addComment(content: String, writer: String) {

    // gets time & date of the comment >>>

    var date;
    var time;
    var dateObject =  new Date();
    var year = dateObject.getFullYear().toString().slice(2);
    var month = (dateObject.getMonth() + 1).toString();
    var day = dateObject.getDate().toString();
    var hour = dateObject.getHours().toString();
    var minutes = dateObject.getMinutes().toString();

    if (month.length == 1) { month = '0' + month; }
    if (day.length == 1) { day = '0' + day; }
    if (hour.length == 1) { hour = '0' + hour; }
    if (minutes.length == 1) { minutes = '0' + minutes; }

    date = day + "." + month + "." + year;
    time = hour + ':' + minutes;

    // gets time & date of the comment <<<
    
    var newComment = {content, writer, date, time};

    // error messages if the user tries to add a comment without content or name >>>

    if (this.commentInputCheck.length <= 0) {
      document.getElementById("error-message").textContent = 
      'אין ספק שתגובה ריקה היא המחמאה האולטימטיבית, ושמן הסתם פשוט לא מצאתם מילים להביע עד כמה הטקסט הזה הדהים אתכם, אבל אנא עשו מאמץ...';
    }
    else if (this.writerInputCheck.length <= 0) {
      document.getElementById("error-message").textContent = 
      'אצלנו ב-genewriter אנחנו בעד שקיפות, ורוצים לדעת מי מחמיא ומפרגן, ובעיקר - מי מלכלך... אז אנא - הוסיפו שם לתגובה.';
    }
    else {
      this.genewriterService.addComment(this.thingID, newComment).subscribe(() => {
        this._router.navigateByUrl("/refresh", {skipLocationChange: true}).then(() => {
          this._router.navigate([decodeURI(this._location.path())]);
        })
      })
    }

    // error messages if the user tries to add a comment without content or name <<<

  }

  hideErrorMessage() {
    document.getElementById("error-message").textContent = '';
  }
}