import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userData = {"username":"", "password": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public cdsurApiProvider: CdsurApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
  	this.cdsurApiProvider.login(this.userData.username, this.userData.password);
  }

}
