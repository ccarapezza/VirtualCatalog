import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CdsurApiProvider } from '../providers/cdsur-api/cdsur-api';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public footerIsHidden: boolean = false;
  public userInfo: Object = false;

  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, public events: Events, public cdsurApiProvider: CdsurApiProvider, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    events.subscribe('hideHeader', (data) => {
        this.footerIsHidden = data.isHidden;
    })
    cdsurApiProvider.checkToken();
    this.userInfo = JSON.parse(localStorage.getItem('user-info'));
    ;
  }

  login(){
   this.menuCtrl.close();
   this.nav.push(LoginPage);
  }

  signup(){
   this.menuCtrl.close();
   this.nav.push(SignupPage);
  }

  logout(){
    this.cdsurApiProvider.destroyUserCredentials();
    this.menuCtrl.close();
    this.nav.push(HomePage);
    this.showMessage("Sesión cerrada", "Se ha cerrado la sesión");
  }

  showMessage(title, message = "") {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}