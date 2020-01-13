import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http';
import {
  Injectable
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Subject
} from 'rxjs/Subject';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime';

// import evironment for current dev bunlde
import {
  environment
} from '../environments/environment';
import {
  ANIMATION_MODULE_TYPE
} from '@angular/platform-browser/animations';

@Injectable()
export class EdserService {


  // service/store variables
  groupLink;
  groupName;

  // a var for keeping if one is logged in, switch when succesfully logged in. Keep track in other components
  __loggedIn = false;

  currentGroupID;
  currentUserID;
  currentUserType;

  constructor(private http_: Http, private router: Router) {}

  debugLog(logging: any) {
    if (environment.production !== true) {
      console.log(logging);
    }
  }


  setCurrent(_case, _value) {
    this.debugLog('Setting: ' + _case + ' to: ' + _value);
    switch (_case) {
      case 'groupid':
        this.currentGroupID = _value;
        break;
      case 'userid':
        this.currentUserID = _value;
        break;
      case 'usertype':
        this.currentUserType = _value;
        break;
    }
  }

  getCurrent(_case) {

    let returnthis;
    switch (_case) {
      case 'groupid':
        returnthis = this.currentGroupID;
        break;
      case 'userid':
        returnthis = this.currentUserType;
        break;
      case 'usertype':
        returnthis = this.currentUserType;
        break;
    }
    return returnthis;
  }



  // API CALLSSSSSSS
  // GET COURSE ITEM


  // ===========================================
  // ===========================================

  // API GROUPS
  // API GROUPS
  API_makegroup(_groupname, _aid): Observable < any > {
    const url = environment.apilink + 'makegroup/' + _groupname + '/' + _aid + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  API_editgroup(_groupid, _groupname): Observable < any > {
    const url = environment.apilink + 'editgroup/' + _groupid + '/' + _groupname + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }

  // TOGGLING CHECKBOX OF ACTIVE
  API_statusChange(_groupid, _statusChange): Observable < any > {
    const url = environment.apilink + '/changestatus/' + _groupid + '/' + _statusChange + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  API_getgroups(_aid): Observable < any > {
    const url = environment.apilink + 'getgroups/' + _aid + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  API_getausers(): Observable < any > {
    const url = environment.apilink + 'getausers?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }



  API_getgrouplist(_groupid): Observable < any > {
    const url = environment.apilink + 'getgrouplist/' + _groupid + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }



  API_changestatus(_groupid, _statusChange): Observable < any > {
    const url = environment.apilink + 'changestatus/' + _groupid + '/' + _statusChange + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }



  API_usertofromgroup(_case, _groupid, _aid): Observable < any > {
    const url = environment.apilink + 'ausertofromgroup/' + _case + '/' + _groupid + '/' + _aid + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }




  // API MAIL
  // API MAIL

  API_sendlinktouser(_userid): Observable < any > {
    const url = environment.apilink + 'sendlinktouser/' + _userid + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  API_sendlinktobulk(_groupid): Observable < any > {
    const url = environment.apilink + 'sendlinktobulk/' + _groupid + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }



  // API QUESTIONS
  // API QUESTIONS

  // tslint:disable-next-line:max-line-length
  API_formsubmit(_groupid, _userid, IZ1, IZ2, IZ3, IW1, IW2, IW3, IWE1, IWE2, IWE3, IWE4, IK1, IK2, IK3, SMOE1, SMOE2, SMOE3, SMOE4, SMOE5, SMOE6): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'formsubmit/' + _groupid + '/' + _userid + '/' + IZ1 + '/' + IZ2 + '/' + IZ3 + '/' + IW1 + '/' + IW2 + '/' + IW3 + '/' + IWE1 + '/' + IWE2 + '/' + IWE3 + '/' + IWE4 + '/' + IK1 + '/' + IK2 + '/' + IK3 + '/' + SMOE1 + '/' + SMOE2 + '/' + SMOE3 + '/' + SMOE4 + '/' + SMOE5 + '/' + SMOE6 + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  // tslint:disable-next-line:max-line-length
  API_checklistsubmit(_groupid, _userid, CW1, CW2, VB1, VB2, VB3, OPL1, OPL2, OPL3, PRO1, PRO2, PRO3, COM1, COM2, COM3, BOR1, BOR2, BOR3, BOR4): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'checklistsubmit/' + _groupid + '/' + _userid + '/' +  CW1 + '/' + CW2 + '/' + VB1 + '/' + VB2 + '/' + VB3 + '/' + OPL1 + '/' + OPL2 + '/' + OPL3 + '/' + PRO1 + '/' + PRO2 + '/' + PRO3 + '/' + COM1 + '/' + COM2 + '/' + COM3 + '/' + BOR1 + '/' + BOR2 + '/' + BOR3 + '/' + BOR4 + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }




  // API LOGIN
  // API LOGIN
  API_login(_userid, _key): Observable < any > {
    const url = environment.apilink + 'login/' + _userid + '/' + _key + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  // API CALLSSSSSSS
  // GET COURSE ITEM
  API_admnlogin(_mail, _pwd): Observable < any > {
    const url = environment.apilink + 'admnlogin?rnd=' + new Date().getTime();
    const upt = {
      'email': _mail,
      'ww': _pwd
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.post(url, body, options)
      .throttleTime(5000)
      .map(res => res.json());
  }




  // API RESULTS
  // API RESULTS
  API_getresultsfromgroup(_groupid): Observable < any > {
    const url = environment.apilink + 'getresultsfromgroup/' + _groupid + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }




  // API USERS
  // API USERS
  API_createuseringroup(_groupid, _email): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'createuseringroup/' + _groupid + '?rnd=' + new Date().getTime();

    const upt = {
      'email': _email
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  API_createauser(_name, _lastname, _email, _type, _ww): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'createauser?rnd=' + new Date().getTime();

    const upt = {
      'email': _email,
      'name': _name,
      'typee': _type,
      'lastname': _lastname,
      'ww': _ww
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .throttleTime(5000)
      .map(res => res.json());
  }

  // API RESULTS
  // API RESULTS
  API_getausergroups(_id): Observable < any > {
    const url = environment.apilink + 'getausergroups/' + _id + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  API_usersbatchimporttogroup(_groupid, _userstoadd): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'usersbatchimporttogroup/' + _groupid + '?rnd=' + new Date().getTime();

    const upt = {
      'userstoadd': _userstoadd,
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .throttleTime(5000)
      .map(res => res.json());
  }



  API_edituser(_userid, _name, _lastname, _email): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'edituser/' + _userid + '?rnd=' + new Date().getTime();

    const upt = {
      'name': _name,
      'lastname': _lastname,
      'email': _email,
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .throttleTime(5000)
      .map(res => res.json());
  }



  API_editauser(_userid, _name, _lastname, _email, _type, _ww): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'editauser/' + _userid + '?rnd=' + new Date().getTime();

    const upt = {
      'name': _name,
      'lastname': _lastname,
      'email': _email,
      'type': _type,
      'ww': _ww
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  API_deleteuser(_userid): Observable < any > {
    const url = environment.apilink + 'deleteuser/' + _userid + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  API_deleteauser(_userid): Observable < any > {
    const url = environment.apilink + 'deleteauser/' + _userid + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }



}
