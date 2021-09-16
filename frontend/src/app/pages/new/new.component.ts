/*

LIST OF FUNCTIONS
=================

arrayInitialization(array: any[], length: number);
arrayFiller(input: any[], first: any[], second: any[], partition: number);
getRandomNumber(number: number);
getRandomCategory(numbers:number ,position: number);
generateDescription();
generateTwoValuesWritingTask(headline: string);
generateWhoAndWhatWritingTask(chosenType: string);
generateThingsAndPlacesWritingTask(first: Conditional[], second: Conditional[], chosenType: string);
generateDuoWritingTask(first: Conditional[], second: Conditional[], option: number, headline: string);
generateSingularWritingTask(array: Nonconditional[], headline: string);
generateTripleWritingTask(array: Nonconditional[] ,chosenType: string, option: number);
getDescription();
getNewThing(description: string, content: string, title: string, writer: string);
hideErrorMessage();

*/

import { Component, OnInit } from '@angular/core';
import { GeneWriterService } from 'src/app/genewriter.service';
import { Router } from '@angular/router';
import { Thing } from 'src/app/models/thing.model';
import { Ratio } from 'src/app/models/ratio.model';
import { TwoValues } from 'src/app/models/two-values.model';
import { Conditional } from 'src/app/models/conditional.model';
import { Nonconditional } from 'src/app/models/nonconditional.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {
  
  unorderedTwoValues: TwoValues[];
  unorderedConditional: Conditional[];
  unorderedNonconditional: Nonconditional[];

  twoValues: any[][];
  conditional: Conditional[][];
  nonconditional: Nonconditional[][];
  names: String[][];
  jobs: Conditional[][];
  
  chosenElements: string[]; // contains all the parts (elements) of the generated writing task
  chosenCategory: any[]; // saves the category that has been randomly chosen
  
  description: string;
  descriptionHeadline = 'טוען מטלות...';

  titleInputCheck = '';
  writerInputCheck = '';
  contentInputCheck = '';
  descriptionPrefix = '';
  descriptionSuffix = '';

  ratios: Ratio[];

  constructor(private genewriterService: GeneWriterService, private router: Router) { }

  ngOnInit() {
    this.genewriterService.getElements().subscribe((data: {twoValues: TwoValues[], conditional: Conditional[], nonconditional: Nonconditional[], ratio: Ratio[]}) => {
      this.unorderedTwoValues = data.twoValues;
      this.unorderedConditional = data.conditional;
      this.unorderedNonconditional = data.nonconditional;
      this.ratios = data.ratio;

      this.chosenElements = [];
      this.names = [[]];
      this.chosenCategory = [[]];
      this.twoValues = [[]];
      this.conditional = [[]];
      this.nonconditional = [[]];
      this.jobs = [[]];

      this.arrayInitialization(this.twoValues, 36);
      this.arrayInitialization(this.conditional, 6);
      this.arrayInitialization(this.nonconditional, 8);
      this.arrayInitialization(this.names, 4);
      this.arrayInitialization(this.jobs, 2);
      this.arrayFiller(this.unorderedTwoValues, this.twoValues, this.twoValues, 0);
      this.arrayFiller(this.unorderedConditional, this.jobs, this.conditional, 2); // 2 long partition for job titles
      this.arrayFiller(this.unorderedNonconditional, this.names, this.nonconditional, 4); // 4 long partition for names

      this.generateDescription();
    })
  }

  arrayInitialization(array: any[], length: number) {
    var i;
    for (i = 0; i < length; i++) {
      array[i] = [];
    }
  }

  arrayFiller(input: any[], first: any[], second: any[], partition: number) {
    // partition = the numbers of arrays from INPUT that SECOND gets; the rest goes to FIRST
    var i;
    for (i = 0; i < input.length; i++) {
      if (input[i].category < partition) {
        first[input[i].category].push(input[i]);
      }
      else {
        second[(input[i].category)-partition].push(input[i]);
      }
    }
  }

  getRandomNumber(number: number) {
    return Math.floor(Math.random() * number);
  }

  getRandomCategory(numbers:number ,position: number) { 
    // numbers = the nums of ratio values; position = the position in the MongoDB collection
    var i;
    var sum = 0;
    var chosenCategoryNumber = 0;
    var chosenNumber = 0;
    
    for (i = 0; i < numbers; i++ ) {
      sum += this.ratios[i + position].value;
    }
    chosenNumber = this.getRandomNumber(sum);
    sum = 0;
    for (i = 0; i < numbers; i++ ) {
      if (sum <= chosenNumber && (sum + this.ratios[i + position].value) > chosenNumber) {
        chosenCategoryNumber = i;  
      }
      sum += this.ratios[i + position].value;
    }
    return chosenCategoryNumber;
  }

  generateDescription() {
    this.description = '';
    this.chosenElements = [];

    var typeOptions = ['משהו', 'סיפור בגוף ראשון', 'משהו', 'סיפור בגוף שני', 'משהו', 'סיפור בגוף שלישי', 'משהו', 'דיאלוג', 'משהו', 'שיר בחרוזים'];
    var chosenType = typeOptions[this.getRandomNumber(typeOptions.length)];
    var i;
    var chosenCategoryNumber = this.getRandomCategory(8, 0);
    switch (chosenCategoryNumber) {
      case 0: { // Two Values
        this.generateTwoValuesWritingTask('כיתבו ' + chosenType + ' על:'); 
        this.descriptionPrefix = ' ';
        this.descriptionSuffix = '';
        break; 
      }
      case 1: { // Who & What
        this.generateWhoAndWhatWritingTask(chosenType); 
        this.descriptionPrefix = ' ';
        this.descriptionSuffix = '';
        break; 
      }
      case 2: { // Things & Places
        this.generateThingsAndPlacesWritingTask(chosenType); 
        break; 
      }
      case 3: { // Openings
        this.generateSingularWritingTask(this.nonconditional[1], 'כיתבו משהו שמתחיל ב:'); 
        this.descriptionPrefix = '-״';
        this.descriptionSuffix = '״';
        break; 
      }
      case 4: { // Endings
        this.generateSingularWritingTask(this.nonconditional[2], 'כיתבו משהו שמסתיים ב:'); 
        this.descriptionPrefix = '-״';
        this.descriptionSuffix = '״';
        break; 
      }
      case 5: { // Singular
        this.generateSingularWritingTask(this.nonconditional[0], 'כיתבו ' + chosenType + ' על:'); 
        this.descriptionPrefix = ' ';
        this.descriptionSuffix = '';
        break; 
      }
      case 6: { // Words
        this.generateTripleWritingTask(this.nonconditional[3], 'כיתבו ' + chosenType + ' עם המילים:');
        this.descriptionPrefix = ' ';
        this.descriptionSuffix = '';
        break; 
      }
      case 7: { // Characters
        this.generateTripleWritingTask(this.nonconditional[4], 'כיתבו ' + chosenType + ' עם הדמויות:');
        this.descriptionPrefix = ' ';
        this.descriptionSuffix = '';
        break; 
      }
    }
    document.getElementById("thing-description").textContent = this.description + '.';
  }

  generateTwoValuesWritingTask(headline: string) {
    var i, j;  
    var chosenElement;
    var chosenConditions = [];
    var chosenCategoryNumber;
    this.arrayInitialization(this.chosenCategory, 3);
    chosenCategoryNumber = this.getRandomCategory(12,8);
    for (i = 0; i < 3; i++) { 
      this.chosenCategory[i] = this.twoValues[(3 * chosenCategoryNumber) + i]; 
    }

    // 1. draws a random format (and JOB if the chosen format is 8 or 9) >>>

    var formatOptions = [[0],[1],[2],[0,2],[1,2],[0,1,2]];
    
    var titles = ['ילדה בשם ', 'ילד בשם ', 'נערה בשם ', 'נער בשם ', 'חיילת בשם ', 'חייל בשם ', 'סטודנטית בשם ', 'סטודנט בשם ', '', '', 'פנסיונרית בשם ', 'פנסיונר בשם '];
    
    var extrasOptions = [[[]]];
    extrasOptions[0][0] = [' ש'];
    extrasOptions[0][1] = [' ש'];
    extrasOptions[0][2] = [' ש'];
    extrasOptions[0][3] = ['. ', ', ו'];
    extrasOptions[0][4] = ['. ', ', ו'];
    extrasOptions[0][5] = ['. ', ', ', ', ו'];

    if ((chosenCategoryNumber == 8) || (chosenCategoryNumber == 9)) { // if the chosen category is an ADULT and therefore the title should be a job description
      var chosenJob = this.jobs[chosenCategoryNumber - 8][this.getRandomNumber(this.jobs[chosenCategoryNumber - 8].length)].value;
      var extra = ' בשם ';
      var chosenTitle = chosenJob.concat(extra);
    }
    else {
      var chosenTitle = titles[chosenCategoryNumber];
    }

    var chosenFormatNumber = this.getRandomNumber(formatOptions.length);
    var chosenFormat = formatOptions[chosenFormatNumber];
    var extraParts = [chosenTitle].concat(extrasOptions[0][chosenFormatNumber]);

    // 1. draws a random format <<<

    // 2. draws a random name >>>

    var chosenName;
    switch (true) {
      case (chosenCategoryNumber == 0 || chosenCategoryNumber == 2 || chosenCategoryNumber == 4 || chosenCategoryNumber == 6 || chosenCategoryNumber == 8 ): {
        chosenName = this.names[0][this.getRandomNumber(this.names[0].length)]; break; }
      case (chosenCategoryNumber == 1 || chosenCategoryNumber == 3 || chosenCategoryNumber == 5 || chosenCategoryNumber == 7 || chosenCategoryNumber == 9 ): {
        chosenName = this.names[1][this.getRandomNumber(this.names[1].length)]; break; }
      case (chosenCategoryNumber == 10 ): {
        chosenName = this.names[2][this.getRandomNumber(this.names[2].length)]; break; }
      case (chosenCategoryNumber == 11 ): {
        chosenName = this.names[3][this.getRandomNumber(this.names[3].length)]; break; }
    }
    this.chosenElements.push(chosenName.value);

    // 2. draws a random name <<<
      
    // 3. draws all the other elements of the generated writing task >>>
  
    var descriptionPart = '';
    var mutuallyExclusiveConditions = true;

    for (i = 0; i < chosenFormat.length; i++) {
      var mutuallyExclusiveConditions = true;
      while (mutuallyExclusiveConditions) {
        mutuallyExclusiveConditions = false;
        chosenElement = this.chosenCategory[chosenFormat[i]][this.getRandomNumber(this.chosenCategory[chosenFormat[i]].length)];
        for (j = 0; j < chosenElement.conditions.length; j++) {
          if (chosenConditions.includes(chosenElement.conditions[j])) {
            mutuallyExclusiveConditions = true;
          }
        }
      }
      for (j = 0; j < chosenElement.conditions.length; j++) { // adding the conditions of the chosen element to the conditions array
        if (!chosenConditions.includes(chosenElement.conditions[j])) {
          chosenConditions.push(chosenElement.conditions[j]);
        }
      }
      if (chosenFormat.length > 1) {
        this.chosenElements.push(chosenElement.longValue);
      } else {
        this.chosenElements.push(chosenElement.shortValue);
      }            
    }

    for (i = 0; i < this.chosenElements.length; i++ ) {
      descriptionPart = extraParts[i].concat(this.chosenElements[i]);
      this.description = this.description.concat(descriptionPart);
    }

    // 3. draws all the other elements of the generated writing task <<<

    this.descriptionHeadline = headline;
  }

  generateWhoAndWhatWritingTask(chosenType: string) {
    var chosenCategoryNumber = this.getRandomCategory(3, 20);
    switch (chosenCategoryNumber) {
      case 0: { // Female
        this.generateDuoWritingTask(this.conditional[0], this.conditional[1], 1, 'כיתבו ' + chosenType + ' על:');
        break; 
      }
      case 1: { // Male
        this.generateDuoWritingTask(this.conditional[2], this.conditional[3], 1, 'כיתבו ' + chosenType + ' על:'); 
        break; 
      }
      case 2: { // Complete Sentence
        this.generateSingularWritingTask(this.nonconditional[0], 'כיתבו ' + chosenType + ' על:');
        break; 
      }
    }
  }

  generateDuoWritingTask(first: Conditional[], second: Conditional[], option: number, headline: string) {
    // if option = 1 then Who & What; option = 2 then Things & Places 
    var i, j;
    var chosenConditions = [];
    var chosenElement;

    this.chosenCategory[0] = first;
    this.chosenCategory[1] = second;

    chosenElement = this.chosenCategory[0][this.getRandomNumber(this.chosenCategory[0].length)];
    this.chosenElements.push(chosenElement.value);
    chosenConditions = chosenElement.conditions;
    var mutuallyExclusiveConditions = true;
    while (mutuallyExclusiveConditions) {
      mutuallyExclusiveConditions = false;
      chosenElement = this.chosenCategory[1][this.getRandomNumber(this.chosenCategory[1].length)];
      if (chosenConditions[0]) {
        for (j = 0; j < chosenElement.conditions.length; j++) {
          if (chosenConditions.includes(chosenElement.conditions[j])) {
            mutuallyExclusiveConditions = true;
          }
        }
      }
    }
    this.chosenElements.push(chosenElement.value);
    var descriptionPart = '';
    var extras = [];
    extras[0] = '';
    if (option == 1) {
      extras[1] = ' ש';
    }
    if (option == 2) {
      extras[1] = ' ב';
    }
    for (i = 0; i < 2; i++ ) {
      descriptionPart = extras[i].concat(this.chosenElements[i]);
      this.description = this.description.concat(descriptionPart);
    }
    this.descriptionHeadline = headline;
  }

  generateThingsAndPlacesWritingTask(chosenType: string) {
    var chosenCategoryNumber = this.getRandomCategory(3, 23);
    switch (chosenCategoryNumber) {
      case 0: { // Things
        this.generateSingularWritingTask(this.conditional[4], 'כיתבו ' + chosenType + ' על:');
        this.descriptionPrefix = ' ';
        this.descriptionSuffix = '';
        break;
      }
      case 1: { // Places
        this.generateSingularWritingTask(this.conditional[5], 'כיתבו ' + chosenType + ' שמתרחש ב:');
        this.descriptionPrefix = '';
        this.descriptionSuffix = '';
        break;
      }
      case 2: { // Things AND Places
        this.generateDuoWritingTask(this.conditional[4], this.conditional[5], 2, 'כיתבו ' + chosenType + ' על:');
        this.descriptionPrefix = ' ';
        this.descriptionSuffix = '';
        break;
      }
    }
  }

  generateSingularWritingTask(array: Nonconditional[], headline: string) {
    var chosenElement = array[this.getRandomNumber(array.length)].value;
    this.description = chosenElement.toString();
    this.descriptionHeadline = headline;
  }

  generateTripleWritingTask(array: Nonconditional[] ,headline: string) {
    var duplicationCheck;
    var chosenElement;
    var i;
    chosenElement = array[this.getRandomNumber(array.length)];
    this.chosenElements.push(chosenElement.value);
    for (i = 0; i < 2; i++) {
      duplicationCheck = true;
      while (duplicationCheck) {
        duplicationCheck = false;
        chosenElement = array[this.getRandomNumber(array.length)];
        if (this.chosenElements.includes(chosenElement.value)) {
          duplicationCheck = true;
        }
      }
      this.chosenElements.push(chosenElement.value);
    }
    this.descriptionHeadline = headline;
    this.description = this.chosenElements[0] + ', ' + this.chosenElements[1] + ', ' + this.chosenElements[2];
  }

  getDescription() {
    //return document.getElementById("thing-description").textContent;
    return this.descriptionHeadline.substring(6, this.descriptionHeadline.length-1) + this.descriptionPrefix + this.description + this.descriptionSuffix;
  }

  getNewThing(description: string, content: string, title: string, writer: string) {

    // gets date of the thing >>>

    var dateObject =  new Date();
    var year = dateObject.getFullYear().toString().slice(2);
    var month = (dateObject.getMonth() + 1).toString();
    if (month.length == 1) { month = '0' + month; }
    var day = dateObject.getDate().toString();
    if (day.length == 1) { day = '0' + day; }
    var date = day + "." + month + "." + year;

    // gets date of the thing <<<

    // error messages if the user tries to post something without content or name >>>

    if (this.contentInputCheck.length <= 0) {
      document.getElementById("error-message").textContent = 
      'זה מאוד עמוק ומעורר-מחשבה סיפור על כלום. אבל תכתבו לפחות משהו..?';
    }
    else if (this.titleInputCheck.length <= 0) {
      document.getElementById("error-message").textContent = 
      'זה מאוד מינימליסטי ומודרני לפרסם יצירה ללא כותרת. אבל פה צריך.';
    }
    else if (this.writerInputCheck.length <= 0) {
      document.getElementById("error-message").textContent = 
      'נגעה לליבנו הצניעות לפרסם יצירה ללא שם מחבר/ת. אבל פה אנחנו מעודדים גאוותנות.';
    }

    // error messages if the user tries to post something without content or name <<<

    else {
      this.genewriterService.createSomething(description, content, title, writer, date).subscribe((thing: Thing) => {
        this.router.navigate(['']);
      });
    }
  }

  hideErrorMessage() {
    document.getElementById("error-message").textContent = '';
  }
}