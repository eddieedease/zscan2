import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

import {
  EdserService
} from '../edser.service';


declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // store user pwd
  usrPwd = '';
  errorMsg = false;
  errorMsg2 = false;
  // loading visible view
  loading = false;


  alreadyFilled = false;

  constructor(private thisrouter: Router, private activeRoute: ActivatedRoute, private serCred: EdserService) {
    // we check if there are any userid + key attached to url. Ifso, make API call to check and log in automatically
    if (activeRoute.url['_value'][1] && activeRoute.url['_value'][2]) {
      const id1 = activeRoute.url['_value'][1].path;
      const key1 = activeRoute.url['_value'][2].path;
      this.loading = true;
      // Attempting auto Login in
      this.serCred.API_login(id1, key1).subscribe(value => this.gotLogin(value));
    } else {
      // normal route
    }
  }

  ngOnInit() {
    // scroll to top
    $('html,body').scrollTop(0);
  }


  loginAttempt() {
    if (this.usrPwd === '') {
      this.errorMsg = true;
    } else {
      this.loading = true;
      // this.serCred.API_login(this.usrPwd).subscribe(value => this.gotLogin(value));
    }
  }

  gotLogin(_val) {
    this.serCred.debugLog(_val.user);
    this.loading = false;


    if (_val.status === 'success') {

      if (_val.user.filled === '1') {
        // TODO: Already filled in, communicate

      } else {
        // set the service vars 
        this.serCred.setCurrent('groupid', _val.user[0].grouplink);
        this.serCred.setCurrent('userid', _val.user[0].id);
        this.serCred.setCurrent('usertype', _val.user[0].type);
        this.serCred.__loggedIn = true;
        this.thisrouter.navigate(['/', 'vragenlijst']);
      }

    } else {
      // communicate that the form is already filled in
      this.alreadyFilled = true;
    }
  }

}
