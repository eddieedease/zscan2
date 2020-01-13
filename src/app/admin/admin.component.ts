import {
  Component,
  OnInit
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
  TabDirective
} from 'ngx-bootstrap/tabs';


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
  howManySend;


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



  // Some list of bools which we can use for the styling
  vertrouwen1 = false;
  vertrouwen2 = false;
  vertrouwen3 = false;
  conflict1 = false;
  conflict2 = false;
  conflict3 = false;
  commitment1 = false;
  commitment2 = false;
  commitment3 = false;
  verantwoordelijk1 = false;
  verantwoordelijk2 = false;
  verantwoordelijk3 = false;
  resultaat1 = false;
  resultaat2 = false;
  resultaat3 = false;

  vertrouwen = 0;
  conflict = 0;
  commitment = 0;
  verantwoordelijk = 0;
  resultaat = 0;

  // tslint:disable-next-line:max-line-length

  csvUserArray;


  showScore = false;
  // columns = [
  //   { prop: 'name' },
  //   { name: 'Gender' },
  //   { name: 'Company' }
  // ];

  constructor(private thisrouter: Router, private serCred: EdserService, private toastr: ToastrService) {

  }

  ngOnInit() {

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
  }

  showResult(_id) {
    // Frist of, reset all bool values for the result table
    this.vertrouwen1 = false;
    this.vertrouwen2 = false;
    this.vertrouwen3 = false;
    this.conflict1 = false;
    this.conflict2 = false;
    this.conflict3 = false;
    this.commitment1 = false;
    this.commitment2 = false;
    this.commitment3 = false;
    this.verantwoordelijk1 = false;
    this.verantwoordelijk2 = false;
    this.verantwoordelijk3 = false;
    this.resultaat1 = false;
    this.resultaat2 = false;
    this.resultaat3 = false;
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
    // this.serCred.API_getResults(_id).subscribe(value => this.gotResults(value));
  }

  gotResults(_val) {

    this.loading = false;
    this.serCred.debugLog(_val);
    this.howManySend = _val.length;

    // Calculate scores = total of each divided by howManySend
    let vertrouwen = 0;
    let conflict = 0;
    let commitment = 0;
    let verantwoordelijk = 0;
    let resultaat = 0;

    for (let index = 0; index < _val.length; index++) {
      vertrouwen = vertrouwen + parseFloat(_val[index].result1);
      conflict = conflict + parseFloat(_val[index].result2);
      commitment = commitment + parseFloat(_val[index].result3);
      verantwoordelijk = verantwoordelijk + parseFloat(_val[index].result4);
      resultaat = resultaat + parseFloat(_val[index].result5);
    }

    // Now round the numbers if is nessy
    // Math.round(vertrouwen * 100) / 100
    vertrouwen = vertrouwen / this.howManySend;
    vertrouwen = Math.round(vertrouwen * 100) / 100;
    this.vertrouwen = vertrouwen;
    conflict = conflict / this.howManySend;
    conflict = Math.round(conflict * 100) / 100;
    this.conflict = conflict;
    commitment = commitment / this.howManySend;
    commitment = Math.round(commitment * 100) / 100;
    this.commitment = commitment;
    verantwoordelijk = verantwoordelijk / this.howManySend;
    verantwoordelijk = Math.round(verantwoordelijk * 100) / 100;
    this.verantwoordelijk = verantwoordelijk;
    resultaat = resultaat / this.howManySend;
    resultaat = Math.round(resultaat * 100) / 100;
    this.resultaat = resultaat;

    this.serCred.debugLog(vertrouwen);
    this.serCred.debugLog(conflict);
    this.serCred.debugLog(commitment);
    this.serCred.debugLog(verantwoordelijk);
    this.serCred.debugLog(resultaat);

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
    }
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
    this.serCred.API_getgrouplist(_id).subscribe(value => this.gotGroupList(value));

  }


  gotGroupList(_resp) {
    this.serCred.debugLog(_resp);
    this.groupListUsers = [];
    this.groupListUsers = _resp;
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
    this.toastr.success('Gebruiker bewerkt', '');
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

    const files = input.files;
    const content = this.csvContent;
    if (files && files.length) {
      /*
       console.log("Filename: " + files[0].name);
       console.log("Type: " + files[0].type);
       console.log("Size: " + files[0].size + " bytes");
       */

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;

      fileReader.readAsText(fileToRead, 'UTF-8');
    }

  }

  // TODO: not tested fully, need import of csv file (one column)
  onFileLoad(fileLoadedEvent) {
    const csvSeparator = ',';
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    // alert(textFromFileLoaded);

    const txt = textFromFileLoaded;
    const csv = [];
    const lines = txt.split('\n');
    lines.forEach(element => {
      const cols: string[] = element.split(csvSeparator);
      csv.push(cols);
    });

    this.csvUserArray = csv;
    // this.serCred.API_usersbatchimporttogroup('1', parsedCsv).subscribe(value => this.userbatchResponse(value));
    // TESTING - SENDING TO API
    this.sendNowUserBatch();
  }

  sendNowUserBatch() {
    this.serCred.API_usersbatchimporttogroup('1', this.csvUserArray).subscribe(value => this.userbatchResponse(value));

  }

  // batchuser response
  userbatchResponse(_event) {
    console.log(_event);
  }

  logOut() {
    location.reload();
  }


}
