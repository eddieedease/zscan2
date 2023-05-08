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


  introShow = true;

  currentUserId;
  currentGroupId;

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

  thisColor;
  thisLogo;



  // Custom VARS
  // test user
  IZ1;
  resultIZ1;
  IZ2;
  resultIZ2;
  IZ3;
  resultIZ3;
  IW1;
  resultIW1;
  IW2;
  resultIW2;
  IW3;
  resultIW3;
  IWE1;
  resultIWE1;
  IWE2;
  resultIWE2;
  IWE3;
  resultIWE3;
  IWE4;
  resultIWE4;
  IK1;
  resultIK1;
  IK2;
  resultIK2;
  IK3;
  resultIK3;
  SMOE1;
  resultSMOE1;
  SMOE2;
  resultSMOE2;
  SMOE3;
  resultSMOE3;
  SMOE4;
  resultSMOE4;
  SMOE5;
  resultSMOE5;
  SMOE6;
  resultSMOE6;
  SMOE7;
  resultSMOE7;
  SMOE8;
  resultSMOE8;
  // test manager
  CW1;
  resultCW1;
  CW2;
  resultCW2;
  VB1;
  resultVB1;
  VB2;
  resultVB2;
  VB3;
  resultVB3;
  PRO1;
  resultPRO1;
  PRO2;
  resultPRO2;
  PRO3;
  resultPRO3;
  COM1;
  resultCOM1;
  COM2;
  resultCOM2;
  COM3;
  resultCOM3;
  BOR1;
  resultBOR1;
  BOR2;
  resultBOR2;
  BOR3;
  resultBOR3;
  BOR4;
  resultBOR4;
  BOR5;
  resultBOR5;
  OPL1;
  resultOPL1;
  OPL2;
  resultOPL2;
  OPL3;
  resultOPL3;


  openQ;


  questionloadBuffer = true;



  // What kind of test are we loading?
  // we have the veiligheidsscan = 1 (default) & the the checklist = 2
  typeTest;


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private http_: Http, private edSer: EdserService, private thisrouter: Router) {

    this.typeTest = this.edSer.getCurrent('usertype');
    this.currentUserId = this.edSer.getCurrent('userid');
    this.currentGroupId = this.edSer.getCurrent('groupid');
    this.edSer.debugLog(this.typeTest);

    let stringlink = '';
    if (this.typeTest === 1) {
      stringlink = 'assets/questions/questions5.json';
    } else if (this.typeTest === 2) {
      stringlink = 'assets/questions/questions3.json';
    }
    this.edSer.debugLog(stringlink);
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
    } else {
      // we must get the group logo and color if there are any
      this.edSer.API_getorginfo(this.currentGroupId).subscribe(value => this.gotGroupInfo(value));

    }
  }


  gotGroupInfo(_resp) {
    this.edSer.debugLog(_resp);

    if (_resp[0].logo == null) {
      // set default logo
      this.thisLogo = 'assets/logo.png';
    } else {
      // set db value
      this.thisLogo = 'uploads/orglogo/' + this.currentGroupId + '/' + _resp[0].logo;
    }

    // set color
    // catch hex value
    if (_resp[0].orgcolor.length == 6) {
      // add # 
      this.thisColor = '#' + _resp[0].orgcolor;
    } else {
      this.thisColor = _resp[0].orgcolor;
    }


  }

  beginNow() {
    this.introShow = false;
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
    }, 300);
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
    this.SMOE8 = 0;
    // test manager
    this.CW1 = 0;
    this.CW2 = 0;
    this.VB1 = 0;
    this.VB2 = 0;
    this.VB3 = 0;
    this.OPL1 = 0;
    this.OPL2 = 0;
    this.OPL3 = 0;
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
    this.BOR5 = 0;


    // TODO: Set up for both tests
    if (this.typeTest === 1) {
      // make some logic for collecting test data, loop through questions
      for (let index = 0; index < this.questionArray.length; index++) {
        // tslint:disable-next-line:max-line-length
        if (this.questionArray[index].answer !== null && this.questionArray[index].answer !== undefined && this.questionArray[index].answer !== '') {
          // smoezen omgepoold
          if (this.questionArray[index].type === 'SMOE1' || this.questionArray[index].type === 'SMOE2' || this.questionArray[index].type === 'SMOE3' || this.questionArray[index].type === 'SMOE4' || this.questionArray[index].type === 'SMOE5' || this.questionArray[index].type === 'SMOE6' || this.questionArray[index].type === 'SMOE7' || this.questionArray[index].type === 'SMOE8') {
            switch (this.questionArray[index].answer) {
              case 1:
                this.questionArray[index].answer = 5;
                break;
              case 2:
                this.questionArray[index].answer = 4;
                break;
              case 4:
                this.questionArray[index].answer = 2;
                break;
              case 5:
                this.questionArray[index].answer = 1;
                break;


            }
          }

          switch (this.questionArray[index].type) {
            case 'IZ1':
              this.IZ1 = this.IZ1 + this.questionArray[index].answer;
              break;
            case 'IZ2':
              this.IZ2 = this.IZ2 + this.questionArray[index].answer;
              break;
            case 'IZ3':
              this.IZ3 = this.IZ3 + this.questionArray[index].answer;
              break;
            case 'IW1':
              this.IW1 = this.IW1 + this.questionArray[index].answer;
              break;
            case 'IW2':
              this.IW2 = this.IW2 + this.questionArray[index].answer;
              break;
            case 'IW3':
              this.IW3 = this.IW3 + this.questionArray[index].answer;
              break;
            case 'IWE1':
              this.IWE1 = this.IWE1 + this.questionArray[index].answer;
              break;
            case 'IWE2':
              this.IWE2 = this.IWE2 + this.questionArray[index].answer;
              break;
            case 'IWE3':
              this.IWE3 = this.IWE3 + this.questionArray[index].answer;
              break;
            case 'IWE4':
              this.IWE4 = this.IWE4 + this.questionArray[index].answer;
              break;
            case 'IK1':
              this.IK1 = this.IK1 + this.questionArray[index].answer;
              break;
            case 'IK2':
              this.IK2 = this.IK2 + this.questionArray[index].answer;
              break;
            case 'IK3':
              this.IK3 = this.IK3 + this.questionArray[index].answer;
              break;
            case 'SMOE1':
              this.SMOE1 = this.SMOE1 + this.questionArray[index].answer;
              break;
            case 'SMOE2':
              this.SMOE2 = this.SMOE2 + this.questionArray[index].answer;
              break;
            case 'SMOE3':
              this.SMOE3 = this.SMOE3 + this.questionArray[index].answer;
              break;
            case 'SMOE4':
              this.SMOE4 = this.SMOE4 + this.questionArray[index].answer;
              break;
            case 'SMOE5':
              this.SMOE5 = this.SMOE5 + this.questionArray[index].answer;
              break;
            case 'SMOE6':
              this.SMOE6 = this.SMOE6 + this.questionArray[index].answer;
              break;
            case 'SMOE7':
              this.SMOE7 = this.SMOE7 + this.questionArray[index].answer;
              break;
            case 'SMOE8':
              this.SMOE8 = this.SMOE8 + this.questionArray[index].answer;
              break;
          }
        } else {
          // Something is not filled in correctly

          // exclude the open question
          if (this.questionArray[index].type === 'OPEN') {

          } else {
            somethingempty = true;
            whichemptyArray.push(index + 1);
          }


        }
      }
    } else if (this.typeTest === 2) {
      for (let index = 0; index < this.questionArray.length; index++) {
        // tslint:disable-next-line:max-line-length
        if (this.questionArray[index].answer !== null && this.questionArray[index].answer !== undefined && this.questionArray[index].answer !== '') {
          console.log(this.questionArray[index].answer);

          // catch the CW1 situation
          switch (this.questionArray[index].CW1) {
            case 'true':
              this.CW1 = this.CW1 + this.questionArray[index].answer;
              break;
            case 'false':
              break;
          }

          switch (this.questionArray[index].type) {
            case 'CW1':
              this.CW1 = this.CW1 + this.questionArray[index].answer;
              break;
            case 'CW2':
              this.CW2 = this.CW2 + this.questionArray[index].answer;
              break;
            case 'VB1':
              this.VB1 = this.VB1 + this.questionArray[index].answer;
              break;
            case 'VB2':
              this.VB2 = this.VB2 + this.questionArray[index].answer;
              break;
            case 'VB3':
              this.VB3 = this.VB3 + this.questionArray[index].answer;
              break;
            case 'OPL1':
              this.OPL1 = this.OPL1 + this.questionArray[index].answer;
              break;
            case 'OPL2':
              this.OPL2 = this.OPL2 + this.questionArray[index].answer;
              break;
            case 'OPL3':
              this.OPL3 = this.OPL3 + this.questionArray[index].answer;
              break;
            case 'PRO1':
              this.PRO1 = this.PRO1 + this.questionArray[index].answer;
              break;
            case 'PRO2':
              this.PRO2 = this.PRO2 + this.questionArray[index].answer;
              break;
            case 'PRO3':
              this.PRO3 = this.PRO3 + this.questionArray[index].answer;
              break;
            case 'COM1':
              this.COM1 = this.COM1 + this.questionArray[index].answer;
              break;
            case 'COM2':
              this.COM2 = this.COM2 + this.questionArray[index].answer;
              break;
            case 'COM3':
              this.COM3 = this.COM3 + this.questionArray[index].answer;
              break;
            case 'BOR1':
              this.BOR1 = this.BOR1 + this.questionArray[index].answer;
              break;
            case 'BOR2':
              this.BOR2 = this.BOR2 + this.questionArray[index].answer;
              break;
            case 'BOR3':
              this.BOR3 = this.BOR3 + this.questionArray[index].answer;
              break;
            case 'BOR4':
              this.BOR4 = this.BOR4 + this.questionArray[index].answer;
              break;
            case 'BOR5':
              this.BOR5 = this.BOR5 + this.questionArray[index].answer;
              break;
          }
        } else {
          // Something is not filled in correctly
          somethingempty = true;
          whichemptyArray.push(index + 1);
        }
      }
    }


    if (somethingempty === false) {
      // toggle feedback template view vars



      // TODO: Below comes the calculating, we need to know how many items one thing has
      if (this.typeTest === 1) {
        // rounded up shared by number of questions
        // this.result1 = Math.round(this.result1 / 8 * 100) / 100;
        this.IZ1 = Math.round(this.IZ1 / 5 * 100) / 100;
        this.IZ2 = Math.round(this.IZ2 / 3 * 100) / 100;
        this.IZ3 = Math.round(this.IZ3 / 2 * 100) / 100;
        this.IW1 = Math.round(this.IW1 / 8 * 100) / 100;
        this.IW2 = Math.round(this.IW2 / 5 * 100) / 100;
        this.IW3 = Math.round(this.IW3 / 1 * 100) / 100;
        this.IWE1 = Math.round(this.IWE1 / 1 * 100) / 100;
        this.IWE2 = Math.round(this.IWE2 / 1 * 100) / 100;
        this.IWE3 = Math.round(this.IWE3 / 1 * 100) / 100;
        this.IWE4 = Math.round(this.IWE4 / 2 * 100) / 100;
        this.IK1 = Math.round(this.IK1 / 1 * 100) / 100;
        this.IK2 = Math.round(this.IK2 / 6 * 100) / 100;
        this.IK3 = Math.round(this.IK3 / 1 * 100) / 100;
        this.SMOE1 = Math.round(this.SMOE1 / 1 * 100) / 100;
        this.SMOE2 = Math.round(this.SMOE2 / 1 * 100) / 100;
        this.SMOE3 = Math.round(this.SMOE3 / 1 * 100) / 100;
        this.SMOE4 = Math.round(this.SMOE4 / 1 * 100) / 100;
        this.SMOE5 = Math.round(this.SMOE5 / 1 * 100) / 100;
        this.SMOE6 = Math.round(this.SMOE6 / 1 * 100) / 100;
        // tslint:disable-next-line:max-line-length
        this.edSer.API_formsubmit(this.currentGroupId, this.currentUserId, this.IZ1, this.IZ2, this.IZ3, this.IW1, this.IW2, this.IW3, this.IWE1, this.IWE2, this.IWE3, this.IWE4, this.IK1, this.IK2, this.IK3, this.SMOE1, this.SMOE2, this.SMOE3, this.SMOE4, this.SMOE5, this.SMOE6, this.SMOE7, this.SMOE8, this.openQ).subscribe(value => this.formSend(value));

      } else if (this.typeTest === 2) {
        this.CW1 = Math.round(this.CW1 / 24 * 100) / 100;
        this.CW2 = Math.round(this.CW2 / 2 * 100) / 100;
        this.VB1 = Math.round(this.VB1 / 1 * 100) / 100;
        this.VB2 = Math.round(this.VB2 / 3 * 100) / 100;
        this.VB3 = Math.round(this.VB3 / 2 * 100) / 100;
        this.OPL1 = Math.round(this.OPL1 / 4 * 100) / 100;
        this.OPL2 = Math.round(this.OPL2 / 1 * 100) / 100;
        this.OPL3 = Math.round(this.OPL3 / 1 * 100) / 100;
        this.PRO1 = Math.round(this.PRO1 / 1 * 100) / 100;
        this.PRO2 = Math.round(this.PRO2 / 1 * 100) / 100;
        this.PRO3 = Math.round(this.PRO3 / 1 * 100) / 100;
        this.COM1 = Math.round(this.COM1 / 1 * 100) / 100;
        this.COM2 = Math.round(this.COM2 / 1 * 100) / 100;
        this.COM3 = Math.round(this.COM3 / 3 * 100) / 100;
        this.BOR1 = Math.round(this.BOR1 / 3 * 100) / 100;
        this.BOR2 = Math.round(this.BOR2 / 4 * 100) / 100;
        this.BOR3 = Math.round(this.BOR3 / 1 * 100) / 100;
        this.BOR4 = Math.round(this.BOR4 / 2 * 100) / 100;
        this.BOR5 = Math.round(this.BOR5 / 3 * 100) / 100;
        // tslint:disable-next-line:max-line-length
        this.edSer.API_checklistsubmit(this.currentGroupId, this.currentUserId, this.CW1, this.CW2, this.VB1, this.VB2, this.VB3, this.OPL1, this.OPL2, this.OPL3, this.PRO1, this.PRO2, this.PRO3, this.COM1, this.COM2, this.COM3, this.BOR1, this.BOR2, this.BOR3, this.BOR4, this.BOR5).subscribe(value => this.formSend(value));

      }
      this.testFinished = true;
      this.testProblem = false;
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
    // TODO: Communicate that send of the form is complete, and that they can close the window
    this.edSer.debugLog('Asjemenou, form send!')
    this.edSer.debugLog(_val);
  }




}
