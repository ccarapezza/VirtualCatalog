import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CdsurApiProvider } from '../providers/cdsur-api/cdsur-api';
import { CartProvider } from '../providers/cart/cart';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CartPage } from '../pages/cart/cart';

import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public isUserLogged: boolean = false;
  public userInfo: Object = false;

  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = HomePage;
  showMainFooter: boolean = true;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private alertCtrl: AlertController, 
    public menuCtrl: MenuController, 
    public events: Events,
    public cdsurApiProvider: CdsurApiProvider, 
    public cartProvider: CartProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    events.subscribe('user:login', (logged) => {
        this.isUserLogged = logged;
    })
    events.subscribe('template:show-footer', (show) => {
        this.showMainFooter = show;
    })
    cdsurApiProvider.checkToken();
    this.userInfo = JSON.parse(localStorage.getItem('user-info'));
    ;
  }

  ionViewDidLoad() {
    console.log('MENU LOAD');
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
  
  goToCart() {
    this.nav.push(CartPage);
  }

  getUsername() {
    var userInfo = JSON.parse(localStorage.getItem('user-info'));
    if(userInfo == null)
      return "ANONYMUS";
    else
      return userInfo.username;
  }

  getUserEmail() {
    var userInfo = JSON.parse(localStorage.getItem('user-info'));
    if(userInfo == null)
      return "ANONYMUS";
    else
      return userInfo.email;
  }

  getCartProductsCount() {
    return this.cartProvider.getCartData().length;
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