import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Http
} from '@angular/http';
import 'rxjs/add/operator/map';

import {
  EdserService
} from '../edser.service';



declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {




  currentID;

  json;
  questionArray = [];

  whichempty;

  // var for finishing test
  testFinished = false;
  testProblem = false;

  // currentpage
  p = 1;


  numberFilled = 0;


  // results of tests
  result1 = 0;
  result2 = 0;
  result3 = 0;
  result4 = 0;
  result5 = 0;




  // Custom VARS
  // test user
  IZ1;
  IZ2;
  IZ3;
  IW1;
  IW2;
  IW3;
  IWE1;
  IWE2;
  IWE3;
  IWE4;
  IK1;
  IK2;
  IK3;
  SMOE1;
  SMOE2;
  SMOE3;
  SMOE4;
  SMOE5;
  SMOE6;
  SMOE7;
  // test manager
  CW1;
  CW2;
  VB1;
  VB2;
  VB3;
  PRO1;
  PRO2;
  PRO3;
  COM1;
  COM2;
  COM3;
  BOR1;
  BOR2;
  BOR3;
  BOR4;





  questionloadBuffer = true;



  // What kind of test are we loading?
  // we have the veiligheidsscan = 1 (default) & the the checklist = 2
  typeTest;


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private http_: Http, private edSer: EdserService, private thisrouter: Router) {

    this.typeTest = this.edSer.getCurrent('usertype');
    this.edSer.debugLog(this.typeTest);

    let stringlink = '';
    if (this.typeTest === '1') {
      stringlink = 'assets/questions/questions5.json';
    } else if (this.typeTest === '2') {
      stringlink = 'assets/questions/questions3.json';
    }
    http_.get(stringlink)
      .map(response => response.json())
      .subscribe(
        article => {
          // GET JSON Object --> change to array
          this.json = article;
          // console.log(this.json);
          this.questionArray = $.map(this.json, function (el) {
            return el;
          });
          console.log(this.questionArray);
        },
        error => console.error(error));
  }

  ngOnInit() {
    // scroll to top
    $('html,body').scrollTop(0);
    // first up, check if one is logged in via service var
    // if not, reroute to logging page
    if (this.edSer.__loggedIn === false) {
      this.thisrouter.navigate(['/', 'login']);
    }
  }


  nextQuestionPre(_index, _score) {

    console.log(_index);
    console.log(_score);

    this.questionloadBuffer = false;

    // set the radiobutton
    this.questionArray[_index].answer = _score;

    let tempNumber = 0;
    this.questionArray.forEach(question => {
      if (question.answer !== undefined) {
        tempNumber++;
      }
    });

    this.numberFilled = tempNumber;

    setTimeout(() => {
      this.nextQuestion();
      // this.loading = true;
      // this.serCred.API_getcontent(1).subscribe(value => this.gotContent(value));
      // this.doTest();
    }, 500);
  }

  nextQuestion() {
    // So, we will look for the next unanswered question
    let pagewithoutanswer;

    // just next
    if (this.questionArray.length > this.p) {
      this.edSer.debugLog('NEXT QUESTION');
      // check next question

      // Triggering to a new
      let mustreturn;

      for (let index2 = this.p; index2 < this.questionArray.length; index2++) {
        if (this.questionArray[index2].answer === undefined) {
          this.p = index2 + 1;
          mustreturn = true;
          this.questionloadBuffer = true;
          // break out
          return;
        }

        // catch the mustreturn one
        if (mustreturn === false) {
          this.p = this.questionArray.length;
          this.nextQuestion();
        }
      }
    } else {
      // end of questionArray, back to 1
      this.edSer.debugLog('BACKDOWN UP TO 1');
      pagewithoutanswer = 1;
      // Get first not answered question, navigate to there
      for (let index = 0; index < this.questionArray.length; index++) {
        if (this.questionArray[index].answer === undefined) {
          this.p = index + 1;
          // break out
          this.questionloadBuffer = true;
          return;
        }
      }
    }

    // show the question


  }




  finishTest() {
    // TODO:  check if everything has been filled in
    let somethingempty = false;
    const whichemptyArray = [];


    this.result1 = 0;
    this.result2 = 0;
    this.result3 = 0;
    this.result4 = 0;
    this.result5 = 0;


    // resetting vars
    this.IZ1 = 0;
    this.IZ2 = 0;
    this.IZ3 = 0;
    this.IW1 = 0;
    this.IW2 = 0;
    this.IW3 = 0;
    this.IWE1 = 0;
    this.IWE2 = 0;
    this.IWE3 = 0;
    this.IWE4 = 0;
    this.IK1 = 0;
    this.IK2 = 0;
    this.IK3 = 0;
    this.SMOE1 = 0;
    this.SMOE2 = 0;
    this.SMOE3 = 0;
    this.SMOE4 = 0;
    this.SMOE5 = 0;
    this.SMOE6 = 0;
    this.SMOE7 = 0;
    // test manager
    this.CW1 = 0;
    this.CW2 = 0;
    this.VB1 = 0;
    this.VB2 = 0;
    this.VB3 = 0;
    this.PRO1 = 0;
    this.PRO2 = 0;
    this.PRO3 = 0;
    this.COM1 = 0;
    this.COM2 = 0;
    this.COM3 = 0;
    this.BOR1 = 0;
    this.BOR2 = 0;
    this.BOR3 = 0;
    this.BOR4 = 0;



    // TODO: Set up for both tests
    if (this.typeTest === 1) {
      // make some logic for collecting test data, loop through questions
      for (let index = 0; index < this.questionArray.length; index++) {
        // tslint:disable-next-line:max-line-length
        if (this.questionArray[index].answer !== null && this.questionArray[index].answer !== undefined && this.questionArray[index].answer !== '') {
          console.log(this.questionArray[index].answer);
          switch (this.questionArray[index].type) {
            case 'IZ1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IZ2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IZ3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IW1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IW2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IW3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IWE1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IWE2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IWE3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IWE4':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IK1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IK2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'IK3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'SMOE1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'SMOE2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'SMOE3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'SMOE4':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'SMOE5':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'SMOE6':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'SMOE7':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
 
          }
        } else {
          // Something is not filled in correctly
          somethingempty = true;
          whichemptyArray.push(index + 1);
        }
      }
    } else if (this.typeTest === 2) {
      for (let index = 0; index < this.questionArray.length; index++) {
        // tslint:disable-next-line:max-line-length
        if (this.questionArray[index].answer !== null && this.questionArray[index].answer !== undefined && this.questionArray[index].answer !== '') {
          console.log(this.questionArray[index].answer);
          switch (this.questionArray[index].type) {
            case 'CW1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'CW2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'VB1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'VB2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'VB3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'OPL1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'OPL2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'OPL3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'PRO1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'PRO2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'PRO3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'COM1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'COM2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'COM3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'BOR1':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'BOR2':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'BOR3':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;
              case 'BOR4':
              // this.result1 = this.result1 + this.questionArray[index].answer;
              break;          }
        } else {
          // Something is not filled in correctly
          somethingempty = true;
          whichemptyArray.push(index + 1);
        }
      }


    }


    //






    if (somethingempty === false) {
      // toggle feedback template view vars
      this.testFinished = true;
      this.testProblem = false;


      // TODO: Below comes the calculating, we need to know how many items one thing has
      if (this.typeTest === 1) {

      } else if (this.typeTest === 2) {

      }

      // everything is filled in and we are gonna send it through the API
      this.result1 = Math.round(this.result1 / 8 * 100) / 100;
      this.result2 = Math.round(this.result2 / 8 * 100) / 100;
      this.result3 = Math.round(this.result3 / 7 * 100) / 100;
      this.result4 = Math.round(this.result4 / 7 * 100) / 100;
      this.result5 = Math.round(this.result5 / 8 * 100) / 100;
      this.edSer.debugLog('Result 1: ' + this.result1);
      this.edSer.debugLog('Result 2: ' + this.result2);
      this.edSer.debugLog('Result 3: ' + this.result3);
      this.edSer.debugLog('Result 4: ' + this.result4);
      this.edSer.debugLog('Result 5: ' + this.result5);
      // tslint:disable-next-line:max-line-length

      ///////////////////////
      // tslint:disable-next-line:max-line-length
      // this.edSer.API_formsubmit(this.edSer.currentGroupID, this.result1, this.result2, this.result3, this.result4, this.result5).subscribe(value => this.formSend(value));
    } else {
      // feedback to the user that something is empty
      this.edSer.debugLog('Not everything is filled in');
      this.edSer.debugLog(whichemptyArray);
      this.whichempty = whichemptyArray.toString();
      // toggle feedback template view vars
      this.testProblem = true;
    }

  }


  formSend(_val) {
    this.edSer.debugLog(_val);
  }




}
