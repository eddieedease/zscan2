import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import {
  EdserService
} from '../edser.service';

import {
  BsModalService
} from 'ngx-bootstrap/modal';
import {
  BsModalRef
} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {
  TabDirective
} from 'ngx-bootstrap/tabs';

import {
  DatatableComponent
} from '@swimlane/ngx-datatable';

import {
  environment
} from '../../environments/environment';



declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  @ViewChild(DatatableComponent, {
    static: false
  }) table: DatatableComponent;
  // reference to this
  thisRef;




  // modalRef
  modalRef: BsModalRef;


  // logging var
  adminLogged = false;
  // error message view
  errorMsg = false;
  // loading visible view
  loading = false;
  admnPwd = '';

  // deletemodal task
  sureModalTask = '';

  admnEmail = '';
  admnId = 0;
  admnType = 0;

  // forms vars
  groupName = '';
  pasKey = '';
  currentGroup = '';
  currentGroupID;

  csvContent;
  howManySendQuestions;
  howManySendChecklist;


  ausrId;
  ausrName;
  ausrLastName;
  ausrEmail;
  ausrType;
  ausrWw;

  groupId;

  userAddUser = false;
  userAddBulk = false;
  userSendMails = false;

  locc;


  dateToday;

  emailAdd = '';


  // start with empty groupRows, columns are taken care of in the html
  groupRows = [
    // { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    // { name: 'Dany', gender: 'Male', company: 'KFC' },
    // { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  tempgroupRows = [];
  groupListUsers = [];
  tempgroupListUsers = [];
  allGroupRows = [];
  tempallGroupRows = [];
  manageRows = [];
  tempmanageRows = [];
  userRows = [];
  tempuserRows = [];






  // Some list of int  which we can use for the styling
  // 0 = Red, 1 = Orange, 2 = green
  // last one is sum
  iz1 = 0;
  iztot = 0;
  iz2 = 0;

  iz3 = 0;
  iz = 0;
  iw1 = 0;
  iwtot = 0;

  iw2 = 0;
  iw3 = 0;

  iw = 0;
  iwe1 = 0;
  iwetot = 0;
  iwe2 = 0;

  iwe3 = 0;

  iwe4 = 0;

  iwe = 0;
  ik1 = 0;
  iktot = 0;
  ik2 = 0;

  ik3 = 0;

  ik = 0;

  smoe1 = 0;
  smoe1tot = 0;
  smoe2 = 0;
  smoe2tot = 0;
  smoe3 = 0;
  smoe3tot = 0;
  smoe4 = 0;
  smoe4tot = 0;
  smoe5 = 0;
  smoe5tot = 0;
  smoe6 = 0;
  smoe6tot = 0;
  /* smoe7 = 0;
  smoe7tot = 0; */

  // checklist vars
  cw1 = 0;
  cwtot = 0;
  cw2 = 0;

  cw3 = 0;

  cw = 0;
  vb1 = 0;
  vbtot = 0;
  vb2 = 0;

  vb3 = 0;

  vb = 0;
  opl1 = 0;
  opltot = 0;
  opl2 = 0;

  opl3 = 0;

  opl = 0;
  pro1 = 0;
  protot = 0;
  pro2 = 0;

  pro3 = 0;

  pro = 0;
  com1 = 0;
  comtot = 0;
  com2 = 0;

  com3 = 0;

  com = 0;
  bor1 = 0;
  bortot = 0;
  bor2 = 0;

  bor3 = 0;

  bor4 = 0;

  bor5 = 0;

  bor = 0;

  csvUserArray;


  showScore = false;

  feedbackArray = [];



  fileHolder = null;


  tableMessages = {
    emptyMessage: `
      <div>
        <span class="classname">Geen resultaten gevonden</span>
      </div>
    `
  };


  // search vars
  searchgroupname = '';
  searchusersemail = '';
  searchadminname = '';
  searchadminemail = '';
  searchadminstogroup = '';
  // columns = [
  //   { prop: 'name' },
  //   { name: 'Gender' },
  //   { name: 'Company' }
  // ];

  // deleting vars
  currentCase = '';
  currentId;

  constructor(private thisrouter: Router, private serCred: EdserService, private toastr: ToastrService, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.thisRef = this;
    this.locc = window.location.hostname;
    this.serCred.debugLog(this.locc);
    $('html,body').scrollTop(0);

    if (environment.production === false) {
      // fast logging in for development mode
      this.serCred.API_admnlogin('demo@demo.nl', 'demo').subscribe(value => this.gotLogin(value));

      /* $('#adminModal').modal('show', {
        backdrop: 'static',
        keyboard: false
      }); */

    } else {
      $('#adminModal').modal('show', {
        backdrop: 'static',
        keyboard: false
      });
    }


    this.dateToday = new Date();

  }

  // tempgroupRows = [];
  // groupListUsers = [];
  // tempgroupListUsers = [];
  // allGroupRows = [];
  // tempallGroupRows = [];
  // manageRows = [];
  // tempmanageRows = [];
  // userRows = [];
  // tempuserRows = [];


  // searchgroupname = '';
  // searchusersemail = '';
  // searchadminname = '';
  // searchadminemail = '';

  // Functionality for the searching filter in the tables
  updateFilter(_type, event) {
    this.serCred.debugLog(event);
    const val = event.target.value.toLowerCase();
    // lets switch it up ;)
    // in what table are we searching
    switch (_type) {
      case 'groupname':
        // filter our data
        const temp = this.tempgroupRows.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.groupRows = temp;
        break;
      case 'usersemail':
        // filter our data
        const temp1 = this.tempgroupListUsers.filter(function (d) {
          return d.email.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.groupListUsers = temp1;
        break;
      case 'adminname':
        // filter our data
        const temp3 = this.tempmanageRows.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.manageRows = temp3;
        break;
      case 'adminemail':
        // filter our data
        const temp4 = this.tempmanageRows.filter(function (d) {
          return d.email.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.manageRows = temp4;
        break;
      case 'admintogroups':
        // filter our data
        const temp5 = this.tempallGroupRows.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.allGroupRows = temp5;
        break;

    }
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }



  loginAttempt() {
    if (this.admnPwd === '') {
      this.errorMsg = true;
    } else {
      this.loading = true;
      ///////////////////////
      this.serCred.API_admnlogin(this.admnEmail, this.admnPwd).subscribe(value => this.gotLogin(value));
    }
  }

  gotLogin(_val) {
    console.log(_val);
    this.loading = false;
    // Check if response exist
    if (_val.status === 'success') {
      this.adminLogged = true;
      // TODO: Set some service variables over here
      $('#adminModal').modal('hide');
      const typee = Number(_val.type);
      this.admnType = typee;
      this.admnId = Number(_val.aid);
      ///////////////////////
      this.serCred.API_getgroups(this.admnId).subscribe(value => this.gotGroups(value));


      if (this.admnType === 2) {
        this.serCred.API_getausers().subscribe(value => this.gotAusers(value));
      }
    } else {
      // something wrong with credentials
      this.errorMsg = true;
    }
  }


  gotAusers(_resp) {
    this.serCred.debugLog(_resp);
    this.manageRows = _resp;
    this.tempmanageRows = [..._resp];
  }

  showResult(_id) {
    // Frist of, reset all bool values for the result table

    // TODO: RESET ALL VARS?


    // adjust template view var
    this.showScore = !this.showScore;


    // Checks the Landkaart.
    // TODO: also, give back response if not all requirements are met

    this.groupRows.forEach(element => {
      if (_id === element.id) {
        this.currentGroup = element.name;
      }
    });
    // this.loading = true;
    ///////////////////////
    this.serCred.API_getresultsfromgroup(_id).subscribe(value => this.gotResults(value));
  }

  gotResults(_val) {
    
    this.loading = false;
    this.serCred.debugLog(_val);
    this.howManySendQuestions = _val['questions'].length;
    this.howManySendChecklist = _val['checklists'].length;
    // NOTE: This gives back 2 arrays
    // _val['questions'] = userArray
    // _val['checklists'] = managerArray
    // reset feedback array
    this.feedbackArray = [];

    // Calculate scores = total of each divided by howManySend
    let iz1 = 0;
    let iz2 = 0;
    let iz3 = 0;
    let iw1 = 0;
    let iw2 = 0;
    let iw3 = 0;
    let iwe1 = 0;
    let iwe2 = 0;
    let iwe3 = 0;
    let iwe4 = 0;
    let ik1 = 0;
    let ik2 = 0;
    let ik3 = 0;
    let cw1 = 0;
    let cw2 = 0;
    let cw3 = 0;
    let vb1 = 0;
    let vb2 = 0;
    let vb3 = 0;
    let opl1 = 0;
    let opl2 = 0;
    let opl3 = 0;
    let pro1 = 0;
    let pro2 = 0;
    let pro3 = 0;
    let com1 = 0;
    let com2 = 0;
    let com3 = 0;
    let bor1 = 0;
    let bor2 = 0;
    let bor3 = 0;
    let bor4 = 0;
    let bor5 = 0;
    let smoe1 = 0;
    let smoe2 = 0;
    let smoe3 = 0;
    let smoe4 = 0;
    let smoe5 = 0;
    let smoe6 = 0;
    /* let smoe7 = 0; */


    // TODO: uncommented below and adjust to the checklist and 


    // we calculate the sum of the questions first
    // Loop through user questions
    for (let index = 0; index < _val['questions'].length; index++) {
      /* 
      iz1 = iz1 + parseFloat(_val[index].result1);
      conflict = conflict + parseFloat(_val[index].result2);
      commitment = commitment + parseFloat(_val[index].result3);
      verantwoordelijk = verantwoordelijk + parseFloat(_val[index].result4);
      resultaat = resultaat + parseFloat(_val[index].result5); */
      iz1 = iz1 + parseFloat(_val['questions'][index].IZ1);
      iz2 = iz2 + parseFloat(_val['questions'][index].IZ2);
      iz3 = iz3 + parseFloat(_val['questions'][index].IZ3);
      iw1 = iw1 + parseFloat(_val['questions'][index].IW1);
      iw2 = iw2 + parseFloat(_val['questions'][index].IW2);
      iw3 = iw3 + parseFloat(_val['questions'][index].IW3);
      iwe1 = iwe1 + parseFloat(_val['questions'][index].IWE1);
      iwe2 = iwe2 + parseFloat(_val['questions'][index].IWE2);
      iwe3 = iwe3 + parseFloat(_val['questions'][index].IWE3);
      iwe4 = iwe4 + parseFloat(_val['questions'][index].IWE4);
      ik1 = ik1 + parseFloat(_val['questions'][index].IK1);
      ik2 = ik2 + parseFloat(_val['questions'][index].IK2);
      ik3 = ik3 + parseFloat(_val['questions'][index].IK3);
      smoe1 = smoe1 + parseFloat(_val['questions'][index].SMOE1);
      smoe2 = smoe2 + parseFloat(_val['questions'][index].SMOE2);
      smoe3 = smoe3 + parseFloat(_val['questions'][index].SMOE3);
      smoe4 = smoe4 + parseFloat(_val['questions'][index].SMOE4);
      smoe5 = smoe5 + parseFloat(_val['questions'][index].SMOE5);
      smoe6 = smoe6 + parseFloat(_val['questions'][index].SMOE6);
      /* smoe7 = smoe7 + parseFloat(_val['questions'][index].SMOE7); */

      // Also, store the feedback in array (if value != ''
      if (_val['questions'][index].openq != ""){
        this.feedbackArray.push(_val['questions'][index].openq);
      }
    }

    // Now calculate the average, round up on 2 dec
    iz1 = iz1 / this.howManySendQuestions;
    iz1 = Math.round(iz1 * 100) / 100;
    this.iz1 = iz1;
    iz2 = iz2 / this.howManySendQuestions;
    iz2 = Math.round(iz2 * 100) / 100;
    this.iz2 = iz2;
    iz3 = iz3 / this.howManySendQuestions;
    iz3 = Math.round(iz3 * 100) / 100;
    this.iz3 = iz3;
    iw1 = iw1 / this.howManySendQuestions;
    iw1 = Math.round(iw1 * 100) / 100;
    this.iw1 = iw1;
    iw2 = iw2 / this.howManySendQuestions;
    iw2 = Math.round(iw2 * 100) / 100;
    this.iw2 = iw2;
    iw3 = iw3 / this.howManySendQuestions;
    iw3 = Math.round(iw3 * 100) / 100;
    this.iw3 = iw3;
    iwe1 = iwe1 / this.howManySendQuestions;
    iwe1 = Math.round(iwe1 * 100) / 100;
    this.iwe1 = iwe1;
    iwe2 = iwe2 / this.howManySendQuestions;
    iwe2 = Math.round(iwe2 * 100) / 100;
    this.iwe2 = iwe2;
    iwe3 = iwe3 / this.howManySendQuestions;
    iwe3 = Math.round(iwe3 * 100) / 100;
    this.iwe3 = iwe3;
    iwe4 = iwe4 / this.howManySendQuestions;
    iwe4 = Math.round(iwe4 * 100) / 100;
    this.iwe4 = iwe4;
    ik1 = ik1 / this.howManySendQuestions;
    ik1 = Math.round(ik1 * 100) / 100;
    this.ik1 = ik1;
    ik2 = ik2 / this.howManySendQuestions;
    ik2 = Math.round(ik2 * 100) / 100;
    this.ik2 = ik2;
    ik3 = ik3 / this.howManySendQuestions;
    ik3 = Math.round(ik3 * 100) / 100;
    this.ik3 = ik3;
    smoe1 = smoe1 / this.howManySendQuestions;
    smoe1 = Math.round(smoe1 * 100) / 100;
    this.smoe1 = smoe1;
    smoe2 = smoe2 / this.howManySendQuestions;
    smoe2 = Math.round(smoe2 * 100) / 100;
    this.smoe2 = smoe2;
    smoe3 = smoe3 / this.howManySendQuestions;
    smoe3 = Math.round(smoe3 * 100) / 100;
    this.smoe3 = smoe3;
    smoe4 = smoe4 / this.howManySendQuestions;
    smoe4 = Math.round(smoe4 * 100) / 100;
    this.smoe4 = smoe4;
    smoe5 = smoe5 / this.howManySendQuestions;
    smoe5 = Math.round(smoe5 * 100) / 100;
    this.smoe5 = smoe5;
    smoe6 = smoe6 / this.howManySendQuestions;
    smoe6 = Math.round(smoe6 * 100) / 100;
    this.smoe6 = smoe6;
    /* smoe7 = smoe7 / this.howManySendQuestions;
    smoe7 = Math.round(smoe7 * 100) / 100;
    this.smoe7 = smoe7; */


    // how to do the round
    // Math.round(vertrouwen * 100) / 100

    // SAME but for the checklist
    // we calculate the sum of the checklist inputs  first
    // Loop through checklist
    for (let index = 0; index < _val['checklists'].length; index++) {

      cw1 = cw1 + parseFloat(_val['checklists'][index].CW1);
      cw2 = cw2 + parseFloat(_val['checklists'][index].CW2);
      vb1 = vb1 + parseFloat(_val['checklists'][index].VB1);
      vb2 = vb2 + parseFloat(_val['checklists'][index].VB2);
      vb3 = vb3 + parseFloat(_val['checklists'][index].VB3);
      opl1 = opl1 + parseFloat(_val['checklists'][index].OPL1);
      opl2 = opl2 + parseFloat(_val['checklists'][index].OPL2);
      opl3 = opl3 + parseFloat(_val['checklists'][index].OPL3);
      pro1 = pro1 + parseFloat(_val['checklists'][index].PRO1);
      pro2 = pro2 + parseFloat(_val['checklists'][index].PRO2);
      pro3 = pro3 + parseFloat(_val['checklists'][index].PRO3);
      com1 = com1 + parseFloat(_val['checklists'][index].COM1);
      com2 = com2 + parseFloat(_val['checklists'][index].COM2);
      com3 = com3 + parseFloat(_val['checklists'][index].COM3);
      bor1 = bor1 + parseFloat(_val['checklists'][index].BOR1);
      bor2 = bor2 + parseFloat(_val['checklists'][index].BOR2);
      bor3 = bor3 + parseFloat(_val['checklists'][index].BOR3);
      bor4 = bor4 + parseFloat(_val['checklists'][index].BOR4);
      bor5 = bor5 + parseFloat(_val['checklists'][index].BOR5);
    }

    // Now calculate the average, round up on 2 dec
    cw1 = cw1 / this.howManySendChecklist;
    cw1 = Math.round(cw1 * 100) / 100;
    this.cw1 = cw1;
    cw2 = cw2 / this.howManySendChecklist;
    cw2 = Math.round(cw2 * 100) / 100;
    this.cw2 = cw2;
    cw3 = cw3 / this.howManySendChecklist;
    cw3 = Math.round(cw3 * 100) / 100;
    this.cw3 = cw3;
    vb1 = vb1 / this.howManySendChecklist;
    vb1 = Math.round(vb1 * 100) / 100;
    this.vb1 = vb1;
    vb2 = vb2 / this.howManySendChecklist;
    vb2 = Math.round(vb2 * 100) / 100;
    this.vb2 = vb2;
    vb3 = vb3 / this.howManySendChecklist;
    vb3 = Math.round(vb3 * 100) / 100;
    this.vb3 = vb3;
    opl1 = opl1 / this.howManySendChecklist;
    opl1 = Math.round(opl1 * 100) / 100;
    this.opl1 = opl1;
    opl2 = opl2 / this.howManySendChecklist;
    opl2 = Math.round(opl2 * 100) / 100;
    this.opl2 = opl2;
    opl3 = opl3 / this.howManySendChecklist;
    opl3 = Math.round(opl3 * 100) / 100;
    this.opl3 = opl3;
    pro1 = pro1 / this.howManySendChecklist;
    pro1 = Math.round(pro1 * 100) / 100;
    this.pro1 = pro1;
    pro2 = pro2 / this.howManySendChecklist;
    pro2 = Math.round(pro2 * 100) / 100;
    this.pro2 = pro2;
    pro3 = pro3 / this.howManySendChecklist;
    pro3 = Math.round(pro3 * 100) / 100;
    this.pro3 = pro3;
    com1 = com1 / this.howManySendChecklist;
    com1 = Math.round(com1 * 100) / 100;
    this.com1 = com1;
    com2 = com2 / this.howManySendChecklist;
    com2 = Math.round(com2 * 100) / 100;
    this.com2 = com2;
    com3 = com3 / this.howManySendChecklist;
    com3 = Math.round(com3 * 100) / 100;
    this.com3 = com3;
    bor1 = bor1 / this.howManySendChecklist;
    bor1 = Math.round(bor1 * 100) / 100;
    this.bor1 = bor1;
    bor2 = bor2 / this.howManySendChecklist;
    bor2 = Math.round(bor2 * 100) / 100;
    this.bor2 = bor2;
    bor3 = bor3 / this.howManySendChecklist;
    bor3 = Math.round(bor3 * 100) / 100;
    this.bor3 = bor3;
    bor4 = bor4 / this.howManySendChecklist;
    bor4 = Math.round(bor4 * 100) / 100;
    this.bor4 = bor4;
    bor5 = bor5 / this.howManySendChecklist;
    bor5 = Math.round(bor5 * 100) / 100;
    this.bor5 = bor5;



    // TODO: Let the ugly happen

    if (this.iz1 <= 2.5 || this.iz2 <= 2.5 || this.iz3 <= 2.5){
      this.iztot = 1;
    } else if (this.iz1 >= 3.5 && this.iz2 >= 3.5 && this.iz3 >= 3.5) {
      this.iztot = 3;
    } else {
      this.iztot = 2;
    }


    // iw
    if (this.iw1 <= 2.5 || this.iw2 <= 2.5 || this.iw3 <= 2.5){
      this.iwtot = 1;
    } else if (this.iw1 >= 3.5 && this.iw2 >= 3.5 && this.iw3 >= 3.5) {
      this.iwtot = 3;
    } else {
      this.iwtot = 2;
    }



    // iwe
    if (this.iwe1 <= 2.5 || this.iwe2 <= 2.5 || this.iwe3 <= 2.5 || this.iwe4 <= 2.5){
      this.iwetot = 1;
    } else if (this.iwe1 >= 3.5 && this.iwe2 >= 3.5 && this.iwe3 >= 3.5 && this.iwe4 >= 3.5) {
      this.iwetot = 3;
    } else {
      this.iwetot = 2;
    }


    // ik
    if (this.ik1 <= 2.5 || this.ik2 <= 2.5 || this.ik3 <= 2.5){
      this.iktot = 1;
    } else if (this.ik1 >= 3.5 && this.ik2 >= 3.5 && this.ik3 >= 3.5) {
      this.iktot = 3;
    } else {
      this.iktot = 2;
    }



    //cw
    if (this.cw1 <= 2.5 || this.cw2 <= 2.5){
      this.cwtot = 1;
    } else if (this.cw1 >= 3.5 && this.cw2 >= 3.5) {
      this.cwtot = 3;
    } else {
      this.cwtot = 2;
    }


    // vb
    if (this.vb1 <= 2.5 || this.vb2 <= 2.5 || this.vb3 <= 2.5){
      this.vbtot = 1;
    } else if (this.vb1 >= 3.5 && this.vb2 >= 3.5 && this.vb3 >= 3.5) {
      this.vbtot = 3;
    } else {
      this.vbtot = 2;
    }



    // opl
    if (this.opl1 <= 2.5 || this.opl2 <= 2.5 || this.opl3 <= 2.5){
      this.opltot = 1;
    } else if (this.opl1 >= 3.5 && this.opl2 >= 3.5 && this.opl3 >= 3.5) {
      this.opltot = 3;
    } else {
      this.opltot = 2;
    }


    // pro
    if (this.pro1 <= 2.5 || this.pro2 <= 2.5 || this.pro3 <= 2.5){
      this.protot = 1;
    } else if (this.pro1 >= 3.5 && this.pro2 >= 3.5 && this.pro3 >= 3.5) {
      this.protot = 3;
    } else {
      this.protot = 2;
    }


    // com
    if (this.com1 <= 2.5 || this.com2 <= 2.5 || this.com3 <= 2.5){
      this.comtot = 1;
    } else if (this.com1 >= 3.5 && this.com2 >= 3.5 && this.com3 >= 3.5) {
      this.comtot = 3;
    } else {
      this.comtot = 2;
    }


    // bor
    if (this.bor1 <= 2.5 || this.bor2 <= 2.5 || this.bor3 <= 2.5 || this.bor4 <= 2.5 || this.bor5 <= 2.5 ){
      this.bortot = 1;
    } else if (this.bor1 >= 3.5 && this.bor2 >= 3.5 && this.bor3 >= 3.5 && this.bor4 >= 3.5 && this.bor5 >= 3.5) {
      this.bortot = 3;
    } else {
      this.bortot = 2;
    }




    /* 
    // TODO: Below 3 lines times 1000
    conflict = conflict / this.howManySend;
    conflict = Math.round(conflict * 100) / 100;
    this.conflict = conflict;
   

    

    // some ugly if else logic right there
    if (vertrouwen >= 3.75) {
      this.vertrouwen1 = true;
    } else if (vertrouwen < 3.75 && vertrouwen > 3.24) {
      this.vertrouwen2 = true;
    } else if (vertrouwen <= 3.24) {
      this.vertrouwen3 = true;
    }

    if (conflict >= 3.75) {
      this.conflict1 = true;
    } else if (conflict < 3.75 && conflict > 3.24) {
      this.conflict2 = true;
    } else if (conflict <= 3.24) {
      this.conflict3 = true;
    }

    if (commitment >= 3.75) {
      this.commitment1 = true;
    } else if (commitment < 3.75 && commitment > 3.24) {
      this.commitment2 = true;
    } else if (commitment <= 3.24) {
      this.commitment3 = true;
    }

    if (verantwoordelijk >= 3.75) {
      this.verantwoordelijk1 = true;
    } else if (verantwoordelijk < 3.75 && verantwoordelijk > 3.24) {
      this.verantwoordelijk2 = true;
    } else if (verantwoordelijk <= 3.24) {
      this.verantwoordelijk3 = true;
    }

    if (resultaat >= 3.75) {
      this.resultaat1 = true;
    } else if (resultaat < 3.75 && resultaat > 3.24) {
      this.resultaat2 = true;
    } else if (resultaat <= 3.24) {
      this.resultaat3 = true;
    } */
  }

  showEdit(_id) {
    this.currentGroupID = _id;
    this.serCred.debugLog(_id);
    this.groupRows.forEach(element => {
      if (_id === element.id) {
        this.groupName = element.name;
        this.pasKey = element.paskey;
      }
    });
  }


  showGroupList(_id) {
    this.groupId = _id;
    this.loading = true;
    this.serCred.debugLog(_id);
    this.currentGroupID = _id;
    this.serCred.API_getgrouplist(_id).subscribe(value => this.gotGroupList(value));

  }


  gotGroupList(_resp) {
    this.serCred.debugLog(_resp);
    this.groupListUsers = [];
    this.groupListUsers = _resp;
    this.tempgroupListUsers = [..._resp];
    this.loading = false;
  }

  printResult() {
    window.print();
  }

  publishToggle(_id, _status) {
    console.log(_status);
    let statchangenumb;
    switch (_status) {
      case true:
        statchangenumb = 1;
        break;
      case false:
        statchangenumb = 0;
        break;
    }
    // TODO: make changing call
    ///////////////////////
    this.serCred.API_statusChange(_id, statchangenumb).subscribe(value => this.gotStatusChange(value));
    this.loading = true;
  }

  gotStatusChange(_value) {
    this.serCred.debugLog(_value);
    ///////////////////////
    this.serCred.API_getgroups(this.admnId).subscribe(value => this.gotGroups(value));
  }

  gotGroups(_val) {
    this.serCred.debugLog(_val);


    // Ok, so we parse the boolean string to an int for the checkbox
    _val.forEach(function (value) {
      console.log(value.status);
      value.status = parseInt(value.status, 10);
    });

    this.groupRows = _val;
    this.tempgroupRows = [..._val];
    this.groupRows.reverse();
    this.loading = false;
  }

  resetGroupVals() {
    this.groupName = '';
    this.pasKey = '';
  }


  onSelect(data: TabDirective, _case): void {
    switch (_case) {
      case 'admins':
        this.serCred.API_getausers().subscribe(value => this.gotAusers(value));
        break;
      case 'groups':
        this.serCred.API_getgroups(this.admnId).subscribe(value => this.gotGroups(value));
        break;
    }
  }


  addClick(_case) {
    switch (_case) {
      case 'user':
        this.userAddUser = !this.userAddUser;
        this.userAddBulk = false;
        this.userSendMails = false;
        break;
      case 'bulk':
        this.userAddUser = false;
        this.userSendMails = false;
        this.userAddBulk = !this.userAddBulk;
        break;
      case 'sendmails':
        this.userAddUser = false;
        this.userSendMails = !this.userSendMails;
        break;
    }
  }

  // function for validating email
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  addUser() {
    // value should not be empty
    if (this.emailAdd !== '') {
      if (this.validateEmail(this.emailAdd)) {
        this.serCred.API_createuseringroup(this.groupId, this.emailAdd).subscribe(value => this.createdUserInGroup(value));
      } else {
        this.toastr.warning('Geen geldig email adres', '');
      }
    } else {
      this.toastr.warning('Email adres niet ingevuld', 'Niet opgeslagen');
    }
  }

  createdUserInGroup(_resp) {
    this.emailAdd = '';
    this.userAddBulk = false;
    this.serCred.API_getgrouplist(this.groupId).subscribe(value => this.gotGroupList(value));
  }

  resetUsersVals() {
    this.serCred.debugLog('Reset Users Vals');
    this.ausrName = '';
    this.ausrLastName = '';
    this.ausrEmail = '';
    this.ausrType = '1';
    this.ausrWw = '';
  }

  // TODO: Below needs to be implemented (tip copy of groups)
  makeUser() {
    // TODO: Actually make user CALL, modal is ready
    if (this.ausrName !== '' && this.ausrLastName !== '' && this.ausrEmail !== '' && this.ausrWw !== '') {
      this.serCred.debugLog(this.ausrName);
      this.serCred.debugLog(this.ausrLastName);
      this.serCred.debugLog(this.ausrEmail);
      this.serCred.debugLog(this.ausrType);
      this.loading = true;
      // tslint:disable-next-line:max-line-length
      this.serCred.API_createauser(this.ausrName, this.ausrLastName, this.ausrEmail, this.ausrType, this.ausrWw).subscribe(value => this.createdAuser(value));

    } else {
      this.toastr.warning('Niet alle velden ingevuld', 'Niet opgeslagen');

    }

  }

  createdAuser(_resp) {
    this.loading = false;
    this.toastr.success('Gebruiker toegevoegd', '');
    this.serCred.API_getausers().subscribe(value => this.gotAusers(value));
    $('#useraddmodal').modal('hide');
  }


  // TODO:
  // via modal changes are made, push to server
  editAusr() {
    // Check if nothing is empty
    if (this.ausrName !== '' && this.ausrLastName !== '' && this.ausrEmail !== '') {
      this.serCred.debugLog(this.ausrName);
      this.serCred.debugLog(this.ausrLastName);
      this.serCred.debugLog(this.ausrEmail);
      this.serCred.debugLog(this.ausrType);
      this.loading = true;
      // tslint:disable-next-line:max-line-length
      this.serCred.API_editauser(this.ausrId, this.ausrName, this.ausrLastName, this.ausrEmail, this.ausrType, this.ausrWw).subscribe(value => this.editteddAuser(value));

    } else {
      this.toastr.warning('Niet alle velden ingevuld', 'Niet opgeslagen');
    }
  }


  editteddAuser(_resp) {
    this.loading = false;
    this.ausrWw = '';
    this.toastr.success('Gebruiker bijgewerkt', '');
    this.serCred.API_getausers().subscribe(value => this.gotAusers(value));
  }

  makeGroup() {
    // TODO: is everything filled in? if so continue
    if (this.groupName !== '') {


      let aaid;

      if (this.admnType === 1) {
        aaid = this.admnId;
      } else {
        aaid = 0;
      }

      ///////////////////////
      this.serCred.API_makegroup(this.groupName, aaid).subscribe(value => this.addedGroup(value));
      this.loading = true;
    } else {
      this.toastr.warning('Niet alle velden ingevuld', 'Group is niet aangemaakt');
    }
  }

  // response from service
  addedGroup(_value) {
    this.serCred.debugLog(_value);

    this.groupName = '';
    this.loading = false;

    if (_value.status === 'error') {
      console.log('yassss');
      switch (_value.reason) {
        case 'groupname':
          this.toastr.warning('Groep bestaat al', 'Groep niet aangemaakt');
          break;
        case 'paskey':
          this.toastr.warning('Wachtwoord bestaat al', 'Groep niet aangemaakt');
          break;
      }
    }

    // Refetch the groups
    ///////////////////////
    this.serCred.API_getgroups(this.admnId).subscribe(value => this.gotGroups(value));
  }


  openEditUserModal(_id) {
    // TODO: Open Edit modal for User
    this.serCred.debugLog('Wauwwwww  ' + _id);
    for (let index = 0; index < this.manageRows.length; index++) {
      if (this.manageRows[index].id === _id) {
        this.ausrId = this.manageRows[index].id;
        this.ausrName = this.manageRows[index].name;
        this.ausrLastName = this.manageRows[index].lastname;
        this.ausrEmail = this.manageRows[index].email;
        this.ausrType = this.manageRows[index].type;
      }
    }
  }

  openUserToGroupModal(_id) {
    this.ausrId = _id;
    this.loading = true;
    this.serCred.API_getausergroups(_id).subscribe(value => this.gotUserToGroups(value));
  }

  // TODO: Do all the deleting are u sure stuff
  openDeleteModal(_case, id) {
    this.serCred.debugLog('Trying to delete something, but not coded yet');
    switch (_case) {
      case 'auser':

        break;
    }
  }


  gotUserToGroups(_resp) {
    this.serCred.debugLog(_resp);
    this.allGroupRows = [];
    this.allGroupRows = _resp.groups;

    this.tempallGroupRows = [..._resp.groups];

    this.allGroupRows.forEach(grouprow => {
      grouprow.ingroup = false;
      for (let index = 0; index < _resp.usertogroups.length; index++) {
        if (grouprow.id === _resp.usertogroups[index].groupid) {
          grouprow.ingroup = true;
        }
      }
      this.loading = false;
    });
  }

  editGroup() {
    this.serCred.debugLog(this.pasKey);
    if (this.groupName !== '') {
      ///////////////////////
      this.serCred.API_editgroup(this.currentGroupID, this.groupName).subscribe(value => this.groupEditted(value));
    } else {
      this.toastr.warning('Veld mag niet leeg zijn', 'Group niet bewerkt');
    }
  }

  groupEditted(_val) {
    this.toastr.success('Groep gewijzigd', '');
    /////////////////////////
    this.serCred.API_getgroups(this.admnId).subscribe(value => this.gotGroups(value));
  }


  changeUserType(_userid, _userfilled, _usertype) {
    this.serCred.debugLog(_usertype);
    if (_userfilled === '1') {
      this.toastr.warning('Formulier is al ingevuld, kan type niet meer veranderen', '');
    } else {


      let morethan1 = false;

      // TODO: here the logic for cathing one
      if (_usertype === 2) {

        this.groupListUsers.forEach(element => {
          if (element['type'] == '2') {
            morethan1 = true;
          }
        });
      }

      if (!morethan1) {
        this.loading = true;
        this.serCred.API_editusertype(_userid, _usertype).subscribe(value => this.userTypeChanged(value));
      } else {

        this.toastr.warning('Er mag maar 1 checklist gebruiker aan de groep gekoppeld zitten, haal deze weg bij de andere persoon', '');
      }
      // do change
    }
  }


  userTypeChanged(_resp) {
    this.serCred.debugLog(_resp);
    this.loading = false;
    this.serCred.API_getgrouplist(this.currentGroupID).subscribe(value => this.gotGroupList(value));
    this.toastr.success('Type gebruiker aangepast', '');
  }


  groupCourseHandler(_case, _groupid) {
    this.serCred.API_usertofromgroup(_case, _groupid, this.ausrId).subscribe(value => this.courseHandled(value));
  }


  courseHandled(_resp) {
    this.serCred.debugLog(_resp);
    this.serCred.API_getausergroups(this.ausrId).subscribe(value => this.gotUserToGroups(value));
  }




  // CSV DEALINGS
  // TODO: Nog helemaal niet getest
  onFileSelect(input: HTMLInputElement) {
    this.loading = true;

    const files = input.files;
    const content = this.csvContent;
    if (files && files.length) {

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.readAsText(fileToRead, 'UTF-8');
      fileReader.onload = (event: Event) => {
        // event.target.result; // This is invalid
        // fileReader.result; // This is valid
        const csvSeparator = ',';
        this.serCred.debugLog(fileReader.result);
        this.csvContent = fileReader.result;

        const csv = [];
        const lines = this.csvContent.split('\n');
        lines.forEach(element => {
          const cols: string[] = element.split(csvSeparator);
          csv.push(cols);
        });

        this.csvUserArray = csv;
        this.csvUserArray.splice(-1, 1);
        this.serCred.debugLog(csv);
        this.serCred.API_usersbatchimporttogroup(this.currentGroupID, this.csvUserArray).subscribe(value => this.userbatchResponse(value));
        // TESTING - SENDING TO API
        // this.sendNowUserBatch();
      };

    }

  }


  // batchuser response
  userbatchResponse(_event) {
    this.serCred.debugLog(_event);
    this.fileHolder = null;
    this.serCred.API_getgrouplist(this.currentGroupID).subscribe(value => this.gotGroupList(value));

  }

  logOut() {
    location.reload();
  }


  // Deleting the
  openSureModal(template: TemplateRef < any > , _case, _id) {
    this.modalRef = this.modalService.show(template);
    //this.currentUserId = _id;

    this.currentCase = _case;
    this.currentId = _id;
  }

  sureModal(_yesno) {
    // TODO: Delete user
    switch (_yesno) {
      case 'yes':
        this.loading = true;
        this.serCred.API_deleteItem(this.currentCase, this.currentId).subscribe(value => this.itemDeleted(value, this.currentCase));
        break;
      case 'no':
        this.modalRef.hide();
        break;
    };
  };

  // TODO: handle deleting
  itemDeleted(_resp, _case) {
    this.serCred.debugLog(_resp);
    this.modalRef.hide();
    switch (this.currentCase) {
      case 'deletegroup':
        this.serCred.API_getgroups(this.admnId).subscribe(value => this.gotGroups(value));
        break;
      case 'deleteadmin':
        this.serCred.API_getausers().subscribe(value => this.gotAusers(value));
        break;
      case 'deletegroupuser':
        this.serCred.API_getgrouplist(this.currentGroupID).subscribe(value => this.gotGroupList(value));
        break;
    }
    this.loading = false;
  }


  sendUserLink(_id, _filled){
    if (_filled === '1'){
      this.toastr.warning('Is al ingevuld, hoeft niet meer te mailen', '');
    } else {
      this.loading = true;
      this.serCred.API_sendlinktouser(_id).subscribe(value => this.userGotEmailed(value));
    }
  }



  userGotEmailed(_resp){
    this.loading = false;
    this.toastr.success('Persoon gemaild', '');

  }

  sendGroupBulkLink(){
    this.loading = true;
    this.serCred.API_sendlinktobulk(this.currentGroupID).subscribe(value => this.bulkGroupLinkSend(value));
  }

  bulkGroupLinkSend(_resp){
    this.loading = false;
    this.toastr.success('Mail gestuurd naar de groepsleden met inloglink', '');
  }


}
